import { Cable, Brain, Server, Database, Layers, Sparkles, Bot } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'

const skills = [
    {
        icon: Cable,
        title: 'Integrações com API',
        description: 'Conexão entre sistemas, via webhooks e APIs, para fluxos de dados eficientes.',
    },
    {
        icon: Brain,
        title: 'Arquitetura de Agentes de IA com N8N',
        description: 'Lógica de workflows avançada, Estruturação de Prompts, Humanização de interações, Organização de tools, integrações com APIs externas.',
    },
    {
        icon: Bot,
        title: 'Criação de sistemas com IA',
        description: 'Antigravity e Lovable + Supabase',
    },
    {
        icon: Database,
        title: 'Arquitetura de Banco de Dados',
        description: 'Estruturação de tabelas, configuração de RLS, extensões e Edge Functions com Supabase.',
    },
    {
        icon: Layers,
        title: 'Base de Dados Vetorial — RAG',
        description: 'Organização e criação de base de dados para busca semântica com Supabase e Pinecone.',
    },
    {
        icon: Sparkles,
        title: 'Uso de LLMs',
        description: 'Integrações com Claude, Gemini, ChatGPT e outros modelos de IA.',
    },
    {
        icon: Server,
        title: 'Configuração de VPS',
        description: 'Deploy com Docker + Portainer para aplicações escaláveis e gerenciáveis.',
    },
]

export function SkillsSection() {
    return (
        <section id="habilidades" className="relative py-24 md:py-32">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <span className="text-sm text-[#FACC15] font-semibold uppercase tracking-widest">
                        Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
                        Conhecimento <span className="text-[#FACC15]">técnico</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {skills.map((skill, index) => (
                        <GlowCard
                            key={skill.title}
                            className={`group transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${index < 3 ? 'lg:col-span-4' : 'lg:col-span-3'
                                }`}
                        >
                            <div
                                className="p-6"
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
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
