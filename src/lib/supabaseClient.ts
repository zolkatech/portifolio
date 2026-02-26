import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mhekcxuukvsptdzhueiv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZWtjeHV1a3ZzcHRkemh1ZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNTc3NjQsImV4cCI6MjA4NzYzMzc2NH0.QUDwbuzJJT1FE4qKeBOusL2uCkoBGKJPMC5lQHDJb6I'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
    id: string
    title: string
    slug: string
    short_description: string
    challenge: string | null
    solution: string | null
    stack: string[]
    tags: string[]
    image_url: string | null
    video_url: string | null
    thumbnail_url: string | null
    is_featured: boolean
    applied_knowledge: string | null
    sort_order: number
    created_at: string
    updated_at: string
}
