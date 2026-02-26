import { useState } from 'react'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import type { Project } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'

export function ProjectsSection() {
    const { projects, loading, error } = useProjects()
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleCardClick = (project: Project) => {
        setSelectedProject(project)
        setModalOpen(true)
    }

    return (
        <section id="projetos" className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm text-[#FACC15] font-semibold uppercase tracking-widest">
                        Portfólio
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 tracking-tight">
                        Principais{' '}
                        <span className="text-[#FACC15]">projetos</span>
                    </h2>
                    <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
                        Principais soluções que desenvolvi para empresas reais e MVPs de soluções.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#FACC15] animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-400">Erro ao carregar projetos: {error}</p>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="h-full animate-in fade-in slide-in-from-bottom-4"
                                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                            >
                                <ProjectCard
                                    project={project}
                                    onClick={() => handleCardClick(project)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </section>
    )
}
