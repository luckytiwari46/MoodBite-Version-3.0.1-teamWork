// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();

    const isActive = (path) => router.pathname === path ? "text-white opacity-100 font-medium" : "text-white/60 hover:text-white transition-colors cursor-pointer";

    const logoUrl = "https://media.licdn.com/dms/image/v2/D4D0BAQFbPzrKNUtwrQ/company-logo_200_200/B4DZb8UJvqG0AM-/0/1747989863756?e=2147483647&v=beta&t=-9uS2xtqeLNuM6SzG2CeDjuKpW9pvppUhAC_eUHXMjw";

    return (
        <nav className="absolute top-[30px] left-[20px] right-0 flex justify-between items-center z-50 pointer-events-none">
            {/* Logo */}
            <div className="flex items-center space-x-4 pointer-events-auto">
                <Link href="/" className="flex items-center space-x-3 cursor-pointer group">
                    <img
                        src={logoUrl}
                        alt="MoodBite Logo"
                        className="w-10 h-10 rounded-xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-tighter text-white">
                            MoodBite.Ai
                        </h1>
                        <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest leading-none">v3.0</span>
                    </div>
                </Link>
            </div>

            {/* Links */}
            <div className="mr-8 pointer-events-auto flex items-center space-x-8 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full shadow-2xl">
                <Link href="/" className={isActive('/')}>
                    Home
                </Link>
                <Link href="/about" className={isActive('/about')}>
                    About
                </Link>
            </div>
        </nav>
    );
}

