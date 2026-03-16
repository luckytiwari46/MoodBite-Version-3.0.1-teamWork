// pages/api/suggestFood.js
// LEVEL 4 & 6: Unified Expert Hybrid System

import { judgeEmotion } from '../../evm/judge';
import { getFoodSuggestion } from '../../evm/foodEngine';
import { generateReason } from '../../evm/reasonEngine';
import { explainVector } from '../../evm/fusion';
import { analyzeTrajectory } from '../../evm/trajectory';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: "Method Not Allowed" });

    const { text, ingredients, moodOverride, moodHistory } = req.body;

    // 1. EXTRACT FILTERS (Doctor, Budget, and Calories Mode)
    const budgetMatch = text.match(/(\d+)\s*(rs|rupees|bucks|inr)/i);
    const budget = budgetMatch ? parseInt(budgetMatch[1]) : null;

    const calMatch = text.match(/(\d+)\s*(kcal|calories|cal)\b/i);
    const maxCalories = calMatch ? parseInt(calMatch[1]) : null;

    const healthFilters = [];
    if (text.match(/diabetes|sugar/i)) healthFilters.push('sugar');
    if (text.match(/bp|blood pressure|salt/i)) healthFilters.push('salt');
    if (text.match(/cholesterol|oil|oily/i)) healthFilters.push('oil');
    if (text.match(/heart|fat/i)) healthFilters.push('oil');

    // 2. EMOTION JUDGMENT (AI + Rules)
    let judgment;
    if (moodOverride) {
        judgment = {
            mood: moodOverride,
            confidence: 100,
            source: "Image Scan",
            vector: { valence: 0, arousal: 0.5, control: 0.5, certainty: 1 }
        };
    } else {
        judgment = await judgeEmotion(text);
    }

    // 3. REASONING & FOOD SELECTION
    // CORE SYNC: Call the food engine with all parameters
    const foodData = getFoodSuggestion(judgment.mood, text, ingredients, budget, healthFilters, maxCalories);

    const reason = generateReason(
        judgment.mood,
        foodData.strategyLabel,
        foodData.suggestedFood,
        ingredients ? 'fridge' : judgment.context,
        foodData.budgetMet,
        foodData.isFallback
    );

    // 4. ADVANCED INSIGHTS (XAI + Trajectory)
    const xaiExplanation = explainVector(judgment.vector);
    const trajectory = analyzeTrajectory(moodHistory);

    // 5. CONSTRUCTION
    const response = {
        predictedMood: judgment.mood,
        suggestedFood: foodData.suggestedFood,
        reason: reason,
        confidenceScore: judgment.confidence,
        source: judgment.source,
        imageUrl: foodData.imageUrl,
        price: foodData.price,
        calories: foodData.calories,
        otherSuggestions: foodData.otherSuggestions,
        explanation: xaiExplanation,
        trajectory: trajectory,
        healthAdvice: foodData.healthAdvice,
        moodCondition: foodData.moodCondition,
        suggestedCalorieRange: foodData.suggestedCalorieRange,
        healthPurpose: foodData.healthPurpose
    };

    res.status(200).json(response);
}
