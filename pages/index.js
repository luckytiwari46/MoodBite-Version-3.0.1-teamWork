import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MoodBackground from '../components/MoodBackground';
import MoodRadar from '../components/MoodRadar';
import HeroFoodCard from '../components/HeroFoodCard';
import ChefsNote from '../components/ChefsNote';
import ModernInputBar from '../components/ModernInputBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { analyzeTrajectory } from '../evm/trajectory';
import { explainVector } from '../evm/fusion';

// Mock vector for initial state or fallback
const defaultVector = { valence: 0, arousal: 0, control: 0.5, certainty: 0.5 };

export default function HomePage() {
    // Dashboard States
    const [viewState, setViewState] = useState('idle'); // 'idle' | 'analyzing' | 'result'
    const [resultData, setResultData] = useState(null);
    const [vector, setVector] = useState(defaultVector);
    const [input, setInput] = useState('');
    const [ingredients, setIngredients] = useState(''); // Fridge Mode
    const [predictedMood, setPredictedMood] = useState('neutral');
    const [isListening, setIsListening] = useState(false); // Voice State
    const [isAnalyzingImage, setIsAnalyzingImage] = useState(false); // Image State
    const [errorMsg, setErrorMsg] = useState(null); // Error State

    // Helper: Show Error & Auto-clear
    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(null), 3000); // Clear after 3s
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsAnalyzingImage(true);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result;

                // 1. Detect Emotion from Image
                const res = await fetch('/api/detectEmotionFromImage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64data })
                });
                const data = await res.json();

                if (data.mood) {
                    // 2. Trigger Search with Mood Override
                    const detectedMood = data.mood;
                    setInput(`(Image Analysis: ${detectedMood})`); // Visual feedback

                    // Call suggestFood with moodOverride
                    setViewState('analyzing');
                    const foodRes = await fetch('/api/suggestFood', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            text: `I feel ${detectedMood}`, // Fallback text
                            ingredients,
                            moodOverride: detectedMood
                        })
                    });
                    const foodData = await foodRes.json();

                    // Set Results
                    setResultData(foodData);
                    setPredictedMood(foodData.predictedMood);

                    // Vector Logic (reuse from handleSearch or Refactor)
                    // For now, simple vector mapping since we have mood
                    let newVector = defaultVector;
                    if (data.confidence > 80) {
                        // High confidence image = Strong vector
                        // ... logic ...
                    }
                    if (foodData.vector) setVector(foodData.vector);

                    setViewState('result');
                } else {
                    alert("Could not detect emotion from image.");
                }
                setIsAnalyzingImage(false);
            };
            reader.readAsDataURL(file);
        } catch (e) {
            console.error(e);
            setIsAnalyzingImage(false);
            alert("Error uploading image");
        }
    };

    // Level 4: Session History & Trajectory
    const [moodHistory, setMoodHistory] = useState([]);
    const [trajectory, setTrajectory] = useState(null);
    const [explanation, setExplanation] = useState(null);

    // API Handler
    const handleSearch = async (text) => {
        if (!text.trim()) return;
        setViewState('analyzing');
        setErrorMsg(null); // Clear previous

        try {
            const res = await fetch('/api/suggestFood', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, ingredients })
            });
            const data = await res.json();

            // CHECK FOR VALIDATION ERROR (Gibberish or Server Error)
            if (data.error || !data.suggestedFood) {
                setViewState('idle');
                const friendlyError = data.error === "Gibberish detected" || data.error === "Input too short"
                    ? "Input is wrong. Please provide a correct mood (e.g., happy, sad, angry, relaxed)."
                    : "Something went wrong. Please try again.";
                showError(friendlyError);
                return;
            }

            // Valid Response: Store Result
            setResultData(data);
            const newMood = data.predictedMood || 'neutral';
            setPredictedMood(newMood);

            // Simulation for Radar if vector missing (Refining based on weights.js logic)
            let newVector = defaultVector;
            if (newMood === 'stress') newVector = { valence: -0.6, arousal: 0.4, control: 0.2, certainty: 0.3 };
            else if (newMood === 'anger') newVector = { valence: -0.8, arousal: 0.8, control: 0.6, certainty: 0.8 };
            else if (newMood === 'joy') newVector = { valence: 0.8, arousal: 0.6, control: 0.7, certainty: 0.8 };
            else if (newMood === 'calm') newVector = { valence: 0.5, arousal: -0.4, control: 0.8, certainty: 0.8 };
            setVector(newVector);

            // LEVEL 4 & 6: Compute Advanced Insights
            const newHistory = [...moodHistory, newMood];
            setMoodHistory(newHistory);

            setTrajectory(analyzeTrajectory(newHistory));
            setExplanation(explainVector(newVector));

            setViewState('result');
        } catch (e) {
            console.error(e);
            setViewState('idle'); // Reset on error
            showError("Network Error. Please try again.");
        }
    };

    const handleFeedback = (rating) => {
        if (!resultData) return;
        fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                feedback: rating,
                suggestedFood: resultData.suggestedFood,
                predictedMood: resultData.predictedMood,
                timestamp: new Date().toISOString()
            })
        });
    };

    // Voice Handler
    const handleVoiceClick = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Voice not supported in this browser.");
            return;
        }

        if (isListening) return; // Already listening

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (e) => { console.error(e); setIsListening(false); };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev ? `${prev} ${transcript}` : transcript);
        };

        recognition.start();
    };

    return (
        <div className="relative min-h-screen w-full overflow-y-auto font-sans text-white">
            <MoodBackground mood={predictedMood} />
            <Navbar />

            {/* ERROR POPUP */}
            <AnimatePresence>
                {errorMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl border border-red-400/50 flex items-center space-x-3"
                    >
                        <span className="text-xl">⚠️</span>
                        <span className="text-sm font-medium">{errorMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className={`relative z-10 w-full min-h-screen flex flex-col items-center p-8 transition-all duration-500 ${viewState === 'result' ? 'justify-start pt-32 md:justify-center md:pt-4' : 'justify-center'}`}>
                <AnimatePresence mode="wait">

                    {/* IDLE STATE: Centered Input */}
                    {viewState === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -50 }}
                            className="w-full max-w-xl text-center space-y-8"
                        >
                            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight">
                                How are you <span className="font-serif italic text-white/80">feeling</span>?
                            </h2>
                            <ModernInputBar
                                textInput={input}
                                setTextInput={setInput}
                                ingredientsInput={ingredients}
                                setIngredientsInput={setIngredients}
                                handleChatSubmit={(e) => { e?.preventDefault(); handleSearch(input); }}
                                handleVoiceClick={handleVoiceClick}
                                handleImageUpload={handleImageUpload} // NEW
                                assistantState={isListening ? 'listening' : isAnalyzingImage ? 'analyzing' : 'idle'} // UPDATED
                                isLoading={viewState === 'analyzing'}
                            />
                            <input
                                type="file"
                                id="imageUploadHidden"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                        </motion.div>
                    )}

                    {/* ANALYZING STATE: Simple Loader */}
                    {viewState === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex flex-col items-center"
                            onClick={() => setViewState('result')} // DEV BYPASS if needed
                        >
                            <div className="w-16 h-16 border-t-2 border-r-2 border-white rounded-full animate-spin mb-4" />
                            <p className="text-sm tracking-widest uppercase opacity-70">Analyzing Emotional Vectors...</p>
                        </motion.div>
                    )}

                    {/* RESULT STATE: The Dashboard */}
                    {viewState === 'result' && resultData && (
                        <motion.div
                            key="result"
                            className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 items-center pb-20 md:pb-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* LEFT: Radar (Last on Mobile, First on Desktop) */}
                            <div className="order-3 md:order-1 md:col-span-3 w-full h-48 md:h-64 flex justify-center md:justify-start opacity-80 md:opacity-100">
                                <MoodRadar vector={vector} />
                            </div>

                            {/* CENTER: Hero (First on Mobile, Second on Desktop) */}
                            <div className="order-1 md:order-2 md:col-span-5 w-full flex justify-center z-10">
                                <HeroFoodCard
                                    suggestedFood={resultData.suggestedFood}
                                    feedbackHandler={handleFeedback}
                                    source={resultData.predictedMood}
                                    confidence={resultData.confidenceScore}
                                    imageUrl={resultData.imageUrl} // NEW
                                    price={resultData.price} // NEW
                                    vector={resultData.vector} // NEW
                                />
                            </div>

                            {/* RIGHT: Note (Second on Mobile, Third on Desktop) */}
                            <div className="order-2 md:order-3 md:col-span-4 w-full h-full flex items-center z-0">
                                <ChefsNote
                                    reason={resultData.reason}
                                    otherSuggestions={resultData.otherSuggestions}
                                    trajectory={trajectory}
                                    explanation={explanation}
                                    userInput={input} // NEW
                                    healthAdvice={resultData.healthAdvice} // NEW: Doctor Mode
                                />
                            </div>

                            {/* Floating Input for Follow-up (Bottom) */}
                            <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center z-20">
                                <motion.button
                                    onClick={() => { setViewState('idle'); setInput(''); }}
                                    className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm text-white hover:bg-white/20 transition-all border border-white/10 shadow-lg"
                                >
                                    ← Start New Analysis
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                {viewState === 'idle' && <div className="absolute bottom-4 w-full"><Footer /></div>}
            </main>
        </div>
    );
}
