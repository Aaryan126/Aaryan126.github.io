import { describe, expect, it } from 'vitest'
import { credentials, experiences, profile, projects } from './portfolio'

describe('portfolio content', () => {
  it('keeps stable, unique project routes', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs).toContain('boldr-signaldesk')
    expect(slugs).toContain('adapt')
    expect(slugs).toContain('alphadrop')
  })

  it('features exactly three complete case studies', () => {
    const featured = projects.filter((project) => project.featured)
    expect(featured.map((project) => project.slug)).toEqual([
      'boldr-signaldesk',
      'adapt',
      'alphadrop',
    ])

    featured.forEach((project) => {
      expect(project.challenge).toBeTruthy()
      expect(project.constraints.length).toBeGreaterThanOrEqual(3)
      expect(project.decisions).toHaveLength(3)
      expect(project.reflection).toBeTruthy()
      expect(project.outcome).toBeTruthy()
    })
  })

  it('preserves the complete portfolio evidence set', () => {
    expect(projects).toHaveLength(8)
    expect(experiences).toHaveLength(2)
    expect(credentials).toHaveLength(7)
    expect(profile.email).toBe('aaryan.kandiah@u.nus.edu')
  })
})
