
import { getFoodSuggestion } from './evm/foodEngine.js';
import { judgeEmotion } from './evm/judge.js';

async function testMood(mood) {
    const judgment = await judgeEmotion(mood);
    const suggestion = getFoodSuggestion(judgment.mood, mood);
    console.log(`Input: ${mood} -> Predicted Mood: ${judgment.mood} -> Food: ${suggestion.suggestedFood}`);
    return suggestion;
}

async function runTests() {
    console.log("--- Mood Search Verification ---");
    await testMood("happy");
    await testMood("sad");
    await testMood("angry");
    await testMood("stressed");
    await testMood("tired");
    await testMood("sick");
    await testMood("relaxed");
}

runTests();
