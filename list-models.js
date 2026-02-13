const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

async function listModels() {
    let apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const lines = envContent.split('\n');
            for (const line of lines) {
                if (line.startsWith('GEMINI_API_KEY=')) {
                    apiKey = line.split('=')[1].trim();
                    break;
                }
            }
        }
    }

    if (!apiKey) {
        console.error("No API Key found. Please set GEMINI_API_KEY in .env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const iterable = await genAI.listModels();
        console.log("Available Models:");
        for await (const m of iterable) {
            console.log(`- ${m.name} (Supports: ${m.supportedGenerationMethods.join(", ")})`);
        }
    } catch (error) {
        console.error("Error listing models:", error.message);
    }
}

listModels();
