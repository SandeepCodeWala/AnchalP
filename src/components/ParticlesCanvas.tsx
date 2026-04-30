import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  t: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ParticlesCanvas({
  className
}: {
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const particles: Particle[] = [];
    const pointer = { x: 0, y: 0 };

    const accent = [215, 27, 107];
    const gold = [216, 177, 90];
    const violet = [88, 24, 135];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = clamp(window.devicePixelRatio || 1, 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = clamp(Math.round((w * h) / 22000), 36, 120);
      while (particles.length < targetCount) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random(),
          r: 0.8 + Math.random() * 2.4,
          vx: (-0.22 + Math.random() * 0.44) * (0.4 + Math.random()),
          vy: (-0.18 + Math.random() * 0.36) * (0.4 + Math.random()),
          t: Math.random() * Math.PI * 2
        });
      }
      while (particles.length > targetCount) particles.pop();
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.y = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        p.t += 0.004 + p.z * 0.01;
        const driftX = pointer.x * (0.12 + p.z * 0.2);
        const driftY = pointer.y * (0.08 + p.z * 0.18);

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const twinkle = 0.55 + Math.sin(p.t) * 0.25 + p.z * 0.2;
        const radius = p.r * (0.85 + p.z * 0.6);
        const x = p.x;
        const y = p.y;

        const mix = p.z;
        const c1 = accent;
        const c2 = mix > 0.6 ? violet : gold;
        const rr = Math.round(c1[0] * (1 - mix) + c2[0] * mix);
        const gg = Math.round(c1[1] * (1 - mix) + c2[1] * mix);
        const bb = Math.round(c1[2] * (1 - mix) + c2[2] * mix);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rr}, ${gg}, ${bb}, ${0.16 + twinkle * 0.34})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

