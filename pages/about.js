// pages/about.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-16"
                >
                    {/* Header */}
                    <header className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <h1 className="text-4xl font-bold tracking-tight">Understanding MoodBite.Ai</h1>
                        </div>
                        <p className="text-xl text-slate-400 font-light leading-relaxed">
                            MoodBite is an <span className="text-white font-medium">Offline-First Expert System</span> designed to regulate emotions through culinary intervention. Unlike generic AI wrappers, it uses a deterministic Emotional Vector Machine (EVM) to map linguistic signals to 28 specific emotional states, providing scientifically grounded food recommendations.
                        </p>
                    </header>

                    {/* Disclaimer */}
                    <section className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl flex items-start gap-6">
                        <span className="text-4xl">⚠️</span>
                        <div>
                            <h2 className="text-xl font-bold text-amber-200 mb-2">Disclaimer</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                No Mood Detection is Perfect. This system analyzes linguistic patterns and keyword intensity. It is not a clinical diagnostic tool and should not replace professional medical advice.
                            </p>
                        </div>
                    </section>

                    {/* Architecture */}
                    <section className="space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span>🛠️</span> System Architecture
                        </h2>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl overflow-hidden relative">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-center md:text-left">
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest text-slate-500">User Input</h4>
                                    <p className="font-serif italic text-lg opacity-80">"I am furious"</p>
                                </div>
                                <div className="text-2xl rotate-90 md:rotate-0 text-slate-700">→</div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest text-slate-500">Expert Panel</h4>
                                    <ul className="text-sm space-y-1 text-slate-300">
                                        <li>• Direct Matcher</li>
                                        <li>• Conflict Physics</li>
                                        <li>• Lexicon Scorer</li>
                                        <li>• Context Analyst</li>
                                    </ul>
                                </div>
                                <div className="text-2xl rotate-90 md:rotate-0 text-slate-700">→</div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest text-slate-500">The Judge</h4>
                                    <p className="font-bold text-indigo-400">EVM Vector Engine</p>
                                    <p className="text-xs font-mono text-slate-500 uppercase">ANGER</p>
                                </div>
                                <div className="text-2xl rotate-90 md:rotate-0 text-slate-700">→</div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-widest text-slate-500">Food Engine</h4>
                                    <p className="font-bold text-emerald-400">"Spicy Release"</p>
                                    <p className="text-sm">Spicy Chaat</p>
                                </div>
                            </div>
                            {/* Decorative background glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[100px]" />
                        </div>
                    </section>

                    {/* Test Cases */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <span>🧪</span> Verified Test Cases
                        </h2>
                        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 text-slate-500">
                                    <tr>
                                        <th className="py-4 px-6 font-medium uppercase tracking-wider">Input</th>
                                        <th className="py-4 px-6 font-medium uppercase tracking-wider">Detected Mood</th>
                                        <th className="py-4 px-6 font-medium uppercase tracking-wider">Strategy</th>
                                        <th className="py-4 px-6 font-medium uppercase tracking-wider">Suggestion</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300 divide-y divide-white/5">
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 italic">"I am absolutely furious!"</td>
                                        <td className="py-4 px-6"><span className="text-red-400 font-medium">Anger</span></td>
                                        <td className="py-4 px-6">Spicy Release</td>
                                        <td className="py-4 px-6">Spicy Chaat</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 italic">"I have a huge exam tomorrow."</td>
                                        <td className="py-4 px-6"><span className="text-indigo-400 font-medium">Stress (High)</span></td>
                                        <td className="py-4 px-6">Calming Warmth</td>
                                        <td className="py-4 px-6">Masala Chai</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 italic">"I just won the competition!"</td>
                                        <td className="py-4 px-6"><span className="text-orange-400 font-medium">Pride/Joy</span></td>
                                        <td className="py-4 px-6">Celebration</td>
                                        <td className="py-4 px-6">Vegetable Biryani</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 italic">"I miss my grandmother."</td>
                                        <td className="py-4 px-6"><span className="text-blue-400 font-medium">Grief</span></td>
                                        <td className="py-4 px-6">Comfort</td>
                                        <td className="py-4 px-6">Gajar Ka Halwa</td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 italic">"I'm completely lost in life."</td>
                                        <td className="py-4 px-6"><span className="text-slate-400 font-medium">Confusion</span></td>
                                        <td className="py-4 px-6">Grounding</td>
                                        <td className="py-4 px-6">Oats Porridge</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="pt-12 border-t border-white/10 text-center space-y-4">
                        <div className="flex items-center justify-center space-x-4 text-slate-500 text-sm">
                            <span>© 2026 MoodBite.Ai Project</span>
                            <span className="opacity-30">•</span>
                            <a href="https://github.com/singhcod3r" className="hover:text-white transition-colors">github.com/singhcod3r</a>
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter opacity-20">MoodBite.Ai</h2>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

