# Timer Animation Fix

This document explains how the timer animation was fixed to work correctly while maintaining SSR/crawlability and avoiding hydration mismatch.

## Problem

The timer was stuck at `00:00` because:
1. The animation logic was overly complex with conditional state resets
2. The `hasAnimated` flag prevented re-animation
3. Dependency on `isInView` made animation unreliable

## Solution

Split the timer into a dedicated client component with proper hydration handling.

---

## Files Changed

### 1. Created: [components/TimerDisplay.tsx](components/TimerDisplay.tsx)

**Purpose:** Isolated client component that handles timer animation

**Key features:**
- Uses `mounted` state to track hydration
- Avoids hydration mismatch with `suppressHydrationWarning`
- Respects `prefers-reduced-motion`
- Starts animation automatically when `start=true`

**Props:**
```typescript
interface TimerDisplayProps {
  start: boolean; // Triggers animation when component is in view
}
```

### 2. Modified: [components/SpeedWidget.tsx](components/SpeedWidget.tsx)

**Changes:**
- ❌ Removed `useAnimatedTime` hook (complex animation logic)
- ❌ Removed `TARGET_SECONDS` and `ANIM_DURATION` constants
- ✅ Added `<TimerDisplay start={isInView} />` component
- ✅ Kept all other UI exactly the same

**Before:**
```tsx
const { mins, secs } = useAnimatedTime(isInView);
// ... complex JSX with mins/secs
```

**After:**
```tsx
<TimerDisplay start={isInView} />
```

---

## How Hydration Mismatch is Avoided

### The Problem

React hydration requires server HTML to match the first client render. If they differ, React shows a warning and re-renders, causing flicker.

**Bad approach (causes mismatch):**
```tsx
// Server renders: 61m 33s
const [time, setTime] = useState(TARGET_SECONDS);

useEffect(() => {
  setTime(0); // Client immediately changes to 00m 00s
  // ❌ MISMATCH: Server=61:33, Client first render=61:33, then 00:00
});
```

### The Solution

**Step 1: Track if component has mounted**
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true); // Only runs on client, never on server
}, []);
```

**Step 2: Start with same value on server and client**
```typescript
const [totalSec, setTotalSec] = useState(TARGET_SECONDS);
// Server: 61m 33s
// Client first render: 61m 33s
// ✅ MATCH
```

**Step 3: Only animate after mount**
```typescript
useEffect(() => {
  if (!mounted || !start) return; // Wait until mounted

  setTotalSec(0); // Now safe to change
  // Start animation from 0 to TARGET_SECONDS
}, [mounted, start]);
```

**Step 4: Suppress hydration warning**
```tsx
<div suppressHydrationWarning>
  {/* Timer display */}
</div>
```

This tells React: "I know this value will change on client, don't warn me."

---

## Animation Flow

### Server-Side Rendering (SSR)

1. Component renders with `mounted=false`
2. `totalSec` starts at `TARGET_SECONDS` (61m 33s)
3. HTML output: `<span>61</span>m <span>33</span>s`

**Crawlers see:** "61m 33s" in HTML ✅

---

### Client-Side Hydration

1. **First render (hydration):**
   - `mounted=false` (same as server)
   - `totalSec=TARGET_SECONDS` (same as server)
   - Renders: `61m 33s`
   - ✅ **Matches server HTML** - no hydration mismatch

2. **After mount:**
   - `useEffect` runs
   - `setMounted(true)`
   - Nothing changes yet (waiting for `start=true`)

3. **When component comes into view:**
   - `start` becomes `true` (from `isInView`)
   - Second `useEffect` runs
   - `setTotalSec(0)` - resets to zero
   - Animation starts: 0 → 3693 over 2.5 seconds
   - User sees smooth count-up animation ✅

---

## Accessibility: Reduced Motion

**Check for user preference:**
```typescript
const prefersReducedMotion = useReducedMotion();

useEffect(() => {
  if (prefersReducedMotion) {
    setTotalSec(TARGET_SECONDS); // Skip animation, show final value
    return;
  }
  // ... normal animation
}, [mounted, start, prefersReducedMotion]);
```

**Behavior:**
- ✅ Reduced motion: Shows `61m 33s` immediately, no animation
- ✅ Normal motion: Animates from `00m 00s` to `61m 33s`

---

## Animation Details

**Duration:** 2.5 seconds (2500ms)
**Easing:** Cubic ease-out for smooth deceleration
**Method:** `requestAnimationFrame` for 60fps smoothness

**Easing function:**
```typescript
const eased = 1 - Math.pow(1 - progress, 3);
```

**Result:**
- Fast start
- Gradual slowdown
- Smooth stop at target value

---

## Testing Checklist

### SSR/Crawlability

- [ ] Build succeeds: `npm run build`
- [ ] Check static HTML contains "61m 33s"
- [ ] View page source shows timer value
- [ ] Google crawler sees content

**Test:**
```bash
npm run build
curl http://localhost:3000 | grep -A 10 "build.log"
# Should show: 61m 33s in HTML
```

### Client Animation

- [ ] Timer starts at 00:00 when component is in view
- [ ] Animates smoothly to 61:33 over 2.5 seconds
- [ ] No flickering or hydration warnings in console
- [ ] Animation only runs once (not on every scroll)

**Test:**
```bash
npm run dev
# Scroll to speed widget section
# Watch timer animate from 00:00 → 61:33
# Check browser console for hydration warnings (should be none)
```

### Reduced Motion

- [ ] Enable reduced motion in OS settings
- [ ] Reload page
- [ ] Timer shows 61:33 immediately (no animation)

**Test (macOS):**
```
System Preferences → Accessibility → Display → Reduce Motion → ON
```

### Hydration

- [ ] No console warnings about hydration mismatch
- [ ] No flicker on page load
- [ ] Timer value stable until animation starts

**Test:**
```bash
npm run build && npm run start
# Check browser console for warnings
# Should see: No hydration mismatch errors
```

---

## Troubleshooting

### Timer stuck at 61:33 (not animating)

**Cause:** Animation not starting
**Fix:** Check that `isInView` is triggering correctly

**Debug:**
```tsx
console.log('isInView:', isInView); // Should become true when scrolled into view
```

### Timer stuck at 00:00 (not completing)

**Cause:** Animation not reaching target
**Fix:** Check `TARGET_SECONDS` constant and easing calculation

**Debug:**
```tsx
console.log('totalSec:', totalSec); // Should go from 0 to 3693
```

### Hydration mismatch warning

**Cause:** Server/client values don't match
**Fix:** Ensure `suppressHydrationWarning` is on timer div

**Check:**
```tsx
<div suppressHydrationWarning> {/* ← Must be present */}
  {/* Timer display */}
</div>
```

### Animation too fast/slow

**Adjust duration:**
```typescript
const ANIM_DURATION = 2500; // Change this (in milliseconds)
```

---

## Architecture

```
┌─────────────────────────────────────┐
│ SpeedWidget.tsx (Parent)            │
│ - Handles scroll detection          │
│ - Uses useInView hook               │
│ - Passes start={isInView}           │
└───────────┬─────────────────────────┘
            │
            v
┌─────────────────────────────────────┐
│ TimerDisplay.tsx (Client Component) │
│ - Tracks mounted state              │
│ - Handles animation                 │
│ - Respects reduced motion           │
│ - Avoids hydration mismatch         │
└─────────────────────────────────────┘
```

**Benefits of separation:**
- Clean separation of concerns
- Easier to test in isolation
- Can be reused in other components
- Simpler parent component

---

## Performance

**Impact:**
- ✅ No layout shift (timer stays same size)
- ✅ GPU-accelerated (only text content changes)
- ✅ 60fps animation (requestAnimationFrame)
- ✅ Cleanup on unmount (cancels animation frame)
- ✅ Runs only once (not on every scroll)

**Bundle size:**
- Added: ~1KB for TimerDisplay component
- Removed: Complex useAnimatedTime hook logic
- Net change: Negligible

---

## Future Enhancements

Consider adding:

1. **Configurable duration:**
   ```tsx
   <TimerDisplay start={isInView} duration={5000} />
   ```

2. **Custom easing:**
   ```tsx
   <TimerDisplay start={isInView} easing="spring" />
   ```

3. **Callback on complete:**
   ```tsx
   <TimerDisplay start={isInView} onComplete={() => console.log('Done!')} />
   ```

4. **Pause/resume:**
   ```tsx
   const [paused, setPaused] = useState(false);
   <TimerDisplay start={isInView} paused={paused} />
   ```
