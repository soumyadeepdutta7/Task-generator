# AI Implementation Notes

## Usage of AI in the App
The application uses **Google Gemini 1.5 Flash** to generate structured project plans. 
- **Role**: The AI acts as a Senior Product Manager/Engineering Lead.
- **Input**: User goal, target audience, constraints, and template type.
- **Output**: A structured JSON containing `userStories` and `tasks`.

## Why Gemini?
- **Speed**: Gemini 1.5 Flash offers low latency, crucial for a real-time tool.
- **Cost**: Generous free tier makes it accessible for this project.
- **Reasoning**: Strong capability in breaking down high-level concepts into technical tasks.
- **JSON Mode**: Reliable JSON output structure compared to some other models.

## Verification
- **Output Quality**: I manually verified that the model respects the JSON structure and provides relevant tasks (e.g., "Set up database schema" for a web app) rather than generic fluff.
- **Error Handling**: The application includes logic to clean up markdown code blocks if the model includes them, ensuring parsing succeeds.
