import { Link, createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { EngineStrip, type EnginePreview } from '@/components/home-demos';
import { LiquidGlassSurface } from '@/components/liquid-glass-surface';
import { SearchBox } from '@/components/search-box';
import { HOME_CANONICAL } from '@/lib/seo';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { property: 'og:url', content: HOME_CANONICAL },
      { title: 'VAI Search — Search the web, without the noise.' },
    ],
    links: [{ rel: 'canonical', href: HOME_CANONICAL }],
  }),
  component: Home,
});

interface Example extends EnginePreview {
  q: string;
}

const EXAMPLES: Example[] = [
  { q: 'Rust async runtimes on Hacker News this month', window: '30d', sources: ['hackernews', 'google'] },
  { q: 'What do Reddit users think of the Framework laptop?', window: 'any', sources: ['reddit', 'google'] },
  { q: 'New papers on speculative decoding', window: '30d', sources: ['arxiv', 'google'] },
];

function Home() {
  const [preview, setPreview] = useState<EnginePreview | null>(null);

  return (
    <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-3 py-1.5 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgb(99_102_241_/_10%)]" />
        AI-powered meta search
      </div>

      <h1 className="vt-wordmark text-center text-[clamp(3.25rem,9vw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
        VAI <span className="text-primary">Search</span>
      </h1>

      <p className="mt-5 max-w-xl text-center text-[15px] leading-7 text-muted-foreground sm:text-lg">
        One question. Multiple sources. Results ranked for relevance.
      </p>

      <div className="mt-9 w-full max-w-3xl sm:mt-11">
        <SearchBox autoFocus />
      </div>

      <LiquidGlassSurface
        className="mt-5 w-full max-w-3xl rounded-[28px] p-3 sm:p-4"
        cornerRadius={28}
        displacementScale={22}
        blurAmount={0.06}
        saturation={118}
        aberrationIntensity={1.2}
        elasticity={0.05}
      >
        <div className="flex flex-col gap-1">
          <div className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            Try a search
          </div>
          <ul className="grid gap-1 sm:grid-cols-3">
            {EXAMPLES.map((example) => (
              <li key={example.q}>
                <Link
                  className="group block rounded-2xl px-3 py-3 text-sm leading-6 text-muted-foreground transition-colors hover:bg-white/45 hover:text-foreground dark:hover:bg-white/[0.06]"
                  onBlur={() => setPreview(null)}
                  onFocus={() => setPreview(example)}
                  onMouseEnter={() => setPreview(example)}
                  onMouseLeave={() => setPreview(null)}
                  search={{ q: example.q }}
                  to="/search"
                  viewTransition
                >
                  <span className="line-clamp-2">{example.q}</span>
                  <span className="mt-1 block text-xs text-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Search →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </LiquidGlassSurface>

      <div className="mt-9 sm:mt-10">
        <EngineStrip preview={preview} />
      </div>
    </main>
  );
}
