import { Code2, Briefcase, GraduationCap } from 'lucide-react'

const timeline = [
    {
        icon: Briefcase,
        title: 'Fundei a Zolka Tecnologia',
        description: 'Empresa focada em soluções digitais com IA, automação e design para negócios B2B.',
        period: 'Atual',
    },
    {
        icon: Code2,
        title: 'Desenvolvedor Fullstack',
        description: 'React, TypeScript, Supabase, Node.js — construindo produtos do zero à produção.',
        period: 'Experiência',
    },
    {
        icon: GraduationCap,
        title: 'Autodidata em IA & Automação',
        description: 'Especializado em integrar OpenAI, n8n e APIs para criar soluções inteligentes.',
        period: 'Formação',
    },
]

export function TimelineSection() {
    return (
        <section id="trajetoria" className="relative py-24 md:py-32 border-t border-white/5">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm text-[#FACC15] font-semibold uppercase tracking-widest">
                        Histórico
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                        Minha <span className="text-[#FACC15]">Trajetória</span>
                    </h2>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="space-y-0">
                        {timeline.map((item, index) => (
                            <div key={item.title} className="relative flex gap-6 pb-12 last:pb-0">
                                {/* Line */}
                                {index < timeline.length - 1 && (
                                    <div className="absolute left-[19px] top-12 bottom-0 w-px bg-gradient-to-b from-[#FACC15]/20 to-transparent" />
                                )}

                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FACC15]/10 border border-[#FACC15]/20 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.05)]">
                                    <item.icon className="w-4 h-4 text-[#FACC15]" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-0.5">
                                    <span className="text-xs text-[#FACC15] font-semibold uppercase tracking-wider">
                                        {item.period}
                                    </span>
                                    <h4 className="text-lg font-semibold text-white mt-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-white/40 mt-1 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
