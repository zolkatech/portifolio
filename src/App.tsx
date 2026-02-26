import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { ToolsSection } from '@/components/ToolsSection'
import { BioSection } from '@/components/BioSection'
import { Footer } from '@/components/Footer'
import { AdminPanel } from '@/components/AdminPanel'
import { MouseGrid } from '@/components/MouseGrid'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  // Check URL hash for admin
  useEffect(() => {
    if (window.location.hash === '#admin') {
      setShowAdmin(true)
    }

    const handleHashChange = () => {
      setShowAdmin(window.location.hash === '#admin')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  })

  if (showAdmin) {
    return (
      <AdminPanel
        onBack={() => {
          setShowAdmin(false)
          window.location.hash = ''
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <MouseGrid />
      <Navbar />
      <main>
        <HeroSection />
        <BioSection />
        <ProjectsSection />
        <ToolsSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
