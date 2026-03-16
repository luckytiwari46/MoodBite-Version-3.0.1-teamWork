import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ChefsNote({ reason, otherSuggestions, trajectory, explanation, userInput, healthAdvice, moodCondition, suggestedCalorieRange, healthPurpose }) {
    const [showOrderPopup, setShowOrderPopup] = useState(false);

    // Delivery Helpers
    const DELIVERY_APPS = [
        { name: "Swiggy", url: "https://www.swiggy.com", icon: "🍱" },
        { name: "Zomato", url: "https://www.zomato.com", icon: "🍅" },
        { name: "Blinkit", url: "https://blinkit.com", icon: "⚡" },
        { name: "Zepto", url: "https://www.zeptonow.com", icon: "🟣" },
        { name: "Uber Eats", url: "https://www.ubereats.com", icon: "🚗" },
        { name: "EatClub", url: "https://eatclub.com", icon: "🍽️" }
    ];

    // Helper for trend icon
    const getTrendIcon = (t) => {
        if (t === 'Escalating') return '📈';
        if (t === 'De-escalating') return '📉';
        return '➡️';
    };

    return (
        <motion.div
            className="h-full flex flex-col justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-6">

                {/* Section 0: User Input (New) */}
                {userInput && (
                    <div className="border-b border-white/10 pb-4 flex justify-between items-start">
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Input</h4>
                            <p className="text-lg font-light text-white italic truncate max-w-[200px]">"{userInput}"</p>
                        </div>
                        <button
                            onClick={() => setShowOrderPopup(true)}
                            className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 px-3 py-1.5 rounded-full transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>🛍️</span> Order Now
                        </button>
                    </div>
                )}

                {/* Section 1: The Why */}
                <div>
                    <h3 className="text-lg font-serif italic text-white/90 mb-2 border-b border-white/10 pb-2">&quot;The Chef&apos;s Logic&quot;</h3>

                    {/* HEALTH ADVICE (Doctor Mode) */}
                    {healthAdvice && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-500/20 text-amber-200 border border-amber-500/30 px-3 py-2 rounded-lg text-xs font-bold mb-4 flex items-center gap-2"
                        >
                            <span>{healthAdvice}</span>
                        </motion.div>
                    )}

                    <p className="text-sm leading-relaxed text-gray-300 font-light">
                        {reason}
                    </p>
                </div>

                {/* Section 2: Health Benefit Insight */}
                <div className="bg-black/20 rounded-lg p-4 border-l-4 border-indigo-500/50 space-y-3">
                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center">
                        🌿 Health & Mood Benefit
                    </h4>
                    
                    <div className="bg-white/5 rounded p-3 text-sm text-gray-300">
                        <div className="font-bold text-white mb-2 pb-2 border-b border-white/10">Mood – Calories – Food Recommendation</div>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-gray-400 font-medium">Mood / Condition:</div>
                            <div className="col-span-2 text-white">{moodCondition || "Balanced Mood"}</div>
                            
                            <div className="text-gray-400 font-medium">Suggested Calories:</div>
                            <div className="col-span-2 text-white">{suggestedCalorieRange || "200-400 kcal"}</div>
                            
                            <div className="text-gray-400 font-medium">Health Purpose:</div>
                            <div className="col-span-2 text-emerald-300">{healthPurpose || "General wellness"}</div>
                        </div>
                    </div>
                </div>

                {otherSuggestions && otherSuggestions.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Alternatives</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {otherSuggestions.map((item, i) => (
                                <div key={i} className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                                    <img
                                        src={item.image || "/api/placeholder/100/100"}
                                        alt={item.food || item}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Price Badge */}
                                    {item.price && (
                                        <div className="absolute top-1 right-1 bg-emerald-600/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg backdrop-blur-sm z-20 border-b border-l border-white/20">
                                            ₹{item.price}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-1">
                                        <span className="text-[10px] font-medium text-white leading-tight drop-shadow-md truncate">
                                            {item.food || item.name || item}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ORDER POPUP OVERLAY */}
            {showOrderPopup && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl"
                        onClick={() => setShowOrderPopup(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative bg-gray-900 border border-white/20 p-6 rounded-2xl shadow-2xl w-full max-w-xs"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-white font-bold text-lg">Order via</h3>
                            <button onClick={() => setShowOrderPopup(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {DELIVERY_APPS.map((app) => (
                                <a
                                    key={app.name}
                                    href={app.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                                >
                                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{app.icon}</span>
                                    <span className="text-xs text-gray-300 font-medium">{app.name}</span>
                                </a>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-500 text-center mt-4">Opens in new tab</p>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
