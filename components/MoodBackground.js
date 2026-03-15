import { motion } from 'framer-motion';

const gradients = {
    anger: "bg-gradient-to-br from-red-950 via-rose-900 to-black",
    stress: "bg-gradient-to-br from-indigo-950 via-slate-900 to-black",
    joy: "bg-gradient-to-br from-orange-600/40 via-amber-900/40 to-black",
    happy: "bg-gradient-to-br from-yellow-700/30 via-orange-900/40 to-black",
    sadness: "bg-gradient-to-br from-blue-950 via-cyan-950 to-black",
    sad: "bg-gradient-to-br from-blue-950 via-cyan-950 to-black",
    sick: "bg-gradient-to-br from-emerald-950 via-teal-950 to-black",
    tired: "bg-gradient-to-br from-slate-900 via-zinc-900 to-black",
    relaxed: "bg-gradient-to-br from-indigo-900 via-blue-950 to-black",
    fear: "bg-gradient-to-br from-violet-950 via-purple-950 to-black",
    neutral: "bg-gradient-to-br from-slate-950 via-black to-black",
    mixed: "bg-gradient-to-br from-fuchsia-950 via-pink-950 to-black"
};

export default function MoodBackground({ mood }) {
    const activeGradient = gradients[mood] || gradients['neutral'];

    return (
        <motion.div
            key={mood}
            className={`fixed inset-0 w-full h-full -z-50 ${activeGradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Ambient Animated Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -40, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"
            />

            {/* Grain Overlay for Premium Feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </motion.div>
    );
}

