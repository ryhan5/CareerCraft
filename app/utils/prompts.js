// app/utils/prompts.js

export const createCareerPrompt = (userInput) => `
As an expert career advisor specializing in technology and professional development, provide detailed guidance on: ${userInput}

Please structure your response in the following format:

### Overview
• Brief summary of the topic
• Current industry relevance

### Detailed Analysis
• Market trends and demands
• Future outlook
• Key challenges and opportunities

### Technical Requirements
• Essential skills needed
• Required certifications or qualifications
• Technology stack recommendations
• Learning path suggestions

### Action Steps
1. Immediate actions to take
2. Short-term goals (3-6 months)
3. Long-term goals (1-2 years)

### Pro Tips
• Best practices
• Common mistakes to avoid
• Interview preparation advice
• Portfolio building suggestions
`;

export const promptTypes = {
  skills: (skills) => `
    Analyze the following technical skills: ${skills}
    [Rest of your skills prompt...]
  `,
  
  salary: (role) => `
    Provide salary negotiation guidance for ${role}
    [Rest of your salary prompt...]
  `,
  
  interview: (position) => `
    Prepare interview guidance for ${position}
    [Rest of your interview prompt...]
  `
};
