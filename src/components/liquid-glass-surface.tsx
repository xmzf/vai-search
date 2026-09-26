import LiquidGlass from 'liquid-glass-react';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassSurfaceProps {
  children?: ReactNode;
  className?: string;
  cornerRadius?: number;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
}

export function LiquidGlassSurface({
  children,
  className,
  cornerRadius = 24,
  displacementScale = 28,
  blurAmount = 0.08,
  saturation = 125,
  aberrationIntensity = 1.5,
  elasticity = 0.08,
}: LiquidGlassSurfaceProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fallback = (
    <div
      aria-hidden={children == null}
      className={cn(
        'relative overflow-hidden rounded-[inherit] border border-white/50 bg-white/40 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]',
        className,
      )}
    >
      {children}
    </div>
  );

  if (!mounted) return fallback;

  return (
    <div className={cn('relative isolate', className)}>
      <LiquidGlass
        aberrationIntensity={aberrationIntensity}
        blurAmount={blurAmount}
        className="liquid-glass-surface pointer-events-none absolute inset-0 h-full w-full"
        cornerRadius={cornerRadius}
        displacementScale={displacementScale}
        elasticity={elasticity}
        padding="0"
        saturation={saturation}
        style={{
          height: '100%',
          left: '50%',
          position: 'absolute',
          top: '50%',
          width: '100%',
        }}
      >
        <div className="h-full w-full" />
      </LiquidGlass>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
