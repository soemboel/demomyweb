import { useEffect, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useReducedMotion } from "../hooks";

const CRAB_WIDTH = 34;
const SPEED = 0.55;
const STEP_DISTANCE = 7;
const TRAIL_DISTANCE = 11;
const TRAIL_LIFETIME = 700;
const JUMP_VELOCITY = 5.6;
const GRAVITY = 0.35;

type CrabProps = {
  color: string;
  side: "left" | "right";
  label: string;
  full?: boolean;
  startFrac?: number;
};

export function Crab({ color, side, label, full = false, startFrac }: CrabProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const triggerJumpRef = useRef(() => {});
  const reduced = useReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const trailLayer = trailRef.current;
    const track = outer?.parentElement;
    if (!outer || !track || !trailLayer) return;

    const bounds = (): [number, number] => {
      const w = track.clientWidth;
      const pad = 10;
      if (full) return [pad, Math.max(pad + 20, w - pad - CRAB_WIDTH)];
      const half = w / 2;
      if (side === "left") return [pad, Math.max(pad + 20, half - pad - CRAB_WIDTH)];
      return [half + pad, Math.max(half + pad + 20, w - pad - CRAB_WIDTH)];
    };

    const [initMinX, initMaxX] = bounds();
    let x = startFrac !== undefined ? initMinX + startFrac * (initMaxX - initMinX) : initMinX;
    let facing = 1;
    let stepAcc = 0;
    let trailAcc = 0;
    let frame = 0;
    let pausedUntil = 0;
    let distSincePause = 0;
    let nextPauseAt = 40 + Math.random() * 180;
    let jumpY = 0;
    let jumpV = 0;
    let jumping = false;

    const spawnDash = () => {
      const dash = document.createElement("span");
      dash.className = "crab-trail-dash";
      dash.style.background = color;
      const backOffset = facing === 1 ? -6 : CRAB_WIDTH - 2;
      dash.style.left = `${x + backOffset}px`;
      trailLayer.appendChild(dash);
      setTimeout(() => dash.remove(), TRAIL_LIFETIME);
    };

    const onJump = () => {
      if (jumping) return;
      jumping = true;
      jumpV = JUMP_VELOCITY;
    };
    triggerJumpRef.current = onJump;
    outer.addEventListener("pointerdown", onJump);

    if (reduced) {
      outer.style.transform = `translate(${x}px, 0px)`;
      return () => outer.removeEventListener("pointerdown", onJump);
    }

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const [minX, maxX] = bounds();

      if (now > pausedUntil) {
        const dx = ((SPEED * dt) / 16.7) * facing;
        x += dx;
        stepAcc += Math.abs(dx);
        trailAcc += Math.abs(dx);
        distSincePause += Math.abs(dx);

        if (x <= minX) {
          x = minX;
          facing = 1;
        } else if (x >= maxX) {
          x = maxX;
          facing = -1;
        }

        if (distSincePause >= nextPauseAt) {
          distSincePause = 0;
          nextPauseAt = 40 + Math.random() * 180;
          if (Math.random() < 0.55) {
            pausedUntil = now + 900 + Math.random() * 2400;
            facing = Math.random() < 0.5 ? 1 : -1;
          }
        }

        if (stepAcc >= STEP_DISTANCE) {
          stepAcc = 0;
          frame = frame ? 0 : 1;
          outer.dataset.frame = String(frame);
        }

        if (!jumping && trailAcc >= TRAIL_DISTANCE) {
          trailAcc = 0;
          spawnDash();
        }
      }

      if (jumping) {
        jumpV -= GRAVITY * (dt / 16.7);
        jumpY += jumpV * (dt / 16.7);
        if (jumpY <= 0) {
          jumpY = 0;
          jumping = false;
          jumpV = 0;
        }
      }

      outer.style.transform = `translate(${x}px, ${-jumpY}px) scaleX(${facing})`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener("pointerdown", onJump);
    };
  }, [side, color, reduced, full, startFrac]);

  return (
    <>
      <div ref={trailRef} className="pointer-events-none absolute inset-0" />
      <div
        ref={outerRef}
        className="crab pointer-events-auto absolute bottom-0 left-0 opacity-100"
        data-frame="0"
        style={{ width: CRAB_WIDTH, ["--crab-color" as string]: color } as React.CSSProperties}
        role="button"
        tabIndex={0}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            triggerJumpRef.current();
          }
        }}
      >
        <div className="crab-inner">
          <span className="crab-claw crab-claw-left" />
          <span className="crab-claw crab-claw-right" />
          <span className="crab-body">
            <span className="crab-eye crab-eye-left" />
            <span className="crab-eye crab-eye-right" />
          </span>
          <span className="crab-legs">
            <span className="crab-leg" />
            <span className="crab-leg" />
            <span className="crab-leg" />
            <span className="crab-leg" />
          </span>
        </div>
      </div>
    </>
  );
}

export default function CrabSidebar() {
  const { language } = useLanguage();
  const blueLabel = language === "id" ? "Kepiting biru — klik untuk lompat" : "Blue crab — click to jump";
  const chocoLabel = language === "id" ? "Kepiting cokelat — klik untuk lompat" : "Chocolate crab — click to jump";

  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[230px] overflow-hidden min-[1700px]:block">
        <img
          src="/beach.webp"
          alt=""
          className="h-full w-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink-950/75" />
        <div className="crab-track pointer-events-auto absolute inset-x-0 bottom-[10%] h-16">
          <Crab color="#6fd6ff" side="left" full label={blueLabel} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[230px] overflow-hidden min-[1700px]:block">
        <img
          src="/beach.webp"
          alt=""
          className="h-full w-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ink-950/75" />
        <div className="crab-track pointer-events-auto absolute inset-x-0 bottom-[10%] h-16">
          <Crab color="#972828" side="right" full label={chocoLabel} />
        </div>
      </div>
    </>
  );
}
