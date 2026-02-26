import { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Target, Lightbulb, Layers, BookOpen } from 'lucide-react'
import type { Project } from '@/lib/supabaseClient'

interface ProjectModalProps {
    project: Project | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
    if (!project) return null

    const isYouTube = project.video_url?.includes('youtube') || project.video_url?.includes('youtu.be')
    const isVimeo = project.video_url?.includes('vimeo')

    // Prevent body scroll when modal is open, specifically for Lenis if present
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            document.documentElement.classList.add('lenis-stopped')
        } else {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('lenis-stopped')
        }
        return () => {
            document.body.style.overflow = ''
            document.documentElement.classList.remove('lenis-stopped')
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[1200px] w-[95vw] max-h-[90vh] md:h-[85vh] bg-[#111111] border-white/10 rounded-2xl p-0 flex flex-col md:flex-row overflow-hidden"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
            >
                {/* Left Column: Fixed Height Desktop */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0 bg-[#111111] relative z-10">
                    <DialogHeader className="text-left mt-auto mb-auto">
                        <DialogTitle className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-white/60 text-lg md:text-xl mt-6 leading-relaxed">
                            {project.short_description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Tags */}
                    {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-8 md:mt-12">
                            {project.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    className="bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20 font-medium px-4 py-1.5 text-sm"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Scrollable Content */}
                <div className="w-full md:w-3/5 h-full overflow-y-auto md:custom-scrollbar">
                    {/* Video or Image Viewer */}
                    {project.video_url ? (
                        <div className="w-full overflow-hidden bg-black">
                            <AspectRatio ratio={16 / 9}>
                                {isYouTube || isVimeo ? (
                                    <iframe
                                        src={project.video_url}
                                        title={project.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        src={project.video_url}
                                        controls
                                        className="w-full h-full object-cover"
                                    >
                                        Seu navegador não suporta vídeo HTML5.
                                    </video>
                                )}
                            </AspectRatio>
                        </div>
                    ) : project.image_url ? (
                        <div className="w-full overflow-hidden bg-black">
                            <AspectRatio ratio={16 / 9}>
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </AspectRatio>
                        </div>
                    ) : null}

                    {/* Content Area */}
                    <div className="p-8 md:p-12 space-y-12">
                        {/* Challenge */}
                        {project.challenge && (
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                                        <Target className="w-5 h-5 text-red-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">O Desafio</h4>
                                </div>
                                <p className="text-white/60 text-lg leading-relaxed pl-14 whitespace-pre-wrap">
                                    {project.challenge}
                                </p>
                            </div>
                        )}

                        {/* Solution */}
                        {project.solution && (
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                        <Lightbulb className="w-5 h-5 text-green-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">A Solução</h4>
                                </div>
                                <p className="text-white/60 text-lg leading-relaxed pl-14 whitespace-pre-wrap">
                                    {project.solution}
                                </p>
                            </div>
                        )}

                        {/* Applied Knowledge */}
                        {project.applied_knowledge && (
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-5 h-5 text-[#FACC15]" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Conhecimentos Aplicados</h4>
                                </div>
                                <p className="text-white/60 text-lg leading-relaxed pl-14 whitespace-pre-wrap">
                                    {project.applied_knowledge}
                                </p>
                            </div>
                        )}

                        {/* Stack */}
                        {project.stack?.length > 0 && (
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 flex items-center justify-center shrink-0">
                                        <Layers className="w-5 h-5 text-[#FACC15]" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-white">Stack Tecnológica</h4>
                                </div>
                                <div className="flex flex-wrap gap-3 pl-14">
                                    {project.stack.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="px-4 py-2 bg-white/5 text-white/80 border-white/10 hover:border-[#FACC15]/30 hover:text-[#FACC15] hover:bg-[#FACC15]/5 transition-all duration-300 text-sm font-medium"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
