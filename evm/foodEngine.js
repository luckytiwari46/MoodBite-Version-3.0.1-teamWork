// evm/foodEngine.js
// CORE: Food Recommendation Logic (Indian Cuisine) - Fridge Aware

// 1. DATABASE (Object-Based)
const FOOD_DATABASE = [
    // --- SPICY RELEASE (Anger, Rage, Frustration) ---
    { name: "Pani Puri", strategy: "release", ingredients: ["puri", "water", "potato"], minRequired: ["puri"], price: 40, calories: 150, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0njVTBVJa3BtcVJ0WSeu-3Zr5280dm3LWNA&s", healthTags: ["salt"], healthBenefit: "quick energy and sensory distraction" },
    { name: "Samosa", strategy: "release", ingredients: ["potato", "flour", "oil"], minRequired: ["potato"], price: 30, calories: 260, image: "https://spicecravings.com/wp-content/uploads/2021/03/Samosa-6.jpg", healthTags: ["oil"], healthBenefit: "quick energy" },
    { name: "Maggi / Noodles", strategy: "release", ingredients: ["noodles", "water", "spice"], minRequired: ["noodles"], price: 50, calories: 350, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkgGW7T-_vDXLsnrud0GB5lz6XzEYfHzzVQ&s", healthTags: ["salt"], healthBenefit: "warm, comforting carb boost" },
    
    // --- CALMING WARMTH (Stress, Anxiety, Relaxed, Peaceful) ---
    { name: "Masala Chai", strategy: "calm", ingredients: ["tea", "milk", "spices"], minRequired: ["tea"], price: 20, calories: 120, image: "https://images.slurrp.com/webstories/wp-content/uploads/2022/11/cropped-shutterstock_2044313225.jpg", healthTags: ["dairy", "sugar"], healthBenefit: "relaxation, energy" },
    { name: "Green Tea", strategy: "calm", ingredients: ["tea", "water"], minRequired: ["tea"], price: 40, calories: 2, image: "https://w0.peakpx.com/wallpaper/891/316/HD-wallpaper-chocolate-ka-chocolate-bar.jpg", healthTags: [], healthBenefit: "relaxation, metabolism" },
    { name: "Raita", strategy: "calm", ingredients: ["curd", "cucumber", "salt"], minRequired: ["curd"], price: 60, calories: 90, image: "https://www.cookwithmanali.com/wp-content/uploads/2022/04/Boondi-Raita.jpg", healthTags: ["dairy"], healthBenefit: "cooling, digestion" },
    { name: "Dosa", strategy: "calm", ingredients: ["rice", "dal", "potato"], minRequired: ["rice", "dal"], price: 120, calories: 160, image: "https://www.daringgourmet.com/wp-content/uploads/2023/06/Dosa-Recipe-3.jpg", healthTags: ["oil"], healthBenefit: "energy and light meal" },
    { name: "Chocolate", strategy: "calm", ingredients: ["chocolate", "cocoa"], minRequired: ["chocolate"], price: 80, calories: 530, image: "https://w0.peakpx.com/wallpaper/891/316/HD-wallpaper-chocolate-ka-chocolate-bar.jpg", healthTags: ["sugar"], healthBenefit: "mood improvement" },

    // --- COMFORT SEROTONIN (Sadness, Grief, Lonely) ---
    { name: "Dal Chawal", strategy: "comfort", ingredients: ["rice", "dal"], minRequired: ["rice", "dal"], price: 100, calories: 320, image: "https://c.ndtvimg.com/2024-02/84i4o33_dal-chawal_625x300_22_February_24.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350?im=FaceCrop,algorithm=dnn,width=1200,height=886", healthTags: [], healthBenefit: "simple nutrition" },
    { name: "Aloo Paratha", strategy: "comfort", ingredients: ["flour", "potato", "butter"], minRequired: ["flour", "potato"], price: 80, calories: 290, image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe-500x500.jpg", healthTags: ["oil", "dairy"], healthBenefit: "comforting carbs for a serotonin boost" },
    { name: "Ice Cream", strategy: "comfort", ingredients: ["milk", "sugar", "cream"], minRequired: ["milk", "sugar"], price: 120, calories: 210, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ice_Cream_dessert_02.jpg/330px-Ice_Cream_dessert_02.jpg", healthTags: ["sugar", "dairy"], healthBenefit: "cooling mood improvement" },

    // --- WELLNESS BOOST (Sick, Recovery) ---
    { name: "Khichdi", strategy: "wellness", ingredients: ["rice", "dal", "turmeric"], minRequired: ["rice", "dal"], price: 90, calories: 220, image: "https://i.pinimg.com/736x/70/2a/98/702a9834b4ef71c32d1cb8fef8b0a5ba.jpg", healthTags: [], healthBenefit: "easy digestion, light meal" },
    { name: "Idli Sambar", strategy: "wellness", ingredients: ["rice", "dal", "vegetables"], minRequired: ["rice", "dal"], price: 110, calories: 150, image: "https://shwetainthekitchen.com/wp-content/uploads/2022/01/hotel-style-idli-sambar-chutney.jpg", healthTags: [], healthBenefit: "healthy and easy digestion" },
    { name: "Vegetable Soup", strategy: "wellness", ingredients: ["vegetables", "water"], minRequired: ["vegetables"], price: 120, calories: 80, image: "https://www.connoisseurusveg.com/wp-content/uploads/2024/02/vegetable-noodle-soup-sq.jpg", healthTags: [], healthBenefit: "immunity support" },
    { name: "Tomato Soup", strategy: "wellness", ingredients: ["tomato", "water"], minRequired: ["tomato"], price: 100, calories: 70, image: "https://familystylefood.com/wp-content/uploads/2022/03/Roasted-Tomato-Soup-Spoon.jpg", healthTags: [], healthBenefit: "immunity support with vitamins" },
    { name: "Pomegranate Juice", strategy: "wellness", ingredients: ["pomegranate"], minRequired: ["pomegranate"], price: 90, calories: 130, image: "https://images.stockcake.com/public/6/c/7/6c700625-55b8-412e-8b6d-41b1826663d7_large/pomegranate-juice-glass-stockcake.jpg", healthTags: ["sugar"], healthBenefit: "antioxidants and immunity boost" },
    { name: "Chicken Soup", strategy: "wellness", ingredients: ["chicken", "water", "vegetables"], minRequired: ["chicken"], price: 180, calories: 200, image: "https://www.rachelcooks.com/wp-content/uploads/2025/09/Chicken-Farro-Soup-30web-square.jpg", healthTags: ["meat"], healthBenefit: "immunity support and protein recovery" },

    // --- CELEBRATION FEAST (Happy, Joy, Excited) ---
    { name: "Biryani", strategy: "celebration", ingredients: ["rice", "spices", "vegetables"], minRequired: ["rice", "spices"], price: 250, calories: 450, image: "https://feastwithsafiya.com/wp-content/uploads/2021/10/Veg-Dum-Biryani.jpg", healthTags: ["oil"], healthBenefit: "rich and satisfying meal" },
    { name: "Paneer Butter Masala", strategy: "celebration", ingredients: ["paneer", "butter", "tomato"], minRequired: ["paneer"], price: 300, calories: 380, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL4IT53-6LYPtUtD5c9xC9qPawkHH8-bbRiQ&s", healthTags: ["dairy", "oil"], healthBenefit: "protein and energy" },
    { name: "Pizza", strategy: "celebration", ingredients: ["dough", "cheese", "tomato"], minRequired: ["dough"], price: 350, calories: 285*3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_x0z7cjPMdgPl4_g4I4Gvywy4nszfWlTluQ&s", healthTags: ["dairy", "oil", "salt"], healthBenefit: "endorphin-boosting comfort meal" },
    { name: "Jalebi", strategy: "celebration", ingredients: ["flour", "sugar", "oil"], minRequired: ["flour", "sugar"], price: 60, calories: 450, image: "https://thatdeliciousdish.com/wp-content/uploads/2018/09/Thumbnail-Jalebi-and-Rabri-recipe-scaled.jpg", healthTags: ["sugar", "oil"], healthBenefit: "instant energy, sweet treat" },
    { name: "Gulab Jamun", strategy: "celebration", ingredients: ["milk powder", "sugar", "flour"], minRequired: ["sugar"], price: 70, calories: 300, image: "https://aartimadan.com/wp-content/uploads/2020/11/milk-powder-gulab-jamuns.jpg", healthTags: ["sugar", "dairy"], healthBenefit: "comforting dessert, mood booster" },
    { name: "Dahi Bada", strategy: "celebration", ingredients: ["curd", "urad dal", "spices"], minRequired: ["curd"], price: 80, calories: 240, image: "https://ministryofcurry.com/wp-content/uploads/2016/08/Dahi-Vada-5.jpg", healthTags: ["dairy"], healthBenefit: "cooling, festive flavor" },
    { name: "Lassi", strategy: "celebration", ingredients: ["curd", "sugar", "milk"], minRequired: ["curd"], price: 50, calories: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa_AjGsqbbB2AZqlG_n0D4DP4Bb4XvrZ3I3Q&s", healthTags: ["dairy", "sugar"], healthBenefit: "refreshing probiotic energy" },
    { name: "Mango Lassi", strategy: "celebration", ingredients: ["mango", "curd", "sugar"], minRequired: ["mango", "curd"], price: 80, calories: 250, image: "https://annikaeats.com/wp-content/uploads/2024/03/DSC_1071.jpg", healthTags: ["dairy", "sugar"], healthBenefit: "cooling, refreshing" },

    // --- SENSORY RESET (Tired, Low Energy, Bored) ---
    { name: "Lemon Water", strategy: "reset", ingredients: ["lemon", "water"], minRequired: ["lemon"], price: 20, calories: 15, image: "https://www.tradeindia.com/wp-content/uploads/2024/04/8-Health-Benefits-of-Drinking-Lemonade-Nimbu-Pani-jpg.webp", healthTags: [], healthBenefit: "hydration, vitamin C" },
    { name: "Coconut Water", strategy: "reset", ingredients: ["coconut"], minRequired: ["coconut"], price: 50, calories: 45, image: "https://152741721.cdn6.editmysite.com/uploads/1/5/2/7/152741721/EXUHITWTYRTBFCAPXHQ6LPFA.jpeg?width=2400&optimize=medium", healthTags: [], healthBenefit: "hydration and electrolytes" },
    { name: "Chhaas (Buttermilk)", strategy: "reset", ingredients: ["curd", "water", "spices"], minRequired: ["curd"], price: 30, calories: 40, image: "https://sandhyahariharan.co.uk/wp-content/uploads/2020/02/masala-chaas.jpg", healthTags: ["dairy"], healthBenefit: "digestion, cooling" },
    { name: "Fruit Salad", strategy: "reset", ingredients: ["fruits"], minRequired: ["fruits"], price: 120, calories: 130, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sLxoUhFQCTSCxy3l8uR6AYOJlmoYeHi1Vw&s", healthTags: ["sugar"], healthBenefit: "vitamins and hydration" },
    { name: "Poha", strategy: "reset", ingredients: ["rice flakes", "peanut", "onion"], minRequired: ["rice flakes"], price: 50, calories: 250, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIUmgrHy2-nq1zkVnMNKRWYZ1rS-_lKpwJ0g&s", healthTags: [], healthBenefit: "light breakfast" },
    { name: "Upma", strategy: "reset", ingredients: ["semolina", "vegetables"], minRequired: ["semolina"], price: 60, calories: 250, image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Best-South-Indian-Rava-Upma-Recipe.jpg", healthTags: [], healthBenefit: "healthy and filling" },
    { name: "Corn Chaat", strategy: "reset", ingredients: ["corn", "spices", "lemon"], minRequired: ["corn"], price: 70, calories: 180, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEU7qmHRtU09SKdASM_o-A1rKH_dfrJ4RJwQ&s", healthTags: [], healthBenefit: "light, zesty fiber boost" },
    { name: "Fruit Juice", strategy: "reset", ingredients: ["fruits", "sugar"], minRequired: ["fruits"], price: 80, calories: 110, image: "https://png.pngtree.com/png-clipart/20240701/original/pngtree-fruit-juice-photos-png-image_15464132.png", healthTags: ["sugar"], healthBenefit: "rapid liquid energy" },
    { name: "Banana Shake", strategy: "reset", ingredients: ["banana", "milk", "sugar"], minRequired: ["banana", "milk"], price: 90, calories: 280, image: "https://yoursmoothieguide.com/wp-content/uploads/2022/01/Banana-Milkshake-5-1.jpg", healthTags: ["dairy", "sugar"], healthBenefit: "potassium and muscle recovery" },

    // --- GROUNDING STABILITY (Confusion, Uncertainty, Surprise, Curiosity, Focused, Thoughtful) ---
    { name: "Dal Chawal + Sabji", strategy: "grounding", ingredients: ["rice", "dal", "vegetables"], minRequired: ["rice", "dal", "vegetables"], price: 150, calories: 420, image: "https://i.pinimg.com/736x/ed/51/e3/ed51e3067926b5180de612f714c3b2d7.jpg", healthTags: [], healthBenefit: "balanced meal" },
    { name: "Vegetable Salad", strategy: "grounding", ingredients: ["vegetables", "lemon"], minRequired: ["vegetables"], price: 100, calories: 100, image: "https://www.tasteofhome.com/wp-content/uploads/2025/12/EXPS_RC25_280692_DR_12_05_05b.jpg", healthTags: [], healthBenefit: "minerals, vitamins, and a fresh digestive cleanse" },
    { name: "Oatmeal", strategy: "grounding", ingredients: ["oats", "milk"], minRequired: ["oats"], price: 90, calories: 158, image: "https://feelgoodfoodie.net/wp-content/uploads/2025/07/Steel-Cut-Oatmeal-09.jpg", healthTags: ["dairy"], healthBenefit: "slow-release, steady grounding energy" },
    { name: "Sprouts Salad", strategy: "grounding", ingredients: ["sprouts", "lemon", "onion"], minRequired: ["sprouts"], price: 80, calories: 120, image: "https://www.secondrecipe.com/wp-content/uploads/2020/09/sprout-salad-2.jpg", healthTags: [], healthBenefit: "high-protein nutrient bomb" },
    { name: "Moong Dal Cheela", strategy: "grounding", ingredients: ["moong dal", "oil", "spices"], minRequired: ["moong dal"], price: 70, calories: 150, image: "https://www.cubesnjuliennes.com/wp-content/uploads/2018/09/Moong-Palak-Cheela-recipe.jpg", healthTags: ["oil"], healthBenefit: "protein-rich, satisfying focus meal" },
    { name: "Veg Sandwich", strategy: "grounding", ingredients: ["bread", "vegetables", "butter"], minRequired: ["bread", "vegetables"], price: 80, calories: 280, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkX_P-dcHOEbLhw8SbrCM1Hwj4IBKHmj0rw&s", healthTags: [], healthBenefit: "simple fuel to retain focus" },
    { name: "Boiled Eggs", strategy: "grounding", ingredients: ["eggs"], minRequired: ["eggs"], price: 40, calories: 155, image: "https://www.allrecipes.com/thmb/sKJTyo6t9cRUaCr6mqvqUdXmt3w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9188544-1a3585fc8f3541c1891081af005ef7ff.jpg", healthTags: [], healthBenefit: "brain-boosting protein dose" },
    { name: "Paneer Tikka", strategy: "grounding", ingredients: ["paneer", "spices", "curd"], minRequired: ["paneer"], price: 220, calories: 350, image: "https://www.allrecipes.com/thmb/sKJTyo6t9cRUaCr6mqvqUdXmt3w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9188544-1a3585fc8f3541c1891081af005ef7ff.jpg", healthTags: ["dairy"], healthBenefit: "satiating calcium and protein core" }
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
    hungry: 'grounding', craving: 'grounding', appetite: 'grounding',
    joy: 'celebration', happy: 'celebration', excitement: 'celebration', love: 'celebration', pride: 'celebration', gratitude: 'celebration', relief: 'celebration', energetic: 'celebration', confident: 'celebration',
    neutral: 'reset', bored: 'reset', indifferent: 'reset', tired: 'reset', sick: 'wellness'
};

const MOOD_HEALTH_MAP = [
    { keywords: ["happy", "celebration", "joy", "excited"], condition: "Happy / Celebration", range: "400–600 kcal", purpose: "Enjoyment and energy" },
    { keywords: ["sad", "low mood", "lonely", "grief"], condition: "Sad / Low Mood", range: "200–350 kcal", purpose: "Mood boosting" },
    { keywords: ["stressed", "anxious", "stress", "anxiety", "fear"], condition: "Stressed / Anxious", range: "100–250 kcal", purpose: "Relaxation" },
    { keywords: ["tired", "low energy", "fatigue"], condition: "Tired / Low Energy", range: "300–450 kcal", purpose: "Energy recovery" },
    { keywords: ["stomach pain", "stomach"], condition: "Stomach Pain", range: "150–300 kcal", purpose: "Light and soothing" },
    { keywords: ["sick", "weak", "fever"], condition: "Sick / Weak", range: "200–350 kcal", purpose: "Easy digestion" },
    { keywords: ["hot weather", "hot", "summer", "heat"], condition: "Hot Weather", range: "100–250 kcal", purpose: "Cooling and hydration" },
    { keywords: ["diet", "fitness", "weight loss"], condition: "Diet / Fitness", range: "150–300 kcal", purpose: "Weight management" },
    { keywords: ["cold weather", "cold", "winter"], condition: "Cold Weather", range: "250–400 kcal", purpose: "Warmth and comfort" },
    { keywords: ["hungry", "normal", "craving", "appetite"], condition: "Hungry / Normal", range: "400–600 kcal", purpose: "Balanced meal" }
];

function getMoodHealthInfo(emotion, userInput) {
    const text = (emotion + " " + userInput).toLowerCase();
    for (const mapping of MOOD_HEALTH_MAP) {
        if (mapping.keywords.some(k => text.includes(k))) {
            return mapping;
        }
    }
    return { condition: "Balanced Mood", range: "200-400 kcal", purpose: "General wellness and nutritional balance" };
}

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

export function getFoodSuggestion(emotion, userInput, ingredientsString = "", budget = null, healthFilters = [], maxCalories = null) {
    const strategyKey = EMOTION_TO_STRATEGY[emotion] || 'reset';
    const label = STRATEGY_LABELS[strategyKey];

    const moodHealthInfo = getMoodHealthInfo(emotion, userInput);

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

    // CALORIE FILTERING
    let calorieWarning = false;
    if (maxCalories !== null) {
        const withinCalories = strategyCandidates.filter(f => f.calories <= maxCalories);
        if (withinCalories.length > 0) {
            strategyCandidates = withinCalories;
        } else {
            const lighterReset = FOOD_DATABASE.filter(f => f.strategy === 'reset' && f.calories <= maxCalories);
            if (lighterReset.length > 0) {
                strategyCandidates = lighterReset;
                calorieWarning = true;
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

    // Step 3: Pseudo-Random Selection (Added random salt so repeated mood searches give different results)
    const randomSalt = Math.random().toString();
    const hash = getHash(userInput + (ingredientsString || "") + randomSalt);
    const index = hash % finalCandidates.length;
    let mainFood = finalCandidates[index];

    // --- MANUAL USER OVERRIDES ---
    const lowerInput = userInput.toLowerCase();
    if (emotion === 'sad' || lowerInput.includes('sad')) {
        const choc = FOOD_DATABASE.find(f => f.name.toLowerCase().includes('chocolate'));
        if (choc && (!budget || choc.price <= budget) && (!healthFilters.length || !choc.healthTags.some(t => healthFilters.includes(t)))) {
            mainFood = choc;
            method = "Specific Override";
        }
    } else if (emotion === 'happy' || emotion === 'joy' || lowerInput.includes('happy') || lowerInput.includes('joy')) {
        const mangoLassi = FOOD_DATABASE.find(f => f.name.toLowerCase().includes('mango lassi'));
        if (mangoLassi && (!budget || mangoLassi.price <= budget) && (!healthFilters.length || !mangoLassi.healthTags.some(t => healthFilters.includes(t)))) {
            mainFood = mangoLassi;
            method = "Specific Override";
        }
    }

    // Get related from the SAME pool
    let relatedCandidates = finalCandidates.filter(f => f.name !== mainFood.name);

    // Ensure at least one sweet for celebration
    if (strategyKey === 'celebration') {
        let sweetOption;
        const isHappy = emotion === 'happy' || emotion === 'joy' || lowerInput.includes('happy') || lowerInput.includes('joy');

        // Priority for Happy: Jalebi or Gulab Jamun
        if (isHappy) {
            const hasPrioritySweet = relatedCandidates.some(f => f.name.toLowerCase().includes('jalebi') || f.name.toLowerCase().includes('gulab jamun'));
            if (!hasPrioritySweet) {
                sweetOption = FOOD_DATABASE.find(f => f.strategy === 'celebration' && (f.name.toLowerCase().includes('jalebi') || f.name.toLowerCase().includes('gulab jamun')) && f.name !== mainFood.name && (!budget || f.price <= budget));
            }
        }

        // Generic fallback sweet
        if (!sweetOption) {
            const hasSweet = relatedCandidates.some(f => f.healthTags.includes('sugar'));
            if (!hasSweet) {
                sweetOption = FOOD_DATABASE.find(f => f.strategy === 'celebration' && f.healthTags.includes('sugar') && f.name !== mainFood.name && (!budget || f.price <= budget));
            }
        }

        if (sweetOption) {
            // Prevent duplicates
            if (!relatedCandidates.some(c => c.name === sweetOption.name)) {
                relatedCandidates.unshift(sweetOption); // Add to front
            }
        }
    }

    const related = relatedCandidates.slice(0, 3).map(f => ({
        food: f.name,
        image: f.image,
        price: f.price,
        calories: f.calories,
        healthTags: f.healthTags
    }));

    return {
        strategyLabel: label,
        suggestedFood: mainFood.name,
        price: mainFood.price,
        calories: mainFood.calories,
        imageUrl: mainFood.image,
        otherSuggestions: related,
        sourceMethod: method,
        budgetMet: budget === null || mainFood.price <= budget,
        isFallback: budgetWarning || calorieWarning,
        healthAdvice: healthAdvice,
        moodCondition: moodHealthInfo.condition,
        suggestedCalorieRange: moodHealthInfo.range,
        healthPurpose: moodHealthInfo.purpose,
        baseBenefit: mainFood.healthBenefit
    };
}
