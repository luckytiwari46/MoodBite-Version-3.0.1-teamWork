import { getFoodSuggestion } from './evm/foodEngine.js';

const testCases = [
    { name: "Diabetes Filter (Sugar)", input: "I have diabetes and I'm stressed", emotion: "stress", healthFilters: ["sugar"] },
    { name: "BP Filter (Salt)", input: "I have high BP and I'm angry", emotion: "anger", healthFilters: ["salt"] },
    { name: "No Filter", input: "I'm stressed", emotion: "stress", healthFilters: [] }
];

console.log("--- Doctor Mode Verification Test ---");

testCases.forEach(t => {
    console.log(`\nTest Case: ${t.name}`);
    console.log(`Input: "${t.input}"`);

    const result = getFoodSuggestion(t.emotion, t.input, "", null, t.healthFilters);

    console.log(`Suggestion: ${result.suggestedFood}`);
    console.log(`Health Advice: ${result.healthAdvice || "None"}`);

    if (t.healthFilters.length > 0) {
        if (result.healthAdvice && result.healthAdvice.includes(t.healthFilters[0])) {
            console.log("✅ Filter Applied Correctly");
        } else {
            console.log("❌ Filter NOT Applied");
        }
    } else {
        console.log("✅ No Filter expected - Passed");
    }
});
