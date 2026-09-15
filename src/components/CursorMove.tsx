import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks";

const DASH_DISTANCE = 16;
const DASH_LIFETIME = 550;
const CLICK_LIFETIME = 550;
const MAX_LIVE_MARKS = 40;

export default function CursorMove() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    let liveCount = 0;

    const spawn = (className: string, glyph: string, x: number, y: number, lifetime: number) => {
      if (liveCount >= MAX_LIVE_MARKS) return;
      liveCount++;
      const el = document.createElement("span");
      el.className = className;
      el.textContent = glyph;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      layer.appendChild(el);
      setTimeout(() => {
        el.remove();
        liveCount--;
      }, lifetime);
    };

    let lastX = 0;
    let lastY = 0;
    let hasLast = false;
    let distAcc = 0;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!hasLast) {
        lastX = e.clientX;
        lastY = e.clientY;
        hasLast = true;
        return;
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      distAcc += Math.hypot(dx, dy);
      lastX = e.clientX;
      lastY = e.clientY;
      if (distAcc >= DASH_DISTANCE) {
        distAcc = 0;
        spawn("cursor-dash", "-", e.clientX, e.clientY, DASH_LIFETIME);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      spawn("cursor-click", "*", e.clientX, e.clientY, CLICK_LIFETIME);
    };

    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [reduced]);

  return <div ref={layerRef} className="cursor-layer" aria-hidden="true" />;
}
