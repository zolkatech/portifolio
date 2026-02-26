import { useState, useEffect } from 'react'

const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre mim', href: '#sobre' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Habilidades', href: '#habilidades' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
            <div
                className={`pointer-events-auto transition-all duration-500 flex items-center px-6 py-3 rounded-full border border-white/10 ${isScrolled
                    ? 'glass-strong bg-black/40 shadow-lg shadow-black/40'
                    : 'glass bg-black/20'
                    }`}
            >
                <div className="flex items-center gap-8 md:gap-14">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs md:text-sm text-white/60 hover:text-[#FACC15] transition-colors duration-300 font-medium uppercase tracking-widest"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
