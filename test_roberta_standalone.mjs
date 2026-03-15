// test_roberta_standalone.mjs
import { detectEmotionWithRoberta } from './evm/roberta.js';

async function test() {
    console.log("Testing Standalone RoBERTa Module...");

    // Simulate initial load
    const start = Date.now();
    const t1 = "I am so happy today!";
    console.log(`\nInput: "${t1}"`);
    const r1 = await detectEmotionWithRoberta(t1);
    console.log(`Result:`, r1);
    console.log(`Time: ${Date.now() - start}ms`);

    const t2 = "I am furious about this error.";
    console.log(`\nInput: "${t2}"`);
    const r2 = await detectEmotionWithRoberta(t2);
    console.log(`Result:`, r2);
}

test();
