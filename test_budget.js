
const { getFoodSuggestion } = require('./evm/foodEngine');

async function test(text, mood) {
    console.log(`Input: "${text}" (Mood: ${mood})`);

    // Extract budget (Mocking API logic)
    let budget = null;
    const budgetMatch = text.match(/(\d+)\s*(?:rs|rupees|inr|₹)|(?:₹|inr)\s*(\d+)/i);
    if (budgetMatch) {
        budget = parseInt(budgetMatch[1] || budgetMatch[2]);
    }
    console.log(`Extracted Budget: ${budget ? '₹' + budget : 'None'}`);

    const foodData = getFoodSuggestion(mood, text, "", budget);
    console.log(`Selected Food: ${foodData.suggestedFood} (₹${foodData.price})`);
    console.log(`Budget Met: ${foodData.budgetMet}`);
    console.log(`Is Fallback: ${foodData.isFallback}`);
    console.log(`Alternatives: ${foodData.otherSuggestions.map(s => `${s.food} (₹${s.price})`).join(', ')}`);
    console.log('---');
}

async function run() {
    console.log("--- BUDGET FILTERING TESTS ---\n");
    await test("im sad and i have 150 rs", "sad");
    await test("i am happy and i have 500 inr", "joy");
    await test("im angry and only have ₹50", "anger");
    await test("feeling stressed, budget is 20 rs", "stress");
    await test("no budget mentioned here", "neutral");
}

run();
