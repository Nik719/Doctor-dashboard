import { useEffect, useRef } from "react";

/**
 * Constellation particle background, inspired by pritamsaha.in.
 * Dots drift slowly, link to near neighbours, and link to the cursor —
 * particles within reach are gently pulled toward the mouse.
 *
 * - Sits behind all content (pages render above with z-10)
 * - Colors adapt to the active theme (reads the `dark` class on <html>)
 * - Skipped entirely for prefers-reduced-motion users
 * - Pauses when the tab is hidden
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 110;
    const MOUSE_DIST = 240; // wider reach = more sensitive to the mouse

    let isDark = document.documentElement.classList.contains("dark");
    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Red atoms/particles: bright red cores with warm crimson link lines
    const colors = () =>
      isDark
        ? { dot: "rgba(255, 70, 70,", line: "rgba(255, 100, 90," }
        : { dot: "rgba(220, 38, 38,", line: "rgba(200, 50, 60," };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(
        170,
        Math.floor((canvas.width * canvas.height) / 11000),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 1.8 + 1,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = () => {
      const { dot, line } = colors();
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Additive blending in dark mode: overlapping halos brighten like light
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      for (const p of particles) {
        // Gentle attraction toward the cursor
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < MOUSE_DIST && dm > 0.001) {
          // Stronger pull the closer the particle is to the cursor
          const pull = 0.06 * (1 - dm / MOUSE_DIST) + 0.02;
          p.vx += (dxm / dm) * pull;
          p.vy += (dym / dm) * pull;
        }
        // Speed cap keeps things from going wild
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 1.6) {
          p.vx = (p.vx / speed) * 1.6;
          p.vy = (p.vy / speed) * 1.6;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Soft glow halo behind each dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `${dot}${isDark ? 0.1 : 0.07})`;
        ctx.fill();
        // Bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${dot}${isDark ? 0.85 : 0.6})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        // Particle-to-particle links
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${line}${(1 - d / LINK_DIST) * (isDark ? 0.16 : 0.12)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        // Particle-to-cursor links
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < MOUSE_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${line}${(1 - dm / MOUSE_DIST) * (isDark ? 0.28 : 0.2)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="no-print fixed inset-0 z-0 pointer-events-none"
    />
  );
}
