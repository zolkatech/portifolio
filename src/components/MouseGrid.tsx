import { useEffect, useRef } from 'react'

export function MouseGrid() {
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return
            // 500px * 0.75 = 375px
            gridRef.current.style.maskImage = `radial-gradient(circle 375px at ${e.clientX}px ${e.clientY}px, rgba(0,0,0,0.6) 0%, transparent 100%)`
            gridRef.current.style.webkitMaskImage = `radial-gradient(circle 375px at ${e.clientX}px ${e.clientY}px, rgba(0,0,0,0.6) 0%, transparent 100%)`
            gridRef.current.style.opacity = '1'
        }

        const handleMouseLeave = () => {
            if (!gridRef.current) return
            gridRef.current.style.opacity = '0'
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <div
            ref={gridRef}
            className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-500"
            style={{
                backgroundImage:
                    'linear-gradient(rgba(255, 204, 0, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.07) 1px, transparent 1px)',
                backgroundSize: '45px 45px',
            }}
        />
    )
}
