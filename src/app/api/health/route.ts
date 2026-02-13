import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
    const health = {
        database: 'unknown',
        llm: 'unknown',
        backend: 'healthy', // If this route runs, backend is up
    };

    // Check Database
    try {
        await dbConnect();
        // Simple query to verify connection
        health.database = 'healthy';
    } catch (e) {
        health.database = 'unhealthy';
        console.error('DB Health Check Failed:', e);
    }

    // Check LLM
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        // Minimal generation to check connectivity
        await model.generateContent('Hello');
        health.llm = 'healthy';
    } catch (e) {
        health.llm = 'unhealthy';
        console.error('LLM Health Check Failed:', e);
    }

    return NextResponse.json(health, { status: 200 });
}
