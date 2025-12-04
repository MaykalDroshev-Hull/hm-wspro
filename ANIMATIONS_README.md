# Animations and Smooth Scrolling - Implementation Guide

This package contains all animations and smooth scrolling functionality extracted from the H&M Website Provisioning project. It's designed to be easily integrated into any one-page website.

## 📦 Installation

### 1. Install Required Dependencies

```bash
npm install lenis framer-motion
```

### 2. TypeScript Types (if using TypeScript)

The types are included in the main file, but if you need separate type definitions:

```bash
npm install --save-dev @types/react
```

## 🚀 Quick Start

### Step 1: Add CSS

Copy the contents of `animations.css` to your `globals.css` file, or import it:

```css
@import './animations.css';
```

### Step 2: Wrap Your App with LenisProvider

In your root layout or `_app.tsx`:

```tsx
import { LenisProvider } from './animations-and-smooth-scroll'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

### Step 3: Use Animations in Your Components

```tsx
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './animations-and-smooth-scroll'

export function MySection() {
  return (
    <AnimatedSection id="about" className="py-20">
      <AnimatedContainer className="container mx-auto px-4">
        <AnimatedItem>
          <h2>Title</h2>
        </AnimatedItem>
        <AnimatedItem>
          <p>Content</p>
        </AnimatedItem>
      </AnimatedContainer>
    </AnimatedSection>
  )
}
```

## 📚 API Reference

### Components

#### `LenisProvider`
Provides smooth scrolling functionality to your entire app.

```tsx
<LenisProvider>
  <YourApp />
</LenisProvider>
```

**Features:**
- Smooth scrolling on desktop only (mobile detection)
- Automatic anchor link handling
- Respects scroll-margin-top for proper offset

#### `AnimatedSection`
Wrapper component for animated sections with fade-in and slide-up effect.

```tsx
<AnimatedSection id="about" className="py-20">
  {/* Your content */}
</AnimatedSection>
```

#### `AnimatedContainer`
Container with stagger animation for child elements.

```tsx
<AnimatedContainer className="container mx-auto">
  <AnimatedItem>Item 1</AnimatedItem>
  <AnimatedItem>Item 2</AnimatedItem>
</AnimatedContainer>
```

#### `AnimatedItem`
Individual item with fade-in animation.

```tsx
<AnimatedItem className="mb-4">
  <p>Content</p>
</AnimatedItem>
```

### Functions

#### `smoothScroll(target: string)`
Programmatically scroll to an element.

```tsx
import { smoothScroll } from './animations-and-smooth-scroll'

// In your component
<button onClick={() => smoothScroll('#about')}>
  Scroll to About
</button>
```

### Animation Variants

Use these variants directly with `framer-motion` for more control:

```tsx
import { motion } from 'framer-motion'
import { sectionVariants, containerVariants, childVariants } from './animations-and-smooth-scroll'

export function MyComponent() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={containerVariants}>
        <motion.div variants={childVariants}>Item 1</motion.div>
        <motion.div variants={childVariants}>Item 2</motion.div>
      </motion.div>
    </motion.section>
  )
}
```

**Available Variants:**
- `sectionVariants` - For main sections
- `sectionMotionProps` - Alternative format for sections
- `containerVariants` - For containers with staggered children
- `childVariants` - For child elements
- `cardHoverVariants` - For interactive cards
- `textContainerVariants` - For text animations
- `textItemVariants` - For individual text items

## 🎨 Customization

### Adjusting Animation Speed

Edit the variants in `animations-and-smooth-scroll.tsx`:

```tsx
export const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }, // Change duration here
  },
}
```

### Adjusting Stagger Delay

```tsx
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Change this value
    },
  },
}
```

### Customizing Lenis Smooth Scrolling

In the `LenisProvider` component:

```tsx
const lenis = new Lenis({
  lerp: 0.08,              // Smoothness (lower = smoother)
  easing: (t) => 1 - Math.pow(1 - t, 4),
  smoothWheel: true,
  syncTouch: true,
  wheelMultiplier: 1.1,   // Scroll speed multiplier
})
```

## 📝 Usage Examples

### Example 1: Hero Section

```tsx
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './animations-and-smooth-scroll'

export function Hero() {
  return (
    <AnimatedSection id="home" className="min-h-screen flex items-center">
      <AnimatedContainer className="container mx-auto text-center">
        <AnimatedItem>
          <h1 className="text-5xl font-bold">Welcome</h1>
        </AnimatedItem>
        <AnimatedItem>
          <p className="text-xl mt-4">Your amazing content</p>
        </AnimatedItem>
        <AnimatedItem>
          <button onClick={() => smoothScroll('#about')}>
            Learn More
          </button>
        </AnimatedItem>
      </AnimatedContainer>
    </AnimatedSection>
  )
}
```

### Example 2: Navigation with Smooth Scroll

```tsx
import { smoothScroll } from './animations-and-smooth-scroll'

export function Navbar() {
  return (
    <nav>
      <a href="#home" onClick={(e) => {
        e.preventDefault()
        smoothScroll('#home')
      }}>Home</a>
      <a href="#about" onClick={(e) => {
        e.preventDefault()
        smoothScroll('#about')
      }}>About</a>
      <a href="#contact" onClick={(e) => {
        e.preventDefault()
        smoothScroll('#contact')
      }}>Contact</a>
    </nav>
  )
}
```

### Example 3: Card Grid with Stagger Animation

```tsx
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './animations-and-smooth-scroll'

export function Projects() {
  const projects = [
    { id: 1, title: 'Project 1' },
    { id: 2, title: 'Project 2' },
    { id: 3, title: 'Project 3' },
  ]

  return (
    <AnimatedSection id="projects" className="py-20">
      <AnimatedContainer className="container mx-auto grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <AnimatedItem key={project.id}>
            <div className="card">
              <h3>{project.title}</h3>
            </div>
          </AnimatedItem>
        ))}
      </AnimatedContainer>
    </AnimatedSection>
  )
}
```

### Example 4: Advanced Custom Animation

```tsx
import { motion, useAnimation, useInView } from 'framer-motion'
import { sectionVariants } from './animations-and-smooth-scroll'
import { useRef, useEffect } from 'react'

export function CustomSection() {
  const ref = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
      className="py-20"
    >
      <div className="container mx-auto">
        <h2>Custom Animated Section</h2>
      </div>
    </motion.section>
  )
}
```

## 🔧 Troubleshooting

### Smooth scrolling not working?
- Make sure `LenisProvider` wraps your entire app
- Check that `animations.css` is imported
- Verify that `lenis` package is installed

### Animations not triggering?
- Ensure `framer-motion` is installed
- Check that elements have proper viewport intersection
- Verify CSS classes are applied correctly

### Mobile scrolling issues?
- Lenis is automatically disabled on mobile devices
- This is intentional for better mobile performance
- Native smooth scrolling will be used instead

## 📄 Files Included

- `animations-and-smooth-scroll.tsx` - Main React components and utilities
- `animations.css` - CSS styles for animations and smooth scrolling
- `ANIMATIONS_README.md` - This documentation file

## 🎯 Best Practices

1. **Use AnimatedSection for main sections** - Provides consistent animation across your site
2. **Use AnimatedContainer for grouped content** - Creates nice stagger effects
3. **Respect scroll-margin-top** - Add `scroll-margin-top` CSS to sections for proper offset
4. **Test on mobile** - Animations are optimized for desktop, but should work on mobile too
5. **Don't over-animate** - Use animations sparingly for best UX

## 📦 Dependencies

- `lenis` - Smooth scrolling library
- `framer-motion` - Animation library
- `react` - React framework (required)

## 📝 License

This code is extracted from the H&M Website Provisioning project and can be used freely in your projects.

