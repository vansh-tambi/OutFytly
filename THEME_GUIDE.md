# 🎨 OutFytly Enhanced Theme Guide

## Color Palette

### Core Brand Colors
```css
--color-primary: #8A2BE1          /* Main purple */
--color-primary-light: #A855F7    /* Lighter purple */
--color-primary-dark: #6B21A8     /* Darker purple */

--color-ink: #3A2A45              /* Dark purple background */
--color-ink-light: #4A3556        
--color-ink-dark: #2A1A35         

--color-plum: #201825             /* Darkest background */
--color-plum-light: #2D2333       
--color-plum-dark: #15101A        

--color-lavender: #BEA0D3         /* Text/accent color */
--color-lavender-light: #D4B8E8   
--color-lavender-dark: #9F7DB8    
```

### Accent Colors
```css
--color-accent-pink: #E879F9      /* Vibrant pink */
--color-accent-blue: #60A5FA      /* Sky blue */
--color-accent-teal: #2DD4BF      /* Teal */
--color-accent-gold: #FCD34D      /* Gold */
```

### Semantic Colors
```css
--color-success: #10B981          /* Green for success */
--color-warning: #F59E0B          /* Amber for warnings */
--color-error: #EF4444            /* Red for errors */
--color-info: #3B82F6             /* Blue for info */
```

## New Utility Classes

### Glass Morphism
```jsx
<div className="glass-card">
  {/* Frosted glass effect with backdrop blur */}
</div>
```

### Gradient Buttons
```jsx
<button className="btn-gradient">
  Click Me
</button>
```

### Shimmer Effect
```jsx
<div className="shimmer">
  {/* Animated shimmer/loading effect */}
</div>
```

### Glow Effects
```jsx
<div className="glow-primary">Static glow</div>
<div className="glow-hover">Glow on hover</div>
```

### Gradient Text
```jsx
<h1 className="gradient-text">
  Beautiful Gradient Text
</h1>
```

### Card Effects
```jsx
<div className="card-hover">
  {/* Lifts up and glows on hover */}
</div>
```

### Custom Scrollbar
```jsx
<div className="custom-scrollbar overflow-auto">
  {/* Styled gradient scrollbar */}
</div>
```

### Animations
```jsx
<div className="animate-float">Float animation</div>
<div className="animate-pulse-glow">Pulsing glow</div>
```

### Gradient Border
```jsx
<div className="gradient-border">
  {/* Animated gradient border */}
</div>
```

### Loading States
```jsx
{/* Spinner */}
<div className="spinner"></div>

{/* Skeleton loading */}
<div className="skeleton h-20 w-full"></div>
```

### Tooltips
```jsx
<span data-tooltip="Helpful tip">
  Hover me
</span>
```

## Form Enhancements

All form inputs now have:
- ✅ Enhanced focus states with glowing rings
- ✅ Smooth hover transitions
- ✅ Better placeholder styling
- ✅ Improved shadows

```jsx
<input className="form-input" />
<label className="form-label">Label</label>
<select className="filter-select">...</select>
<p className="form-error">Error message</p>
```

## Date Picker Enhancements

The React Day Picker now features:
- ✨ Gradient backgrounds on selected dates
- 🎯 Enhanced hover states with scale animations
- 💫 Smooth transitions
- 🎨 Better color contrast
- ✅ Dot indicator for today's date

## Global Enhancements

### Selection
Custom purple selection color across the site

### Focus States
All interactive elements have visible focus indicators (2px purple outline)

### Image Loading
Lazy-loaded images fade in smoothly

### Disabled States
Disabled elements have reduced opacity and grayscale filter

### Links
All links have smooth color transitions on hover

## Usage Examples

### Create a Premium Card
```jsx
<motion.div 
  className="glass-card card-hover p-6"
  whileHover={{ scale: 1.02 }}
>
  <h3 className="gradient-text text-2xl font-bold">Premium Content</h3>
  <p className="text-lavender/80">Card content here</p>
  <button className="btn-gradient mt-4">Action</button>
</motion.div>
```

### Loading State
```jsx
{loading ? (
  <div className="skeleton h-64 w-full" />
) : (
  <Content />
)}
```

### Glowing CTA
```jsx
<button className="btn-gradient glow-hover animate-pulse-glow">
  Get Started Now
</button>
```

### Floating Element
```jsx
<div className="animate-float">
  <img src="icon.svg" alt="Floating icon" />
</div>
```

## Browser Support

✅ Chrome/Edge - Full support
✅ Firefox - Full support  
✅ Safari - Full support
✅ Mobile browsers - Full support

## Performance Notes

- All animations use GPU-accelerated properties (transform, opacity)
- Transitions are optimized with cubic-bezier easing
- CSS variables enable instant theme switching
- Gradient animations are performant with background-position

## Accessibility

- ✅ Focus visible on all interactive elements
- ✅ Proper contrast ratios maintained
- ✅ Respects prefers-reduced-motion (handled by Framer Motion)
- ✅ Semantic color usage (red for errors, green for success)

---

**Updated:** December 26, 2025  
**Version:** 2.0 - Enhanced Theme
