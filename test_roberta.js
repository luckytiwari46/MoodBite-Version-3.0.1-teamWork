// test_roberta.js
import { judgeEmotion } from './evm/judge.js';

async function test() {
    console.log("Testing RoBERTa integration...");

    const texts = [
        "I am so happy today!",
        "I hate this traffic so much.",
        "I feel very anxious about the presentation."
    ];

    for (const text of texts) {
        console.log(`\nInput: "${text}"`);
        const result = await judgeEmotion(text);
        console.log(`Predicted Mood: ${result.mood}`);
        console.log(`Confidence: ${result.confidence}`);
        console.log(`Source: ${result.source}`);
    }
}

test();
