# Prompts Used

This document records the prompt engineering used to guide the AI model.

## Task Generation Prompt

**System Role**: Senior Product Manager and Engineering Lead

**Input Variables**:
- `goal`: ${goal}
- `users`: ${users}
- `constraints`: ${constraints}
- `template`: ${template}

**Prompt Template**:
```text
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
```

**Reasoning**:
- Explicitly requesting "JSON only" and "no markdown" helps prevent parsing errors.
- Defining a schema with `id`, `type`, etc., ensures the frontend can render components correctly (like badges for task types).
- Asking for "technical and actionable" tasks avoids vague output.
