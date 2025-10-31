
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

export const analyzeAlternatives = async (text: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      alternatives: {
        type: Type.ARRAY,
        description: "A list of software alternatives to Primavera P6.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the software alternative." },
            category: { type: Type.STRING, description: "Category: 'Open-Source', 'Commercial', or 'Specialized'." },
            keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key features." },
            pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of pros." },
            cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of cons." },
            howToGetStarted: { type: Type.STRING, description: "Instructions on how to get started." },
            website: { type: Type.STRING, description: "The main website URL for the tool, extracted from the 'How to Get Started' section." },
            pricing: { type: Type.STRING, description: "Pricing information, if available. Should be 'Free' if it's an open-source tool with no listed price." }
          },
           required: ["name", "category", "keyFeatures", "pros", "cons", "howToGetStarted", "website", "pricing"]
        },
      },
      migrationTips: {
        type: Type.ARRAY,
        description: "A list of tips for migrating from Primavera.",
        items: {
          type: Type.OBJECT,
          properties: {
            tip: { type: Type.STRING, description: "The title of the tip (e.g., 'Data Migration')." },
            description: { type: Type.STRING, description: "The detailed description of the tip." }
          },
          required: ["tip", "description"]
        }
      }
    },
    required: ["alternatives", "migrationTips"]
  };

  const prompt = `
    Analyze the following text about Primavera P6 alternatives. Extract the information for each tool and structure it into a JSON object.
    Also, extract the "Tips for Cloning or Migrating from Primavera". The JSON object must strictly follow the provided schema.
    For the 'website' field, extract the domain name (e.g., 'projectlibre.com') from the 'How to Get Started' text.
    For 'pricing', extract the cost information mentioned. If it is mentioned as free, use 'Free'.
    Categorize each tool correctly based on the text's sections (Open-Source, Commercial, Specialized).
    
    Text to analyze:
    ---
    ${text}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);
    return parsedJson as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze alternatives: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing alternatives.");
  }
};
