import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSideEffectGuidance(effect: string, severity: number): Promise<string> {
    const model = 'gemini-2.5-flash';
    const prompt = `
        You are HealthLoop AI, a helpful assistant for the HealthLoop app, which supports patients on weight loss medication.
        A user is reporting a side effect and its severity.
        Provide some practical, supportive, and non-prescriptive guidance.
        The guidance should be reassuring and suggest simple home remedies or actions if appropriate.
        **IMPORTANT**: Emphasize that this is not medical advice and they should contact their doctor for any serious or persistent concerns.
        Format the response in Markdown. Use bullet points for tips.

        Patient's report:
        - Side Effect: ${effect}
        - Severity: ${severity}/10
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching guidance from Gemini API:", error);
        return "I'm sorry, I'm having trouble providing guidance right now. Please consult your healthcare provider for advice. If this issue persists, please contact support.";
    }
}