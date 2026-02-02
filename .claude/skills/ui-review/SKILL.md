---
name: ui-review
description: Review and critique UI design, identifying improvements. Use when user asks to "review design", "critique UI", "what's wrong with the design", or "how can I improve this".
allowed-tools: Read, Glob, Grep
---

# UI Review Skill

Provide actionable critique and improvement suggestions for frontend interfaces.

## Review Framework

When reviewing UI, analyze these areas systematically:

### 1. Visual Hierarchy
- Is the most important content immediately obvious?
- Does the eye flow naturally through the page?
- Are headings, subheadings, and body text clearly differentiated?

### 2. Typography Assessment
- Are fonts distinctive and appropriate for the brand?
- Is there clear size/weight hierarchy?
- Is line-height comfortable for reading (1.5-1.7 for body)?
- Are font sizes responsive?

### 3. Color & Contrast
- Does the palette feel cohesive and intentional?
- Is text readable (WCAG AA: 4.5:1 for body text)?
- Are interactive elements clearly distinguishable?
- Does the dark mode work as well as light mode?

### 4. Spacing & Layout
- Is whitespace used effectively?
- Are margins/padding consistent?
- Does the layout adapt well to mobile?
- Is there visual breathing room?

### 5. Interactivity
- Are hover/focus states clear and satisfying?
- Do animations enhance or distract?
- Are clickable areas large enough (44px minimum)?
- Is feedback immediate on interactions?

### 6. Consistency
- Are similar elements styled the same way?
- Do components follow a coherent design language?
- Are border radii, shadows, colors reused consistently?

## Output Format

Structure reviews as:

```markdown
## UI Review: [Component/Page Name]

### Strengths
- What works well

### Issues
1. **[Category]**: Specific problem
   - Impact: Why this matters
   - Fix: Concrete solution

### Priority Improvements
1. High impact, quick fix
2. High impact, more effort
3. Nice to have
```

## Common Issues Checklist

Typography:
- [ ] Generic fonts (Inter, Roboto, Arial)
- [ ] Insufficient size hierarchy
- [ ] Poor line-height
- [ ] Text too wide (over 75ch)

Color:
- [ ] Low contrast text
- [ ] Too many accent colors
- [ ] Inconsistent dark mode
- [ ] Pure black on pure white

Spacing:
- [ ] Cramped elements
- [ ] Inconsistent margins
- [ ] No visual rhythm

Motion:
- [ ] Missing hover states
- [ ] Jarring transitions
- [ ] No loading states
- [ ] Excessive animation

## For This Portfolio

Key files to review:
- `src/index.css` - Global styles and variables
- `src/components/*.jsx` - Component structure
- `src/App.jsx` - Layout composition
