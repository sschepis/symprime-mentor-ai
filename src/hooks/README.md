# Custom React Hooks

A collection of reusable custom React hooks for common functionality.

## Hooks Overview

### useLocalStorage
Persist state to localStorage with automatic serialization.

```tsx
import { useLocalStorage } from '@/hooks';

function Component() {
  const [user, setUser] = useLocalStorage('user', { name: '', email: '' });
  
  return (
    <input 
      value={user.name} 
      onChange={(e) => setUser({ ...user, name: e.target.value })} 
    />
  );
}
```

### useDebounce
Delay updating a value until after a specified delay.

```tsx
import { useDebounce } from '@/hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // API call with debounced value
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### useMediaQuery
Detect if a media query matches.

```tsx
import { useMediaQuery, useIsDesktop, useIsTablet, useIsMobile } from '@/hooks';

function ResponsiveComponent() {
  const isDesktop = useIsDesktop(); // >= 1024px
  const isTablet = useIsTablet();   // 768px - 1023px
  const isMobile = useIsMobile();   // <= 767px
  const isWide = useMediaQuery('(min-width: 1400px)');

  return <div>{isDesktop ? 'Desktop' : 'Mobile'}</div>;
}
```

### useIntersectionObserver
Detect when an element enters the viewport.

```tsx
import { useIntersectionObserver } from '@/hooks';
import { useRef } from 'react';

function AnimatedComponent() {
  const ref = useRef(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.5,
    freezeOnceVisible: true
  });

  const isVisible = entry?.isIntersecting;

  return (
    <div 
      ref={ref} 
      className={isVisible ? 'animate-fade-in' : 'opacity-0'}
    >
      Content
    </div>
  );
}
```

### useClickOutside
Execute a callback when clicking outside an element.

```tsx
import { useClickOutside } from '@/hooks';
import { useRef } from 'react';

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

### useKeyPress & useKeyboardShortcut
Detect key presses and keyboard shortcuts.

```tsx
import { useKeyPress, useKeyboardShortcut } from '@/hooks';

function Component() {
  const escapePressed = useKeyPress('Escape');
  
  useKeyboardShortcut(['s'], () => {
    console.log('Save');
  }, { ctrl: true }); // Ctrl+S

  useKeyboardShortcut(['k'], () => {
    console.log('Search');
  }, { ctrl: true, shift: true }); // Ctrl+Shift+K

  return <div>{escapePressed && 'Escape is pressed'}</div>;
}
```

### useCopyToClipboard
Copy text to clipboard.

```tsx
import { useCopyToClipboard } from '@/hooks';
import { toast } from '@/hooks';

function CopyButton({ text }: { text: string }) {
  const { copy, copiedText } = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      toast({ title: 'Copied to clipboard!' });
    }
  };

  return <button onClick={handleCopy}>Copy</button>;
}
```

### useAsync
Handle async operations with loading and error states.

```tsx
import { useAsync } from '@/hooks';

function DataComponent() {
  const { data, loading, error, execute } = useAsync(
    async () => {
      const response = await fetch('/api/data');
      return response.json();
    },
    true // Execute immediately
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={execute}>Refetch</button>
    </div>
  );
}
```

### useWindowSize
Track window dimensions.

```tsx
import { useWindowSize } from '@/hooks';

function Component() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

### usePrevious
Access the previous value of a prop or state.

```tsx
import { usePrevious } from '@/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Best Practices

1. **Always import from the index**: Use `import { useHook } from '@/hooks'` instead of individual files
2. **Memoize callbacks**: When passing callbacks to hooks, wrap them in `useCallback` to prevent unnecessary re-renders
3. **Handle cleanup**: Hooks that add event listeners automatically clean up on unmount
4. **TypeScript support**: All hooks are fully typed with TypeScript
5. **Performance**: Hooks are optimized to minimize re-renders

## Adding New Hooks

To add a new custom hook:

1. Create a new file in `src/hooks/` (e.g., `use-your-hook.ts`)
2. Implement your hook following React hooks rules
3. Add proper TypeScript types
4. Export it from `src/hooks/index.ts`
5. Document it in this README

## Context Hooks

The app also provides context hooks for global state:

- `useUser` - User authentication and profile
- `useEngines` - AI engines management
- `useTraining` - Training sessions
- `useApp` - Global app state

Import these from `@/contexts`.
