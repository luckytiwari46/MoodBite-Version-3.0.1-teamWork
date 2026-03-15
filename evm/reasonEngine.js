// evm/reasonEngine.js
// CORE: Explainable AI Generation

export function generateReason(emotion, strategyLabel, foodName, context, budgetMet = true, isFallback = false) {
    // 1. CAUSE COMPONENT
    let cause = "Based on your emotional signals";
    if (context === 'academic') cause = "Given the academic pressure";
    if (context === 'professional') cause = "With the professional demands";
    if (context === 'fridge') cause = "Using your available ingredients";
    if (context === 'water_only') cause = "Since hydration is your only option";

    // 2. EFFECT COMPONENT
    let effect = `, your system is in a state of ${emotion}.`;
    if (isFallback) effect = `, we found a budget-friendly option for your ${emotion} state.`;

    // 3. SOLUTION COMPONENT
    let solution = `"${foodName}" acts as a sensory intervention.`;
    if (strategyLabel.includes("Release")) {
        solution = `"${foodName}" provides the spicy kick needed to vent this pent-up energy.`;
    } else if (strategyLabel.includes("Calm")) {
        solution = `"${foodName}" offers the warmth and familiarity required to lower cortisol levels.`;
    } else if (strategyLabel.includes("Comfort")) {
        solution = `"${foodName}" triggers a serotonin release to gently lift your mood.`;
    } else if (strategyLabel.includes("Grounding")) {
        solution = `"${foodName}" helps stabilize your thoughts through dense, grounding nutrition.`;
    } else if (strategyLabel.includes("Celebration")) {
        solution = `"${foodName}" perfectly matches your high vibrations to celebrate this moment.`;
    }

    // Budget override
    if (!budgetMet) {
        solution += " (Note: This slightly exceeds your specified budget but is the best thematic match.)";
    }

    return `${cause}${effect} ${solution}`;
}
