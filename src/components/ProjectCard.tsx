import { Badge } from '@/components/ui/badge'
import { Image as ImageIcon, ExternalLink, Play } from 'lucide-react'
import { GlowCard } from '@/components/ui/spotlight-card'
import type { Project } from '@/lib/supabaseClient'

interface ProjectCardProps {
    project: Project
    onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <GlowCard
            onClick={onClick}
            className="h-full flex flex-col group cursor-pointer overflow-hidden hover:border-[#FACC15]/30 transition-all duration-500"
        >
            <div className="relative p-6 flex flex-col flex-1 min-h-[280px]">
                {/* Top: Icon and Play button */}
                <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FACC15]/10 flex items-center justify-center group-hover:bg-[#FACC15]/20 transition-colors duration-300">
                        <ExternalLink className="w-5 h-5 text-[#FACC15]" />
                    </div>
                    {project.video_url ? (
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <Play className="w-4 h-4 text-[#FACC15] ml-0.5" />
                        </div>
                    ) : project.image_url ? (
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <ImageIcon className="w-4 h-4 text-[#FACC15]" />
                        </div>
                    ) : null}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FACC15] transition-colors duration-300">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {project.short_description}
                </p>

                {/* Tags / Stack badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.slice(0, 4).map((tech) => (
                        <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-white/5 text-white/60 border-white/10 group-hover:bg-[#FACC15]/10 group-hover:text-[#FACC15] group-hover:border-[#FACC15]/20 transition-all duration-300 text-xs font-medium"
                        >
                            {tech}
                        </Badge>
                    ))}
                    {project.stack.length > 4 && (
                        <Badge
                            variant="secondary"
                            className="bg-white/5 text-white/40 border-white/10 text-xs"
                        >
                            +{project.stack.length - 4}
                        </Badge>
                    )}
                </div>

                {/* Call to Action (Ver Detalhes) */}
                <div className="flex items-center gap-2 mt-6 text-[#FACC15] font-medium text-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Ver detalhes do projeto</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>

                {/* Bottom border glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FACC15]/0 to-transparent group-hover:via-[#FACC15]/40 transition-all duration-500" />
            </div>
        </GlowCard>
    )
}
