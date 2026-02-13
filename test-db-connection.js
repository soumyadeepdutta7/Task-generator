const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

async function testConnection() {
    try {
        const envPath = path.resolve(__dirname, '.env');
        if (!fs.existsSync(envPath)) {
            console.error('.env file not found');
            process.exit(1);
        }

        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim();
                if (key && value) env[key] = value;
            }
        });

        const uri = env.MONGODB_URI;
        if (!uri) {
            console.error('MONGODB_URI not found in .env');
            process.exit(1);
        }

        console.log('Attempting to connect to MongoDB...');
        // Connect with a 5 second timeout to avoid hanging
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Successfully connected to MongoDB!');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();
