# Framer Motion Animation Code Examples

## OutFytly Animation Patterns & Code Snippets

### Pattern 1: Entrance Animations with Scroll Trigger

**Use Case**: Product cards, list items, section content

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  {/* Content */}
</motion.div>
```

**Parameters**:
- `opacity: 0 → 1` - Fade in effect
- `y: 20 → 0` - Slide up from 20px below
- `once: true` - Only animate once
- `amount: 0.2` - Trigger when 20% visible

---

### Pattern 2: Hover Lift Effect

**Use Case**: Cards, buttons, interactive elements

```javascript
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  {/* Content */}
</motion.div>
```

**Effect**: Subtle 4px upward movement on hover, creates "floating" sensation

---

### Pattern 3: Focus States with Border Animation

**Use Case**: Form inputs, text fields

```javascript
<motion.input
  whileFocus={{ 
    borderColor: '#8A2BE2',
    boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)'
  }}
  transition={{ duration: 0.2 }}
/>
```

**Effect**: Color change + subtle glow on focus for better visibility

---

### Pattern 4: Staggered List Animations

**Use Case**: Drop-down menus, navigation items, product grids

```javascript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 + index * 0.05 }}
  >
    {item.content}
  </motion.div>
))}
```

**Effect**: Items appear one after another with 50ms delay between each

---

### Pattern 5: Spring Physics Animation

**Use Case**: Modal dialogs, confirmation popups

```javascript
<motion.div
  initial={{ scale: 0.8, opacity: 0, y: 20 }}
  animate={{ scale: 1, opacity: 1, y: 0 }}
  exit={{ scale: 0.8, opacity: 0, y: 20 }}
  transition={{ 
    type: "spring",
    stiffness: 300,
    damping: 30
  }}
>
  {/* Modal content */}
</motion.div>
```

**Effect**: Bouncy, elastic animation with natural deceleration

---

### Pattern 6: Tap/Click Feedback

**Use Case**: Buttons, interactive elements

```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

**Effect**: Scale up on hover, scale down on click for tactile feedback

---

### Pattern 7: Continuous Animation Loop

**Use Case**: Loading spinners, animated icons

```javascript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
/>
```

**Effect**: Continuous rotation at 1 second per full rotation

---

### Pattern 8: Icon Pulse Animation

**Use Case**: Wishlist heart, status indicators

```javascript
<motion.div
  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
  transition={{ duration: 0.3 }}
>
  <HeartIcon />
</motion.div>
```

**Effect**: Scale pulse from 1.0 → 1.2 → 1.0 when activated

---

### Pattern 9: Layout Transition (AnimatePresence)

**Use Case**: Adding/removing items from list

```javascript
<AnimatePresence>
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
      layout
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

**Effect**: Smooth entrance/exit with automatic layout reflow

---

### Pattern 10: Scroll-Based Parallax

**Use Case**: Hero sections, background elements

```javascript
const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

<motion.div style={{ y }}>
  {/* Content that moves with scroll */}
</motion.div>
```

**Effect**: Element moves based on scroll position

---

## Real Implementation Examples

### Example 1: Enhanced Product Card

```javascript
import { motion } from 'framer-motion';

export function ProductCard({ product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="product-card"
    >
      <motion.img
        src={product.image}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.4 }}
      />
      
      <motion.button
        onClick={() => setIsInWishlist(!isInWishlist)}
        animate={isInWishlist ? { scale: [1, 1.2, 1] } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart fill={isInWishlist ? 'red' : 'none'} />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
      </motion.div>
    </motion.div>
  );
}
```

### Example 2: Animated Form

```javascript
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

export function SignupForm() {
  const { register, handleSubmit } = useForm();

  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <motion.input
          {...register('email')}
          placeholder="Email"
          whileFocus={{
            borderColor: '#8A2BE2',
            boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)'
          }}
        />
      </motion.div>

      <motion.div
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <motion.input
          {...register('password')}
          type="password"
          placeholder="Password"
          whileFocus={{
            borderColor: '#8A2BE2',
            boxShadow: '0 0 0 3px rgba(138, 43, 226, 0.1)'
          }}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Sign Up
      </motion.button>
    </motion.form>
  );
}
```

### Example 3: Modal with AnimatePresence

```javascript
import { motion, AnimatePresence } from 'framer-motion';

export function ConfirmDialog({ isOpen, onConfirm, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Confirm Action</h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
            >
              Confirm
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## Performance Tips

### ✅ DO
- Use `opacity` and `transform` for animations
- Apply `whileInView` for viewport-triggered animations
- Use `once: true` to prevent repeated animations
- Keep animation durations between 0.2s - 0.8s
- Test on mobile devices

### ❌ DON'T
- Animate `height`, `width`, or `position` properties
- Create animations that repeat infinitely (except loaders)
- Use overly long durations (feels sluggish)
- Animate on `scroll` without optimization
- Forget to set `transition` duration

---

## Browser Compatibility

✅ **Fully Supported**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+

**Note**: Framer Motion uses `Web Animations API` which is hardware-accelerated on all modern browsers.

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion)
- [Animation Best Practices](https://www.framer.com/motion/guide-animation/)
- [Easing Functions](https://easings.net/)

---

**Last Updated**: December 25, 2025
**OutFytly Animation Guide v1.0**
