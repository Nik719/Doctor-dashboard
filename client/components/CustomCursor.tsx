import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], label, [data-cursor='pointer'], .cursor-pointer";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

/**
 * Custom cursor: a primary-colored dot with a trailing ring that eases
 * behind it (same pattern as pritamsaha.in). The ring grows over
 * interactive elements and the pair fades out over text fields so the
 * native I-beam can do its job in a data-entry app.
 *
 * Only active for fine pointers (mouse) without reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    let raf = 0;
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;

    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      dot.style.opacity = v ? "1" : "0";
      ring.style.opacity = v ? "1" : "0";
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as Element | null;
      const overText = !!t?.closest?.(TEXT_FIELDS);
      const overInteractive = !overText && !!t?.closest?.(INTERACTIVE);
      setVisible(!overText);
      ring.classList.toggle("cursor-ring--hover", overInteractive);
      dot.classList.toggle("cursor-dot--hover", overInteractive);
    };

    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");
    const onLeaveWindow = () => setVisible(false);

    const tick = () => {
      // Dot snaps, ring eases behind for the trailing feel
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="no-print cursor-dot" />
      <div ref={ringRef} aria-hidden="true" className="no-print cursor-ring" />
    </>
  );
}
