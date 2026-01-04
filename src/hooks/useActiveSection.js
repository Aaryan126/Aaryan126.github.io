import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observers = []
    const visibleSections = new Map()

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleSections.set(id, entry.intersectionRatio)

          // Find the section with highest visibility
          let maxRatio = 0
          let mostVisible = sectionIds[0]

          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio
              mostVisible = sectionId
            }
          })

          if (maxRatio > 0) {
            setActiveSection(mostVisible)
          }
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [sectionIds])

  return activeSection
}
