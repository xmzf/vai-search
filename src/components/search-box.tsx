import { useNavigate } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LiquidGlassSurface } from './liquid-glass-surface';

/** Newlines never reach the URL: a pasted or wrapped request is one line of words. */
function oneLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/**
 * The main input is the focal glass surface. The text remains a real textarea
 * for keyboard and accessibility behaviour, while the visual shell is handled
 * by liquid-glass-react.
 */
export function SearchBox({
  initial = '',
  compact = false,
  autoFocus = false,
}: {
  initial?: string;
  compact?: boolean;
  autoFocus?: boolean;
}) {
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();

  const submit = () => {
    const q = oneLine(value);
    if (!q) return;
    navigate({ to: '/search', search: { q }, viewTransition: true });
  };

  return (
    <form
      className={cn('vt-searchbox relative w-full', compact ? 'h-12' : 'h-[68px]')}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      role="search"
    >
      <LiquidGlassSurface
        className="absolute inset-0 rounded-full"
        cornerRadius={999}
        displacementScale={compact ? 18 : 28}
        blurAmount={0.08}
        saturation={125}
        aberrationIntensity={1.35}
        elasticity={0.08}
      />
      <div
        className={cn(
          'relative z-10 flex h-full w-full items-center rounded-full border border-white/45 bg-white/15 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-[1px] dark:border-white/10 dark:bg-white/[0.03]',
          'transition-[box-shadow,border-color] duration-200',
          'focus-within:border-primary/50 focus-within:shadow-[0_16px_50px_rgba(91,92,226,0.16)]',
        )}
      >
        <SearchIcon
          aria-hidden
          className={cn(
            'pointer-events-none ml-5 shrink-0 text-muted-foreground',
            compact ? 'size-4' : 'size-5',
          )}
        />
        <textarea
          aria-label="Search"
          autoComplete="off"
          autoFocus={autoFocus}
          className={cn(
            'min-w-0 flex-1 resize-none overflow-hidden bg-transparent px-3 py-3 text-foreground outline-none placeholder:text-muted-foreground',
            compact ? 'h-12 text-[15px]' : 'h-[68px] text-[16px]',
          )}
          enterKeyHint="search"
          maxLength={300}
          name="q"
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
          placeholder={compact ? 'Search…' : 'Ask anything across the web'}
          rows={1}
          value={value}
          wrap="off"
        />
        <button
          aria-label="Search"
          className={cn(
            'mr-2 inline-flex shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]',
            compact ? 'size-8' : 'size-11',
          )}
          type="submit"
        >
          <SearchIcon aria-hidden className={cn(compact ? 'size-3.5' : 'size-4.5')} />
        </button>
      </div>
    </form>
  );
}
