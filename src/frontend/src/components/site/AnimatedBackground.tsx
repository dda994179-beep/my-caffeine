import { useMemo } from "react";

interface Particle {
  id: string;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

/**
 * Fixed, non-interactive layered background: drifting amber glow, scrolling
 * road grid, running lane lines and floating particles. `pointer-events-none`
 * keeps every layer from intercepting clicks on the content above it.
 */
export function AnimatedBackground() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: `particle-${i}`,
        left: (i * 37) % 100,
        size: 2 + ((i * 13) % 5),
        delay: (i * 0.7) % 12,
        duration: 12 + ((i * 5) % 14),
        drift: (i % 2 === 0 ? 1 : -1) * (10 + ((i * 7) % 40)),
      })),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-drift-glow" />
      <div className="absolute inset-0 bg-road-grid opacity-70" />
      <div className="absolute inset-y-0 left-[12%] hidden w-px bg-road-lines sm:block" />
      <div className="absolute inset-y-0 right-[18%] hidden w-px bg-road-lines sm:block" />
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute bottom-[-10%] rounded-full bg-primary/60 animate-float-particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              ["--drift-x" as string]: `${particle.drift}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
