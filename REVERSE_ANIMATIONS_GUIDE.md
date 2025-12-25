# Reverse Animations Implementation Guide

## Overview
All animations in OutFytly now support **bidirectional playback** based on viewport visibility. Animations trigger every time an element enters the viewport, regardless of scroll direction (up or down).

## Key Changes

### 1. **Viewport Configuration**
Changed from `viewport={{ once: true }}` to `viewport={{ once: false }}`

**Before:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}  // ❌ Animates only once
>
```

**After:**
```jsx
<motion.div
  variants={{
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 }
  }}
  initial="initial"
  whileInView="whileInView"
  viewport={{ once: false, amount: 0.2 }}  // ✅ Animates every time
>
```

### 2. **Animation Variants Pattern**
Using variants instead of inline props for cleaner, reusable animations:

```jsx
const cardVariants = {
  initial: { opacity: 0, scale: 0.9, y: 30 },
  whileInView: { opacity: 1, scale: 1, y: 0 }
};

<motion.div
  variants={cardVariants}
  initial="initial"
  whileInView="whileInView"
  viewport={{ once: false, amount: 0.2 }}
/>
```

### 3. **Scroll Direction Hook**
Created `useScrollDirection` hook for advanced scroll-based effects:

**Location:** `frontend/src/hooks/useScrollDirection.js`

```jsx
import { useScrollDirection } from '../hooks/useScrollDirection';

const MyComponent = () => {
  const { direction, isScrolling } = useScrollDirection();
  // direction: 'up' | 'down'
  // isScrolling: boolean
};
```

## Updated Components

### Pages
- ✅ **Browse.jsx** - Filter sidebar, product grid, pagination
- ✅ **ItemCard.jsx** - Product cards with staggered entrance

### Sections
- ✅ **Testimonial.jsx** - Testimonial cards and navigation
- ✅ **HowItWorks.jsx** - Step indicators and images
- ✅ **Categories.jsx** - Category cards with stagger
- ✅ **Newsletter.jsx** - Subscription form
- ✅ **AppDownload.jsx** - App store buttons

## Animation Behavior

### Scroll Down (Default)
- Elements fade in and slide up: `y: 40 → 0`
- Scale grows: `scale: 0.95 → 1`
- Opacity increases: `opacity: 0 → 1`

### Scroll Up (Reverse)
- Same animation triggers in reverse when element re-enters viewport
- Smooth transitions with `duration: 0.4-0.6s`
- Configurable delays for staggered effects

## Performance Optimization

1. **Viewport Amount**: Set to `0.1-0.3` to trigger animations early
2. **Transition Duration**: Kept short (`0.4-0.6s`) for snappy feel
3. **GPU Acceleration**: Using `transform` properties (y, scale) instead of `top`, `left`

## Example Implementation

```jsx
// Product Grid with Reverse Animations
<motion.div className="grid gap-6">
  {products.map((item, index) => (
    <motion.div
      key={item.id}
      variants={{
        initial: { opacity: 0, y: 40, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 }
      }}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <ProductCard {...item} />
    </motion.div>
  ))}
</motion.div>
```

## Benefits

✅ **Enhanced UX**: Animations always feel fresh and responsive  
✅ **Visual Feedback**: Users know when new content enters view  
✅ **Scroll Engagement**: Encourages exploration of entire page  
✅ **Professional Feel**: Matches modern web app standards  
✅ **Accessibility**: Respects `prefers-reduced-motion` (handled by Framer Motion)

## Testing

1. Scroll down the page → Elements animate in
2. Scroll back up → Elements animate out
3. Scroll down again → Elements re-animate in
4. Check performance with Chrome DevTools Performance tab

## Browser Support

- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- Mobile browsers: Full support ✅

---

**Updated:** December 26, 2025  
**Framer Motion Version:** 12.23.12
