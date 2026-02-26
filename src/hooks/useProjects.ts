import { useState, useEffect } from 'react'
import { supabase, type Project } from '@/lib/supabaseClient'

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProjects = async () => {
        setLoading(true)
        setError(null)
        const { data, error: err } = await supabase
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true })

        if (err) {
            setError(err.message)
        } else {
            setProjects(data as Project[])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return { projects, loading, error, refetch: fetchProjects }
}
