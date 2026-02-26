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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[1120px] w-[95vw] max-h-[90vh] overflow-y-auto bg-[#111111] border-white/10 rounded-2xl p-0"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
            >
                {/* Video or Image Viewer */}
                {project.video_url ? (
                    <div className="w-full overflow-hidden rounded-t-2xl">
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
                    <div className="w-full overflow-hidden rounded-t-2xl">
                        <AspectRatio ratio={16 / 9}>
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </AspectRatio>
                    </div>
                ) : null}

                {/* Content */}
                <div className="px-8 pb-8 pt-6">
                    <DialogHeader className="text-left mb-6">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                            {project.title}
                        </DialogTitle>
                        <DialogDescription className="text-white/50 text-base mt-2 leading-relaxed">
                            {project.short_description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag) => (
                            <Badge
                                key={tag}
                                className="bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20 font-medium"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Challenge */}
                    {project.challenge && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                                    <Target className="w-4 h-4 text-red-400" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">O Desafio</h4>
                            </div>
                            <p className="text-white/50 leading-relaxed pl-11 whitespace-pre-wrap">
                                {project.challenge}
                            </p>
                        </div>
                    )}

                    {/* Solution */}
                    {project.solution && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4 text-green-400" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">A Solução</h4>
                            </div>
                            <p className="text-white/50 leading-relaxed pl-11 whitespace-pre-wrap">
                                {project.solution}
                            </p>
                        </div>
                    )}

                    {/* Applied Knowledge */}
                    {project.applied_knowledge && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-[#FACC15]" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">Conhecimentos Aplicados</h4>
                            </div>
                            <p className="text-white/50 leading-relaxed pl-11 whitespace-pre-wrap">
                                {project.applied_knowledge}
                            </p>
                        </div>
                    )}

                    {/* Stack */}
                    {project.stack.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-[#FACC15]/10 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-[#FACC15]" />
                                </div>
                                <h4 className="text-lg font-semibold text-white">Stack Tecnológica</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 pl-11">
                                {project.stack.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="outline"
                                        className="bg-white/5 text-white/70 border-white/15 hover:border-[#FACC15]/30 hover:text-[#FACC15] transition-all duration-300"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
