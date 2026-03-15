import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroFoodCard({ suggestedFood, feedbackHandler, source, confidence, imageUrl, price, vector }) {
    const [imgSrc, setImgSrc] = useState(imageUrl || null);
    const [loading, setLoading] = useState(!imageUrl);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (imageUrl) {
            setImgSrc(imageUrl);
            setLoading(false);
            return;
        }

        if (!suggestedFood) return;
        setLoading(true);
        fetch(`/api/generateFoodImage?foodName=${encodeURIComponent(suggestedFood)}`)
            .then(res => res.json())
            .then(data => {
                setImgSrc(data.imageUrl);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [suggestedFood, imageUrl]);

    const onFeedback = (type) => {
        setFeedback(type);
        if (feedbackHandler) feedbackHandler(type);
    };

    const isBasicItem = suggestedFood?.toLowerCase().includes('water') ||
        suggestedFood?.toLowerCase().includes('rice') ||
        suggestedFood?.toLowerCase().includes('roti') ||
        suggestedFood?.toLowerCase().includes('curd') ||
        suggestedFood?.toLowerCase().includes('coconut') ||
        source?.toLowerCase() === 'neutral';

    return (
        <motion.div
            className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
        >
            {/* Image Layer */}
            <div className="absolute inset-0 w-full h-full">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin" />
                    </div>
                ) : (
                    <img
                        src={imgSrc || "/api/placeholder/400/600"}
                        alt={suggestedFood}
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Modern Confidence Badge */}
                {confidence && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-4 right-4 flex items-center space-x-2 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-lg"
                    >
                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${confidence >= 85 ? 'bg-emerald-400' : confidence >= 70 ? 'bg-blue-400' : 'bg-amber-400'}`} />
                        <span className="text-xs font-semibold text-white tracking-wide">
                            {confidence}% Match
                        </span>
                    </motion.div>
                )}

                {/* EVM Brain Metrics - Clinical Style (Hidden for basic items) */}
                {vector && !isBasicItem && (
                    <div className="absolute top-20 right-[10px] flex flex-col space-y-1.5 items-end pointer-events-none">
                        <div className="mb-1">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">EVM Brain</span>
                        </div>
                        <motion.div
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center space-x-2 bg-white/5 backdrop-blur-md px-2 py-1 rounded border border-white/10"
                        >
                            <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Arousal</span>
                            <span className="text-[10px] font-mono font-bold text-white">{(vector.arousal || 0).toFixed(1)}</span>
                        </motion.div>

                        <motion.div
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center space-x-2 bg-white/5 backdrop-blur-md px-2 py-1 rounded border border-white/10"
                        >
                            <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Valence</span>
                            <span className="text-[10px] font-mono font-bold text-white">{(vector.valence || 0).toFixed(1)}</span>
                        </motion.div>

                        <motion.div
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center space-x-2 bg-white/5 backdrop-blur-md px-2 py-1 rounded border border-white/10"
                        >
                            <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Control</span>
                            <span className="text-[10px] font-mono font-bold text-white">{(vector.control || 0).toFixed(1)}</span>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Content Layer */}
            <div className="absolute bottom-0 w-full p-6 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                    {suggestedFood} {price && <span className="text-xl text-amber-300 ml-2">|| ₹{price}</span>}
                </h2>
                <div className="flex items-center gap-3 mb-6">
                    {!isBasicItem && <p className="text-xs text-gray-300 uppercase tracking-widest">{source || "AI Chef"}</p>}
                </div>

                {/* Glassmorphic Feedback Bar */}
                {!isBasicItem && (
                    <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                        <button
                            onClick={() => onFeedback('good')}
                            className={`text-2xl transition hover:scale-125 ${feedback === 'good' ? 'text-green-400' : 'text-white/60 hover:text-white'}`}
                        >
                            👍
                        </button>
                        <div className="w-px h-6 bg-white/20" />
                        <button
                            onClick={() => onFeedback('bad')}
                            className={`text-2xl transition hover:scale-125 ${feedback === 'bad' ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
                        >
                            👎
                        </button>
                    </div>
                )}

                {feedback && !isBasicItem && <p className="text-[10px] text-green-300 mt-2">Thanks for your feedback!</p>}
            </div>
        </motion.div>
    );
}
