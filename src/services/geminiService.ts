import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateMathematicalStory(concept: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the mathematical concept of "${concept}" as a narrative story or a "narrative proof". 
      The story should take the reader on a journey to connect two seemingly unrelated realms. 
      Keep it concise (under 200 words) and poetic yet mathematically grounded.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    return "The narrative structure collapsed. Please try again.";
  }
}
