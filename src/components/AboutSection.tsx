import { Code2, Bot, Rocket, Palette, Briefcase, GraduationCap } from 'lucide-react'

const skills = [
    {
        icon: Bot,
        title: 'Inteligência Artificial',
        description: 'Agentes de IA, chatbots humanizados e automações inteligentes com n8n e GPT.',
    },
    {
        icon: Code2,
        title: 'Desenvolvimento Web',
        description: 'Aplicações modernas com React, TypeScript e Supabase — rápidas e escaláveis.',
    },
    {
        icon: Rocket,
        title: 'Automação de Processos',
        description: 'Fluxos automatizados que eliminam tarefas manuais e aumentam a produtividade.',
    },
    {
        icon: Palette,
        title: 'UI/UX Design',
        description: 'Interfaces premium com foco em experiência do usuário e conversão.',
    },
]

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

export function AboutSection() {
    return (
        <section id="sobre" className="relative py-24 md:py-32">
            {/* Background subtle */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FACC15]/[0.02] to-transparent" />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm text-[#FACC15] font-semibold uppercase tracking-widest">
                        Sobre Mim
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                        Quem sou{' '}
                        <span className="text-[#FACC15] text-glow">eu</span>
                    </h2>
                    <p className="text-white/40 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                        Sou um desenvolvedor apaixonado por transformar problemas complexos em
                        soluções digitais elegantes. Acredito que tecnologia bem aplicada é a
                        chave para escalar qualquer negócio.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.title}
                            className="group p-6 rounded-2xl glass hover:bg-white/8 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center mb-5 group-hover:bg-[#FACC15]/20 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] transition-all duration-300">
                                <skill.icon className="w-5 h-5 text-[#FACC15]" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {skill.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed">
                                {skill.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white text-center mb-10">
                        Minha <span className="text-[#FACC15]">Trajetória</span>
                    </h3>

                    <div className="space-y-0">
                        {timeline.map((item, index) => (
                            <div key={item.title} className="relative flex gap-6 pb-10 last:pb-0">
                                {/* Line */}
                                {index < timeline.length - 1 && (
                                    <div className="absolute left-[19px] top-12 bottom-0 w-px bg-gradient-to-b from-[#FACC15]/20 to-transparent" />
                                )}

                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#FACC15]/10 border border-[#FACC15]/20 flex items-center justify-center">
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
