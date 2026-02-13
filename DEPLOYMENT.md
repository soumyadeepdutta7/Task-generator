# Deployment and Setup Guide

This guide explains how to configure the environment variables and deploy the Task Generator application.

## 1. Environment Variables Setup

The application entails sensitive information like API keys and database connection strings. **Never commit these directly to GitHub.**

### Steps:
1.  **Duplicate the Configuration**:
    Copy the file named `.env.example` and rename the copy to `.env.local`.
    
    ```bash
    cp .env.example .env.local
    # OR on Windows Command Prompt
    copy .env.example .env.local
    ```

2.  **Fill in the Variables**:
    Open `.env.local` in your text editor and fill in the values.

    *   `MONGODB_URI`: Your MongoDB connection string.
        *   **How to get it**:
            1.  Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
            2.  Click "Connect" -> "Drivers".
            3.  Copy the connection string.
            4.  Replace `<password>` with your database user password.
            5.  Ensure your IP address is whitelisted in "Network Access".
    
    *   `GEMINI_API_KEY`: Your Google Gemini API Key.
        *   **How to get it**:
            1.  Go to [Google AI Studio](https://aistudio.google.com/).
            2.  Click "Get API key".
            3.  Create a key in a new or existing project.

## 2. Local Development

To run the application on your machine:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Access**:
    Open `http://localhost:3000` in your browser.

## 3. Production Deployment (Vercel)

The easiest way to deploy a Next.js app is with [Vercel](https://vercel.com/).

### Steps:

1.  **Push to GitHub**:
    Ensure your latest code is pushed to a GitHub repository.

2.  **Import to Vercel**:
    *   Log in to Vercel.
    *   Click "Add New..." -> "Project".
    *   Select your `Task-generator` repository.

3.  **Configure Environment Variables**:
    *   In the "Configure Project" screen, look for the "Environment Variables" section.
    *   Add the variables exactly as they appear in your `.env.local` file:
        *   **Key**: `MONGODB_URI`, **Value**: (Your actual MongoDB connection string)
        *   **Key**: `GEMINI_API_KEY`, **Value**: (Your actual Gemini API key)

4.  **Deploy**:
    *   Click "Deploy".
    *   Vercel will look builds your app and give you a live URL (e.g., `https://task-generator.vercel.app`).

### Troubleshooting

*   **Database Connection Errors**:
    *   Ensure your MongoDB Atlas "Network Access" allows connections from anywhere (`0.0.0.0/0`) since Vercel's IP addresses are dynamic.
*   **Build Failures**:
    *   Check the "Logs" tab in Vercel for specific error messages.
