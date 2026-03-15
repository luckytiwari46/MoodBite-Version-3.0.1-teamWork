import { motion } from 'framer-motion';

// A simple SVG Radar Chart for 4 Dimensions
// Axes: Top (Arousal), Right (Valence), Bottom (Control), Left (Certainty)

export default function MoodRadar({ vector }) {
    // Default safe vector
    const v = vector || { valence: 0.1, arousal: 0.1, control: 0.5, certainty: 0.5 };

    // Scale values to 0..100 for SVG radius
    const center = 100;
    const maxR = 80;

    // Axis 1 (Top): Arousal (Energy)
    const r1 = Math.min(Math.max((v.arousal || 0) * maxR, 20), maxR);

    // Axis 2 (Right): Valence (Pleasure) -> Scaled -1..1 to 0..1
    const normValence = ((v.valence || 0) + 1) / 2;
    const r2 = Math.min(Math.max(normValence * maxR, 20), maxR);

    // Axis 3 (Bottom): Control (Stability)
    const r3 = Math.min(Math.max((v.control || 0.5) * maxR, 20), maxR);

    // Axis 4 (Left): Certainty (Clarity)
    const r4 = Math.min(Math.max((v.certainty || 0.5) * maxR, 20), maxR);

    // Points calculation (Center is 100,100)
    const p1 = `${center},${center - r1}`; // Top
    const p2 = `${center + r2},${center}`; // Right
    const p3 = `${center},${center + r3}`; // Bottom
    const p4 = `${center - r4},${center}`; // Left

    const points = `${p1} ${p2} ${p3} ${p4}`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h3 className="text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">EVM Brain</h3>
            <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80">
                {/* Background Grid */}
                <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" />

                {/* Axes */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.1)" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.1)" />

                {/* Labels */}
                <text x="100" y="15" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">AROUSAL</text>
                <text x="190" y="105" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">VALENCE</text>
                <text x="100" y="195" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">CONTROL</text>
                <text x="10" y="105" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">CERTAINTY</text>

                {/* The Shape */}
                <motion.polygon
                    points={points}
                    fill="rgba(99, 102, 241, 0.5)" // Indigo 500
                    stroke="rgba(129, 140, 248, 1)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ points: points, scale: 1 }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
            </svg>
        </div>
    );
}
