// pages/api/detectEmotionFromImage.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { image } = req.body; // Base64 string
    if (!image) return res.status(400).json({ message: 'Image data is required' });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const imagePart = {
            inlineData: {
                data: image.split(',')[1],
                mimeType: "image/jpeg"
            }
        };

        const prompt = `Analyze the facial expression and mood of the person in this image. 
        Return a JSON object with two fields: 
        1. "mood": a single lowercase string representing the emotion (e.g., happy, sad, anger, stress, calm, surprise).
        2. "confidence": a number between 0 and 100.
        
        Example output:
        { "mood": "happy", "confidence": 95 }
        
        Return ONLY the JSON.`;

        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();

        // Parse JSON from the response (handling potential markdown code blocks)
        let jsonStr = text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(jsonStr);

        res.status(200).json(data);

    } catch (error) {
        console.error("Image Emotion Detection Error:", error);
        res.status(500).json({ message: "Failed to detect emotion", mood: "neutral", confidence: 0 });
    }
}
