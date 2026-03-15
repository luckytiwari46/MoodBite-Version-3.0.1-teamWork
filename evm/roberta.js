// evm/roberta.js
import { pipeline, env } from '@xenova/transformers';

// Skip local model checks for serverless environments
env.allowLocalModels = false;
env.useBrowserCache = false;

class RobertaModel {
    static instance = null;

    static async getInstance() {
        if (!this.instance) {
            console.log("[RoBERTa] Loading model...");
            this.instance = await pipeline('text-classification', 'Xenova/roberta-base-go_emotions', {
                quantized: true // Use quantized version for speed
            });
            console.log("[RoBERTa] Model loaded.");
        }
        return this.instance;
    }
}

export async function detectEmotionWithRoberta(text) {
    try {
        const classifier = await RobertaModel.getInstance();
        const results = await classifier(text, { topk: 3 }); // Get top 3 emotions

        // Standardize output
        // results example: [{ label: 'joy', score: 0.9 }, ...]
        const topResult = results[0];

        return {
            mood: topResult.label,
            confidence: Math.round(topResult.score * 100),
            allScores: results
        };

    } catch (error) {
        console.error("[RoBERTa] Error:", error);
        return {
            mood: 'neutral',
            confidence: 0,
            error: true
        };
    }
}
