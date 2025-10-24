
import { GoogleGenAI, Modality } from "@google/genai";

export async function generateHeadshot(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: `Generate a photorealistic, professional headshot based on the person in this image. Apply the following style: ${prompt}. Ensure the result is high-quality and suitable for a professional profile. Do not alter the person's key facial features, but enhance the overall quality to a professional headshot standard. If the user asks to remove something, remove it seamlessly.`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image data found in the Gemini API response.");

  } catch (error) {
    console.error("Error generating headshot:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate headshot: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the headshot.");
  }
}
