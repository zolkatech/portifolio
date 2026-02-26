import { Instagram, MessageCircle } from 'lucide-react'

const floatingIcons = [
    {
        label: 'OpenAI', img: null, svg: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z" />
            </svg>
        ), pos: '-top-4 left-4', delay: '0s'
    },
    { label: 'n8n', img: '/n8n-logo.png', svg: null, pos: 'top-12 -right-8', delay: '1s' },
    {
        label: 'API', img: null, svg: (
            <span className="text-[10px] font-black tracking-tight text-[#FACC15]">API</span>
        ), pos: 'bottom-24 -left-8', delay: '2s'
    },
    {
        label: 'Supabase', img: null, svg: (
            <svg viewBox="0 0 24 24" className="w-6 h-6">
                <defs>
                    <linearGradient id="supa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3ECF8E" />
                        <stop offset="100%" stopColor="#24B47E" />
                    </linearGradient>
                </defs>
                <path fill="url(#supa-grad)" d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424A.396.396 0 0 0 2.52 13.04h9.36v8.958a.396.396 0 0 0 .716.233l9.081-12.26a.396.396 0 0 0-.315-.617Z" />
            </svg>
        ), pos: 'bottom-8 -right-4', delay: '3s'
    },
    { label: 'Lovable', img: '/tools/lovable.png', svg: null, pos: '-bottom-4 left-10', delay: '1.5s' },
]

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Text */}
                    <div>
                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm text-white/60 font-medium">
                                Portifólio de projetos | Automação & IA
                            </span>
                        </div>

                        {/* Greeting */}
                        <p className="text-lg text-white/50 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>

                        </p>

                        {/* Name */}
                        <h1 className="font-tech text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '200ms' }}>
                            <span className="text-[#FACC15]">Gustavo Mendonça</span>
                        </h1>

                        {/* Role */}
                        <h2 className="text-2xl md:text-3xl font-semibold text-white/80 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '300ms' }}>
                            Arquiteto de soluções com <span className="text-white font-bold">IA</span>
                        </h2>

                        {/* Bio */}
                        <p className="text-base md:text-lg text-white/40 max-w-lg mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '400ms' }}>
                            Desenvolvo soluções com <span className="text-white/60">Inteligência Artificial</span>,
                            {' '} com as <span className="text-white/60">principais tecnologias</span> do mercado{' '}
                            para empresas que querem <span className="text-white/60">escalar seus resultados.</span>
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: '600ms' }}>
                            <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Redes sociais</span>
                            <div className="w-8 h-px bg-white/10" />
                            {[
                                { icon: Instagram, href: 'https://www.instagram.com/gusstavo.ai/', label: 'Instagram' },
                                { icon: MessageCircle, href: 'https://api.whatsapp.com/send?phone=554588404239', label: 'WhatsApp' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-[#FACC15]/10 hover:border-[#FACC15]/20 transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4 text-white/50 hover:text-[#FACC15]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — Photo with floating icons */}
                    <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-[45%] animate-in fade-in slide-in-from-right-8 duration-1000" style={{ animationDelay: '400ms' }}>
                        <div className="relative h-full flex items-end justify-center">
                            {/* Photo — fills the hero height, aligned to bottom */}
                            <img
                                src="/gustavo.png"
                                alt="Gustavo Mendonça"
                                className="h-[135%] w-auto max-w-none object-contain object-bottom"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 60%, transparent 100%)',
                                }}
                            />

                            {/* Floating Icons */}
                            {floatingIcons.map((item) => (
                                <div
                                    key={item.label}
                                    className={`absolute ${item.pos} w-12 h-12 rounded-xl glass-strong flex items-center justify-center shadow-lg shadow-black/30 overflow-hidden z-20`}
                                    style={{
                                        animation: `float 4s ease-in-out infinite`,
                                        animationDelay: item.delay,
                                    }}
                                    title={item.label}
                                >
                                    {item.img ? (
                                        <img src={item.img} alt={item.label} className="w-7 h-7 object-contain" />
                                    ) : (
                                        item.svg
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </section>
    )
}
