// evm/foodEngine.js
// CORE: Food Recommendation Logic (Indian Cuisine) - Fridge Aware

// 1. DATABASE (Object-Based)
const FOOD_DATABASE = [
    // --- SPICY RELEASE (Anger, Rage, Frustration) ---
    { name: "Mint Lemonade", strategy: "release", ingredients: ["mint", "lemon", "water"], minRequired: ["lemon"], price: 40, image: "https://www.mirchitales.com/wp-content/uploads/2020/07/Frozen-Mint-Lemonade-or-Mint-and-Lemon-Slush-6.jpg", healthTags: [] },
    { name: "Curd Rice", strategy: "release", ingredients: ["rice", "curd", "salt"], minRequired: ["rice", "curd"], price: 120, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/curd-rice-featured.jpg", healthTags: ["dairy", "salt"] },
    { name: "Coconut Water", strategy: "release", ingredients: ["coconut"], minRequired: ["coconut"], price: 60, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/curd-rice-featured.jpg", healthTags: [] },
    { name: "Fresh Fruit Salad", strategy: "release", ingredients: ["fruits"], minRequired: ["fruits"], price: 150, image: "https://joyfoodsunshine.com/wp-content/uploads/2022/05/summer-fruit-salad-recipe-1.jpg", healthTags: ["sugar"] },

    // --- CALMING WARMTH (Stress, Anxiety, Relaxed, Peaceful) ---
    { name: "Dark Chocolate", strategy: "calm", ingredients: ["chocolate", "cocoa"], minRequired: ["chocolate"], price: 80, image: "https://jindalcocoa.com/cdn/shop/files/DarkChocolateClassic_d43f0e02-bb10-4276-a95e-f704f6c1a6f6.jpg?v=1742475843", healthTags: ["sugar"] },
    { name: "Banana", strategy: "calm", ingredients: ["banana"], minRequired: ["banana"], price: 20, image: "https://zamaorganics.com/cdn/shop/files/banana1000_x_1000_px_1.png?v=1752738968", healthTags: [] },
    { name: "Oats Porridge", strategy: "calm", ingredients: ["oats", "milk"], minRequired: ["oats"], price: 95, image: "https://gracefoods.com/images/cropped-Oats.jpg", healthTags: ["dairy"] },
    { name: "Green Tea", strategy: "calm", ingredients: ["green tea"], minRequired: ["green tea"], price: 40, image: "https://gracefoods.com/images/cropped-Oats.jpg", healthTags: [] },
    { name: "Pizza", strategy: "calm", ingredients: ["dough", "cheese", "tomato"], minRequired: ["dough"], price: 250, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHr4FiIslJFTrLxaoRgE1djF3rTfgBDS-kOw&s", healthTags: ["dairy", "oil", "salt"] },
    { name: "Cold Coffee", strategy: "calm", ingredients: ["coffee", "milk"], minRequired: ["coffee"], price: 120, image: "https://mytastycurry.com/wp-content/uploads/2020/04/Cafe-style-cold-coffee-with-icecream.jpg", healthTags: ["dairy", "sugar"] },
    { name: "Nachos", strategy: "calm", ingredients: ["corn chips", "cheese"], minRequired: ["corn chips"], price: 180, image: "https://www.emborg.com/app/uploads/2023/07/1200x900px_3_Step_Nachos_Snack.png", healthTags: ["dairy", "salt"] },
    { name: "Pasta", strategy: "calm", ingredients: ["pasta", "sauce"], minRequired: ["pasta"], price: 220, image: "https://s.lightorangebean.com/media/20240914160809/Spicy-Penne-Pasta_-done.png", healthTags: ["oil", "salt"] },

    // --- COMFORT SEROTONIN (Sadness, Grief, Lonely) ---
    { name: "Hot Chocolate", strategy: "comfort", ingredients: ["chocolate", "milk"], minRequired: ["chocolate"], price: 150, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwqlkvVSNrMSTbuobR0WpGSx660WMqQqEBA&s", healthTags: ["sugar", "dairy"] },
    { name: "Khichdi", strategy: "comfort", ingredients: ["rice", "dal"], minRequired: ["rice", "dal"], price: 100, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwqlkvVSNrMSTbuobR0WpGSx660WMqQqEBA&s", healthTags: [] },
    { name: "Rajma Chawal", strategy: "comfort", ingredients: ["rice", "kidney beans"], minRequired: ["rice", "kidney beans"], price: 140, image: "https://encrypted-tbn0.gstatic.com/images/2024/09/Rajma-Chawal.jpg", healthTags: [] },
    { name: "Vegetable Soup", strategy: "comfort", ingredients: ["vegetables", "water"], minRequired: ["vegetables"], price: 120, image: "https://downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main-500x375.jpg", healthTags: [] },

    // --- WELLNESS BOOST (Sick, Recovery) ---
    { name: "Turmeric Milk", strategy: "wellness", ingredients: ["milk", "turmeric"], minRequired: ["milk", "turmeric"], price: 60, image: "https://www.indianveggiedelight.com/wp-content/uploads/2020/09/quinoa-khichdi-featured.jpg", healthTags: ["dairy"] },
    { name: "Ginger Tea", strategy: "wellness", ingredients: ["tea", "ginger"], minRequired: ["tea"], price: 40, image: "https://cdn.prod.website-files.com/622a6fe969eefa25142deced/689fa40926b5953550bbdc81_tea%20with%20ginger.png", healthTags: [] },
    { name: "Wellness Khichdi", strategy: "wellness", ingredients: ["rice", "dal", "turmeric"], minRequired: ["rice"], price: 100, image: "https://www.indianveggiedelight.com/wp-content/uploads/2020/09/quinoa-khichdi-featured.jpg", healthTags: [] },

    // --- CELEBRATION FEAST (Happy, Joy, Excited) ---
    { name: "Gulab Jamun", strategy: "celebration", ingredients: ["flour", "milk", "sugar"], minRequired: ["flour", "sugar"], price: 80, image: "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800", healthTags: ["sugar", "dairy"] },
    { name: "Paneer Butter Masala", strategy: "celebration", ingredients: ["paneer", "butter", "tomato"], minRequired: ["paneer"], price: 320, image: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-5.jpg", healthTags: ["dairy", "oil"] },
    { name: "Chocolate Cake", strategy: "celebration", ingredients: ["flour", "sugar", "chocolate"], minRequired: ["flour", "sugar"], price: 450, image: "https://p0.pxfuel.com/preview/83/889/537/chocolate-cake-cake-dessert-sweet.jpg", healthTags: ["sugar", "dairy"] },
    { name: "Masala Dosa", strategy: "celebration", ingredients: ["rice", "dal", "potato"], minRequired: ["potato"], price: 140, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRKEoKRezBKpHWYUIbZaKX9Kw_qCv-hQfTVw&s", healthTags: ["oil"] },

    // --- SENSORY RESET (Tired, Low Energy, Bored) ---
    { name: "Banana Smoothie", strategy: "reset", ingredients: ["banana", "milk"], minRequired: ["banana"], price: 110, image: "https://cookathomemom.com/wp-content/uploads/2020/10/MangoBananaSmoothieFinished.jpg", healthTags: ["dairy"] },
    { name: "Peanut Butter Sandwich", strategy: "reset", ingredients: ["bread", "peanut butter"], minRequired: ["bread"], price: 80, image: "https://p1.pxfuel.com/preview/442/651/233/peanut-butter-sandwich-bread-toast-food.jpg", healthTags: [] },
    { name: "Boiled Eggs", strategy: "reset", ingredients: ["eggs"], minRequired: ["eggs"], price: 40, image: "https://p0.pxfuel.com/preview/835/1012/65/egg-eggs-food-boiled-egg.jpg", healthTags: [] },
    { name: "Dry Fruits", strategy: "reset", ingredients: ["nuts", "raisins"], minRequired: ["nuts"], price: 200, image: "https://p0.pxfuel.com/preview/716/871/10/nuts-dried-fruit-healthy-snack.jpg", healthTags: [] },

    // --- GROUNDING STABILITY (Confusion, Uncertainty, Surprise, Curiosity, Focused, Thoughtful) ---
    { name: "Plain Yogurt", strategy: "grounding", ingredients: ["yogurt"], minRequired: ["yogurt"], price: 50, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/curd-featured.jpg", healthTags: ["dairy"] },
    { name: "Roti/Chapati", strategy: "grounding", ingredients: ["flour", "water"], minRequired: ["flour"], price: 15, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/roti-featured.jpg", healthTags: [] },
    { name: "Dal (Lentil Soup)", strategy: "grounding", ingredients: ["dal", "water"], minRequired: ["dal"], price: 80, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/dal-featured.jpg", healthTags: [] },
    { name: "Steamed Rice", strategy: "grounding", ingredients: ["rice", "water"], minRequired: ["rice"], price: 70, image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/08/rice-featured.jpg", healthTags: [] }
];

const STRATEGY_LABELS = {
    release: "Spicy Release",
    calm: "Calming Warmth",
    comfort: "Comfort & Serotonin",
    grounding: "Grounding Stability",
    celebration: "Celebration Feast",
    reset: "Sensory Reset",
    wellness: "Wellness Boost"
};

const EMOTION_TO_STRATEGY = {
    anger: 'release', rage: 'release', frustration: 'release', disgust: 'reset',
    stress: 'calm', anxiety: 'calm', fear: 'calm', embarrassment: 'calm', relaxed: 'calm', peaceful: 'calm',
    sadness: 'comfort', sad: 'comfort', grief: 'comfort', regret: 'comfort', disappointment: 'comfort', shame: 'comfort', guilt: 'comfort', lonely: 'comfort',
    confusion: 'grounding', uncertainty: 'grounding', surprise: 'grounding', curiosity: 'grounding', focused: 'grounding', thoughtful: 'grounding',
    joy: 'celebration', happy: 'celebration', excitement: 'celebration', love: 'celebration', pride: 'celebration', gratitude: 'celebration', relief: 'celebration', energetic: 'celebration', confident: 'celebration',
    neutral: 'reset', bored: 'reset', indifferent: 'reset', tired: 'reset', sick: 'wellness'
};

// HELPER: Deterministic Hash function
function getHash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// HELPER: Ingredient Scoring
function scoreCandidate(candidate, userIngredients) {
    const userList = userIngredients.map(i => i.toLowerCase().trim());
    // 1. Check Min Required (Strict)
    const hasMin = candidate.minRequired.every(req =>
        userList.some(userItem => userItem.includes(req) || req.includes(userItem))
    );
    if (!hasMin) return 0;

    // 2. Score Overlap
    let matches = 0;
    candidate.ingredients.forEach(ing => {
        if (userList.some(userItem => userItem.includes(ing) || ing.includes(userItem))) {
            matches++;
        }
    });

    return matches / candidate.ingredients.length;
}

export function getFoodSuggestion(emotion, userInput, ingredientsString = "", budget = null, healthFilters = []) {
    const strategyKey = EMOTION_TO_STRATEGY[emotion] || 'reset';
    const label = STRATEGY_LABELS[strategyKey];

    // Parse Fridge Input
    const userIngredients = ingredientsString.split(',').filter(s => s.trim().length > 0);
    const hasIngredients = userIngredients.length > 0;

    // Step 1: Filter by Strategy
    let strategyCandidates = FOOD_DATABASE.filter(f => f.strategy === strategyKey);

    // HEALTH FILTERING (Doctor Mode)
    let healthAdvice = null;
    if (healthFilters.length > 0) {
        const remaining = strategyCandidates.filter(f =>
            !f.healthTags.some(tag => healthFilters.includes(tag))
        );

        if (remaining.length > 0) {
            strategyCandidates = remaining;
            healthAdvice = `🩺 Avoiding ${healthFilters.join(', ')} (Health/Doctor's advice)`;
        } else {
            // If everything in current strategy is "unhealthy" for this user,
            // fallback to 'reset' strategy which has more healthy options (like water)
            const healthyReset = FOOD_DATABASE.filter(f =>
                f.strategy === 'reset' && !f.healthTags.some(tag => healthFilters.includes(tag))
            );
            if (healthyReset.length > 0) {
                strategyCandidates = healthyReset;
                healthAdvice = `🩺 Suggesting alternatives to avoid ${healthFilters.join(', ')}`;
            }
        }
    }

    // BUDGET FILTERING
    let budgetWarning = false;
    if (budget !== null) {
        const affordable = strategyCandidates.filter(f => f.price <= budget);
        if (affordable.length > 0) {
            strategyCandidates = affordable;
        } else {
            const cheaperReset = FOOD_DATABASE.filter(f => f.strategy === 'reset' && f.price <= budget);
            if (cheaperReset.length > 0) {
                strategyCandidates = cheaperReset;
                budgetWarning = true;
            }
        }
    }

    // Step 2: Fridge Logic
    let finalCandidates = strategyCandidates;
    let method = "Universal Fallback";

    if (hasIngredients) {
        if (userIngredients.length === 1 && userIngredients[0].toLowerCase().includes('water')) {
            const waterOption = strategyCandidates.find(f => f.ingredients.length === 1 && f.ingredients.includes('water'));
            if (waterOption) {
                finalCandidates = [waterOption];
                method = "Water Logic";
            }
        } else {
            const scored = strategyCandidates.map(f => ({
                food: f,
                score: scoreCandidate(f, userIngredients)
            })).filter(x => x.score > 0);

            if (scored.length > 0) {
                scored.sort((a, b) => b.score - a.score);
                finalCandidates = scored.map(x => x.food);
                method = "Fridge Match";
            }
        }
    }

    // Step 3: Deterministic Selection
    const hash = getHash(userInput + (ingredientsString || ""));
    const index = hash % finalCandidates.length;
    const mainFood = finalCandidates[index];

    // Get related from the SAME final pool
    const related = finalCandidates.filter(f => f.name !== mainFood.name).slice(0, 3).map(f => ({
        food: f.name,
        image: f.image,
        price: f.price,
        healthTags: f.healthTags
    }));

    return {
        strategyLabel: label,
        suggestedFood: mainFood.name,
        price: mainFood.price,
        imageUrl: mainFood.image,
        otherSuggestions: related,
        sourceMethod: method,
        budgetMet: budget === null || mainFood.price <= budget,
        isFallback: budgetWarning,
        healthAdvice: healthAdvice
    };
}
