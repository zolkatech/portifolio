import { useState, useEffect } from 'react'
import { supabase, type Project } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    ArrowLeft,
    Loader2,
    LogIn,
    LogOut,
} from 'lucide-react'

type ProjectForm = {
    title: string
    slug: string
    short_description: string
    challenge: string
    solution: string
    applied_knowledge: string
    stack: string
    tags: string
    image_url: string
    video_url: string
    thumbnail_url: string
    is_featured: boolean
    sort_order: number
}

const emptyForm: ProjectForm = {
    title: '',
    slug: '',
    short_description: '',
    challenge: '',
    solution: '',
    applied_knowledge: '',
    stack: '',
    tags: '',
    image_url: '',
    video_url: '',
    thumbnail_url: '',
    is_featured: false,
    sort_order: 0,
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export function AdminPanel({ onBack }: { onBack: () => void }) {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<ProjectForm>(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingVideo, setUploadingVideo] = useState(false)

    // Auth states
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [authLoading, setAuthLoading] = useState(false)
    const [authError, setAuthError] = useState('')

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
            setIsAuthenticated(true)
            fetchProjects()
        } else {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setAuthLoading(true)
        setAuthError('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setAuthError(error.message)
        } else {
            setIsAuthenticated(true)
            fetchProjects()
        }
        setAuthLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setIsAuthenticated(false)
    }

    const fetchProjects = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true })
        setProjects((data as Project[]) || [])
        setLoading(false)
    }

    const openCreate = () => {
        setEditingId(null)
        setForm(emptyForm)
        setDialogOpen(true)
    }

    const openEdit = (project: Project) => {
        setEditingId(project.id)
        setForm({
            title: project.title,
            slug: project.slug,
            short_description: project.short_description,
            challenge: project.challenge || '',
            solution: project.solution || '',
            applied_knowledge: project.applied_knowledge || '',
            stack: project.stack.join(', '),
            tags: project.tags.join(', '),
            image_url: project.image_url || '',
            video_url: project.video_url || '',
            thumbnail_url: project.thumbnail_url || '',
            is_featured: project.is_featured,
            sort_order: project.sort_order,
        })
        setDialogOpen(true)
    }

    const handleSave = async () => {
        setSaving(true)
        const payload = {
            title: form.title,
            slug: form.slug || slugify(form.title),
            short_description: form.short_description,
            challenge: form.challenge || null,
            solution: form.solution || null,
            applied_knowledge: form.applied_knowledge || null,
            stack: form.stack
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            tags: form.tags
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            image_url: form.image_url || null,
            video_url: form.video_url || null,
            thumbnail_url: form.thumbnail_url || null,
            is_featured: form.is_featured,
            sort_order: form.sort_order,
            updated_at: new Date().toISOString(),
        }

        if (editingId) {
            await supabase.from('projects').update(payload).eq('id', editingId)
        } else {
            await supabase.from('projects').insert(payload)
        }

        setSaving(false)
        setDialogOpen(false)
        fetchProjects()
    }

    const handleDelete = async (id: string) => {
        await supabase.from('projects').delete().eq('id', id)
        setDeleteConfirm(null)
        fetchProjects()
    }

    const updateField = (field: keyof ProjectForm, value: string | number | boolean) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
            ...(field === 'title' && !editingId ? { slug: slugify(value as string) } : {}),
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
            const filePath = `${fileName}`

            setUploadingImage(true)

            // Upload the file to "projects" storage bucket
            const { error: uploadError } = await supabase.storage
                .from('projects')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get the public URL
            const { data } = supabase.storage
                .from('projects')
                .getPublicUrl(filePath)

            // Update form
            updateField('image_url', data.publicUrl)
        } catch (error: any) {
            alert('Erro ao fazer upload da imagem: ' + error.message)
        } finally {
            setUploadingImage(false)
        }
    }

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return

            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
            const filePath = `${fileName}`

            setUploadingVideo(true)

            // Upload the file to "projects" storage bucket
            const { error: uploadError } = await supabase.storage
                .from('projects')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get the public URL
            const { data } = supabase.storage
                .from('projects')
                .getPublicUrl(filePath)

            // Update form
            updateField('video_url', data.publicUrl)
        } catch (error: any) {
            alert('Erro ao fazer upload do vídeo: ' + error.message)
        } finally {
            setUploadingVideo(false)
        }
    }

    // Auth Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
                <Card className="w-full max-w-md bg-[#111] border-white/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="text-sm text-white/60 mb-1.5 block">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white/60 mb-1.5 block">Senha</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            {authError && (
                                <p className="text-red-400 text-sm">{authError}</p>
                            )}
                            <Button
                                type="submit"
                                disabled={authLoading}
                                className="w-full bg-[#FACC15] text-black hover:bg-[#FDE047] font-semibold"
                            >
                                {authLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4 mr-2" /> Entrar
                                    </>
                                )}
                            </Button>
                        </form>
                        <button
                            onClick={onBack}
                            className="mt-4 w-full text-center text-sm text-white/40 hover:text-white/60 transition-colors"
                        >
                            ← Voltar ao site
                        </button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
                            <p className="text-sm text-white/40">Gerencie os projetos do portfólio</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={openCreate} className="bg-[#FACC15] text-black hover:bg-[#FDE047] font-semibold">
                            <Plus className="w-4 h-4 mr-2" /> Novo Projeto
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Sair
                        </Button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-[#FACC15] animate-spin" />
                    </div>
                )}

                {/* Project List */}
                {!loading && (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                className="bg-[#111] border-white/8 hover:border-white/15 transition-colors"
                            >
                                <CardContent className="p-5 flex items-center justify-between">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <h3 className="text-white font-semibold truncate">
                                                {project.title}
                                            </h3>
                                            {project.is_featured && (
                                                <Badge className="bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20 text-xs">
                                                    Destaque
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-white/40 truncate max-w-xl">
                                            {project.short_description}
                                        </p>
                                        <div className="flex gap-1.5 mt-2">
                                            {project.stack.slice(0, 5).map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="bg-white/5 text-white/50 border-white/10 text-[10px]"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() => openEdit(project)}
                                            className="w-9 h-9 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                                        >
                                            <Pencil className="w-4 h-4 text-white/40" />
                                        </button>
                                        {deleteConfirm === project.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirm(null)}
                                                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5 text-white/40" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirm(project.id)}
                                                className="w-9 h-9 rounded-lg hover:bg-red-500/10 flex items-center justify-center transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-white/30 hover:text-red-400" />
                                            </button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {projects.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-white/30 text-lg">Nenhum projeto cadastrado</p>
                                <Button
                                    onClick={openCreate}
                                    className="mt-4 bg-[#FACC15] text-black hover:bg-[#FDE047]"
                                >
                                    <Plus className="w-4 h-4 mr-2" /> Criar Primeiro Projeto
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto bg-[#111] border-white/10 rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-white">
                            {editingId ? 'Editar Projeto' : 'Novo Projeto'}
                        </DialogTitle>
                        <DialogDescription className="text-white/40">
                            Preencha os campos abaixo. Stack e Tags separados por vírgula.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {/* Title */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">Título *</label>
                            <input
                                value={form.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">Slug</label>
                            <input
                                value={form.slug}
                                onChange={(e) => updateField('slug', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">Descrição Curta *</label>
                            <textarea
                                value={form.short_description}
                                onChange={(e) => updateField('short_description', e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Challenge */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">O Desafio</label>
                            <textarea
                                value={form.challenge}
                                onChange={(e) => updateField('challenge', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Solution */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">A Solução</label>
                            <textarea
                                value={form.solution}
                                onChange={(e) => updateField('solution', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Applied Knowledge */}
                        <div>
                            <label className="text-sm text-white/60 mb-1.5 block">Conhecimentos Aplicados</label>
                            <textarea
                                value={form.applied_knowledge}
                                onChange={(e) => updateField('applied_knowledge', e.target.value)}
                                rows={3}
                                placeholder="Descreva os conhecimentos e técnicas aplicados neste projeto"
                                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Stack & Tags */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white/60 mb-1.5 block">
                                    Stack (vírgula)
                                </label>
                                <input
                                    value={form.stack}
                                    onChange={(e) => updateField('stack', e.target.value)}
                                    placeholder="React, TypeScript, Supabase"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-white/60 mb-1.5 block">
                                    Tags (vírgula)
                                </label>
                                <input
                                    value={form.tags}
                                    onChange={(e) => updateField('tags', e.target.value)}
                                    placeholder="SaaS, IA, Automação"
                                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Image URL & Sort */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/60 mb-1.5 block">Imagem principal</label>
                                <div className="flex gap-2 items-center">
                                    <div className="relative overflow-hidden rounded-lg min-w-[120px]">
                                        <Button
                                            type="button"
                                            className="w-full bg-[#FACC15] text-black hover:bg-[#FDE047] font-semibold h-10"
                                            disabled={uploadingImage}
                                        >
                                            {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            {form.image_url ? 'Trocar Imagem' : 'Fazer Upload'}
                                        </Button>
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            disabled={uploadingImage}
                                        />
                                    </div>
                                    {form.image_url && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => updateField('image_url', '')}
                                            className="border-white/10 text-white/60 hover:text-red-400 hover:bg-red-500/10 h-10 px-3"
                                        >
                                            Remover
                                        </Button>
                                    )}
                                </div>
                                {form.image_url && (
                                    <div className="rounded-md overflow-hidden border border-white/10 mt-2 bg-black/50 inline-block">
                                        <img src={form.image_url} alt="Preview" className="h-24 w-auto object-cover max-w-full" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-start space-y-2">
                                <div>
                                    <label className="text-sm text-white/60 mb-1.5 block">Vídeo da Solução (.mp4)</label>
                                    <div className="flex gap-2 items-center mb-4">
                                        <div className="relative overflow-hidden rounded-lg min-w-[120px]">
                                            <Button
                                                type="button"
                                                className="w-full bg-[#FACC15] text-black hover:bg-[#FDE047] font-semibold h-10"
                                                disabled={uploadingVideo}
                                            >
                                                {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                {form.video_url ? 'Trocar Vídeo' : 'Fazer Upload'}
                                            </Button>
                                            <input
                                                type="file"
                                                onChange={handleVideoUpload}
                                                accept="video/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                disabled={uploadingVideo}
                                            />
                                        </div>
                                        {form.video_url && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => updateField('video_url', '')}
                                                className="border-white/10 text-white/60 hover:text-red-400 hover:bg-red-500/10 h-10 px-3"
                                            >
                                                Remover
                                            </Button>
                                        )}
                                    </div>

                                    {form.video_url && (
                                        <div className="rounded-md overflow-hidden bg-white/5 border border-white/10 p-2 flex items-center justify-between mt-2">
                                            <span className="text-xs text-[#FACC15] truncate max-w-[200px] font-medium p-1">
                                                Vídeo anexado com sucesso
                                            </span>
                                            <a
                                                href={form.video_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-white/40 hover:text-white text-xs underline"
                                            >
                                                Ver arquivo
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-auto pt-4">
                                    <label className="text-sm text-white/60 mb-1.5 block">Ordem</label>
                                    <input
                                        type="number"
                                        value={form.sort_order}
                                        onChange={(e) => updateField('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-32 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#FACC15]/50 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => updateField('is_featured', !form.is_featured)}
                                className={`w-10 h-6 rounded-full transition-all duration-300 ${form.is_featured ? 'bg-[#FACC15]' : 'bg-white/10'
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${form.is_featured ? 'translate-x-5' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className="text-sm text-white/60">Projeto em destaque</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                onClick={handleSave}
                                disabled={saving || !form.title || !form.short_description}
                                className="flex-1 bg-[#FACC15] text-black hover:bg-[#FDE047] font-semibold"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" /> Salvar
                                    </>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setDialogOpen(false)}
                                className="border-white/10 text-white/60 hover:bg-white/5"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
