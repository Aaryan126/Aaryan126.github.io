import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLORS = {
  light: {
    home: '#0f172a',
    about: '#ffffff',
    experience: '#f8fafc',
    skills: '#ffffff',
    projects: '#f8fafc',
    contact: '#0f172a',
  },
  dark: {
    home: '#09090b',
    about: '#09090b',
    experience: '#18181b',
    skills: '#09090b',
    projects: '#18181b',
    contact: '#09090b',
  },
}

const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact']

export function useBackgroundTransitions(isDark) {
  useEffect(() => {
    const bgLayer = document.getElementById('bg-transition-layer')
    if (!bgLayer) return

    const palette = isDark ? COLORS.dark : COLORS.light

    // Set initial color
    gsap.set(bgLayer, { backgroundColor: palette.home })

    const triggers = []

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id)
      if (!section) return

      const tween = gsap.to(bgLayer, {
        backgroundColor: palette[id],
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        },
      })

      triggers.push(tween.scrollTrigger)
    })

    return () => {
      triggers.forEach((st) => st && st.kill())
    }
  }, [isDark])
}
