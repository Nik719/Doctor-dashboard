import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const RADIUS = 90; // px of influence around the cursor

/**
 * Heading whose letters react to the cursor, like the hero text on
 * pritamsaha.in: characters near the mouse lift up and tint toward the
 * primary color, easing back as it moves away.
 */
export function InteractiveHeading({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  const update = useCallback((mx: number, my: number) => {
    const el = ref.current;
    if (!el) return;
    for (const span of el.querySelectorAll<HTMLSpanElement>("[data-ch]")) {
      const r = span.getBoundingClientRect();
      const dx = mx - (r.left + r.width / 2);
      const dy = my - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const force = Math.max(0, 1 - d / RADIUS);
      span.style.transform = force
        ? `translateY(${-6 * force}px) scale(${1 + 0.12 * force})`
        : "";
      span.style.color = force > 0.18 ? "hsl(var(--primary))" : "";
    }
  }, []);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    for (const span of el.querySelectorAll<HTMLSpanElement>("[data-ch]")) {
      span.style.transform = "";
      span.style.color = "";
    }
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("select-none", className)}
      onMouseMove={(e) => update(e.clientX, e.clientY)}
      onMouseLeave={reset}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-ch
          aria-hidden="true"
          className="inline-block transition-[transform,color] duration-200 ease-out will-change-transform"
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Tag>
  );
}
