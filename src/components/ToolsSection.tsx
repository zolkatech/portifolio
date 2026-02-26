import { Server, MessageCircle } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'

const tools = [
    {
        name: 'Antigravity',
        icon: <img src="/tools/antigravity.png" alt="Antigravity" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=AG'} />
    },
    {
        name: 'OpenAI',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.612-1.5z" />
            </svg>
        )
    },
    {
        name: 'Claude',
        icon: <img src="/tools/claude.png" alt="Claude" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=CL'} />
    },
    {
        name: 'Gemini',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path fill="#4285F4" d="M23.6 11.516c-3.13-.59-5.918-2.228-7.989-4.708-2.071-2.48-3.187-5.586-3.21-8.808h-1.076c-.024 3.222-1.14 6.328-3.21 8.808-2.072 2.48-4.86 4.118-7.99 4.708v1.076c3.13.59 5.918 2.228 7.989 4.708 2.071 2.48 3.187 5.586 3.21 8.808h1.076c.024-3.222 1.14-6.328 3.21-8.808 2.072-2.48 4.86-4.118 7.99-4.708v-1.076z" />
            </svg>
        )
    },
    {
        name: 'Perplexity',
        icon: <img src="/tools/perplexity.png" alt="Perplexity" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=PP'} />
    },
    {
        name: 'OpenRouter',
        icon: <img src="/tools/openrouter.png" alt="OpenRouter" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=OR'} />
    },
    {
        name: 'Supabase',
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8">
                <defs>
                    <linearGradient id="supa-grad-tools" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3ECF8E" />
                        <stop offset="100%" stopColor="#24B47E" />
                    </linearGradient>
                </defs>
                <path fill="url(#supa-grad-tools)" d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424A.396.396 0 0 0 2.52 13.04h9.36v8.958a.396.396 0 0 0 .716.233l9.081-12.26a.396.396 0 0 0-.315-.617Z" />
            </svg>
        )
    },
    {
        name: 'n8n',
        isPrimary: true,
        icon: <img src="/n8n-logo.png" alt="n8n" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=N8N'} />
    },
    {
        name: 'ElevenLabs',
        icon: <img src="/tools/elevenlabs.png" alt="ElevenLabs" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=EL'} />
    },
    {
        name: 'APIs Whatsapp',
        icon: <MessageCircle className="w-8 h-8 text-green-500" />
    },
    {
        name: 'VPS',
        icon: <Server className="w-8 h-8 text-blue-400" />
    },
    {
        name: 'Lovable',
        isPrimary: true,
        icon: <img src="/tools/lovable.png" alt="Lovable" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=LV'} />
    },
    {
        name: 'VEO3',
        icon: <img src="/tools/veo3.png" alt="VEO3" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=V3'} />
    },
    {
        name: 'Google AI Studio',
        icon: <img src="/tools/googleaistudio.png" alt="Google AI Studio" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100/111/444?text=GAIS'} />
    },
]

export function ToolsSection() {
    return (
        <section id="tools" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
            <div className="mx-auto max-w-6xl px-6 w-full relative z-10">
                <div className="text-center mb-16">
                    <span className="text-sm text-[#FACC15] font-semibold uppercase tracking-widest">
                        Stack
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                        Ferramentas <span className="text-[#FACC15]">mais usadas</span>
                    </h2>
                    <p className="text-white/40 mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-center">
                        Principais ferramentas que utilizo em meus projetos
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {tools.map((tool) => (
                        <GlowCard
                            key={tool.name}
                            glowColor="yellow"
                            className="group p-6 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:border-[#FACC15]/30 relative"
                        >
                            {tool.isPrimary && (
                                <div className="absolute top-2 right-2 flex items-center">
                                    <span className="bg-[#FACC15]/20 text-[#FACC15] text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-full border border-[#FACC15]/30">
                                        Principal
                                    </span>
                                </div>
                            )}
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FACC15]/5 transition-all duration-300">
                                {tool.icon}
                            </div>
                            <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                                {tool.name}
                            </span>
                        </GlowCard>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] pointer-events-none" />
        </section>
    )
}
