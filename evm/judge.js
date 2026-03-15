// evm/judge.js
import { ExpertPanel } from './experts';

export async function judgeEmotion(text) {
    const experts = new ExpertPanel(text);

    // 1. FAST TRACK: Explicit Emotion (Rule-based has highest priority for very specific keywords)
    const direct = experts.consultDirect();
    if (direct.detected) {
        return {
            mood: direct.emotion,
            confidence: direct.confidence,
            source: "Direct Match",
            vector: simulateVector(direct.emotion),
            context: null
        };
    }

    // 2. AI MODEL: RoBERTa Analysis
    let aiResult = { mood: null, confidence: 0 };
    try {
        const roberta = await import('./roberta');
        aiResult = await roberta.detectEmotionWithRoberta(text);
        console.log(`[Judge] RoBERTa says: ${aiResult.mood} (${aiResult.confidence}%)`);
    } catch (e) {
        console.error("RoBERTa dynamic import failed:", e);
    }

    // 3. INFERENCE MODE: Gather Classic Signals (as fallback or vector data)
    const lexiconScores = experts.consultLexicon();
    const conflict = experts.consultConflict();
    const context = experts.consultContext();

    // 4. COMPUTE EVM VECTOR (The Physics)
    // Valence: Sum of Positive Emos - Sum of Negative Emos
    let posScore = sumScores(lexiconScores, ['joy', 'excitement', 'love', 'gratitude', 'pride', 'relief']);
    let negScore = sumScores(lexiconScores, ['anger', 'rage', 'sadness', 'fear', 'disgust', 'grief']);
    let valence = (posScore - negScore);
    valence = Math.max(-1, Math.min(1, valence / 3)); // Normalize

    // Arousal: Sum of High Energy Emos + Conflict Boost
    let energyScore = sumScores(lexiconScores, ['anger', 'rage', 'excitement', 'panic', 'stress', 'happy']);
    let arousal = (energyScore * 0.2) + conflict.arousalBoost;
    arousal = Math.max(0, Math.min(1, arousal));

    // Control & Certainty
    let control = 0.5 + context.contextMod.control;
    let certainty = 0.5 + context.contextMod.certainty;

    if (conflict.conflictLevel === "medium") {
        control = 0.3;
        certainty = 0.6;
    }
    if (conflict.conflictLevel === "strong") {
        control = 0.2;
        certainty = 0.8;
    }

    const vector = { valence, arousal, control, certainty };

    // 5. FINAL DECISION: AI vs Classic
    let decisionMagnitude = 0; // how strong is the classic signal?
    const sortedEmotions = Object.entries(lexiconScores).sort((a, b) => b[1] - a[1]);
    if (sortedEmotions.length > 0) decisionMagnitude = sortedEmotions[0][1];

    let finalMood = 'neutral';
    let finalConf = 0;
    let source = "Inferred Logic";

    // Logic: If AI is confident (>50%), trust AI.
    // If AI is weak/neutral but Classic is strong, trust Classic.
    // Else fall back to Neutral.
    if (aiResult.mood && aiResult.mood !== 'neutral' && aiResult.confidence > 40) {
        finalMood = aiResult.mood;
        finalConf = aiResult.confidence;
        source = "AI (RoBERTa)";
    } else if (decisionMagnitude > 0) {
        finalMood = sortedEmotions[0][0];
        finalConf = 60 + (decisionMagnitude * 10); // Rough estimation
        source = "Heuristic Expert";
    } else if (aiResult.mood === 'neutral') {
        finalMood = 'neutral';
        finalConf = aiResult.confidence;
    } else {
        // Default to AI if it has *something*
        finalMood = aiResult.mood || 'neutral';
    }

    return {
        mood: finalMood,
        confidence: finalConf,
        source: source,
        vector,
        context: context.detectedContext
    };
}

function sumScores(scores, keys) {
    return keys.reduce((acc, k) => acc + (scores[k] || 0), 0);
}

// Maps emotions to approximate vectors (for UI visualization only)
function simulateVector(emotion) {
    const map = {
        anger: { v: -0.8, a: 0.8, c: 0.6, cer: 0.8 },
        rage: { v: -0.9, a: 1.0, c: 0.1, cer: 0.9 },
        sadness: { v: -0.7, a: -0.2, c: 0.2, cer: 0.4 },
        sad: { v: -0.7, a: -0.2, c: 0.2, cer: 0.4 },
        sick: { v: -0.4, a: -0.6, c: 0.1, cer: 0.7 },
        tired: { v: -0.2, a: -0.8, c: 0.3, cer: 0.6 },
        happy: { v: 0.8, a: 0.6, c: 0.7, cer: 0.8 },
        joy: { v: 0.8, a: 0.6, c: 0.7, cer: 0.8 },
        stress: { v: -0.6, a: 0.4, c: 0.2, cer: 0.3 },
        relaxed: { v: 0.5, a: -0.4, c: 0.8, cer: 0.8 },
        neutral: { v: 0, a: 0, c: 0.5, cer: 0.5 }
    };
    const def = map[emotion] || { v: 0, a: 0, c: 0.5, cer: 0.5 };
    return { valence: def.v, arousal: def.a, control: def.c, certainty: def.cer };
}
