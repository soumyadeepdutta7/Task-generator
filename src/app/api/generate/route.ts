import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/mongodb';
import Spec from '@/models/Spec';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { goal, users, constraints, template } = await req.json();

        if (!goal || !users) {
            return NextResponse.json(
                { error: 'Goal and Target Users are required' },
                { status: 400 }
            );
        }

        // Connect to Database
        await dbConnect();

        // Construct Prompt
        const prompt = `
      You are a senior product manager and engineering lead. 
      Your task is to generate a list of user stories and engineering tasks based on the following feature idea.
      
      Context:
      - Goal: ${goal}
      - Target Users: ${users}
      - Constraints: ${constraints || 'None'}
      - Template/Type: ${template || 'General Web App'}

      Output Format: JSON only. valid JSON structure:
      {
        "userStories": [
          { "id": "US-1", "role": "User", "goal": "...", "benefit": "..." }
        ],
        "tasks": [
          { "id": "TASK-1", "title": "...", "description": "...", "type": "feature" | "bug" | "chore", "status": "todo" }
        ]
      }
      
      Generate at least 3 user stories and 5-10 engineering tasks. 
      Ensure tasks are technical and actionable (e.g., "Create API endpoint", "Design Database Schema").
      Do not include any markdown formatting like \`\`\`json. Just raw JSON.
    `;

        // Call Gemini
        const model = genAI.getGenerativeModel(
            { model: 'gemini-1.5-flash' },
            { apiVersion: 'v1' }
        );
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model ignores the instruction
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        let parsedData;
        try {
            parsedData = JSON.parse(cleanText);
        } catch (e) {
            console.error('JSON Parse Error:', text);
            return NextResponse.json(
                { error: 'Failed to parse AI response', raw: text },
                { status: 500 }
            );
        }

        // Save to MongoDB
        const newSpec = await Spec.create({
            goal,
            users,
            constraints,
            template,
            ...parsedData,
        });

        return NextResponse.json({ success: true, data: newSpec }, { status: 200 });

    } catch (error: unknown) {
        console.error('Generation Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Internal Server Error', details: errorMessage },
            { status: 500 }
        );
    }
}
