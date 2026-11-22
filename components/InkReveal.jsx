"use client";

import { useEffect, useRef } from "react";

// 마우스(터치)가 지나간 자리에 잉크가 번지며
// 검은 "ICHRD" 글자 아래 숨은 색 레이어가 드러나는 히어로 효과.
export default function InkReveal({ text = "ICHRD" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const color = document.createElement("canvas"); // 드러날 색 레이어
    const mask = document.createElement("canvas"); // 잉크 마스크
    const cctx = color.getContext("2d");
    const mctx = mask.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    let fontSize = 0, textY = 0;
    let blobs = [];
    let last = null;
    let userActive = false;
    let idleTimer = 0;

    const FONT = (s) => `900 ${s}px "Archivo Black", "Pretendard", sans-serif`;

    function fitText() {
      ctx.font = FONT(100);
      const m = ctx.measureText(text).width;
      fontSize = Math.min((w * 0.9 * 100) / m, h * 0.62);
      textY = h * 0.52;
    }

    function paintColor() {
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = cctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#2b0a6b");
      g.addColorStop(0.5, "#5b21b6");
      g.addColorStop(1, "#1e0b45");
      cctx.fillStyle = g;
      cctx.fillRect(0, 0, w, h);
      // 은은하게 움직이는 색 덩어리
      const spots = [
        ["#a855f7", 0.2, 0.3], ["#f97316", 0.75, 0.25], ["#ec4899", 0.55, 0.75],
        ["#facc15", 0.85, 0.7], ["#22d3ee", 0.1, 0.8], ["#8b5cf6", 0.45, 0.45],
      ];
      spots.forEach(([c, x, y], i) => {
        const px = (x + Math.sin(t * 0.0004 + i) * 0.08) * w;
        const py = (y + Math.cos(t * 0.0005 + i * 2) * 0.08) * h;
        const r = Math.max(w, h) * 0.32;
        const rg = cctx.createRadialGradient(px, py, 0, px, py, r);
        rg.addColorStop(0, c);
        rg.addColorStop(1, c + "00");
        cctx.globalAlpha = 0.85;
        cctx.fillStyle = rg;
        cctx.fillRect(0, 0, w, h);
      });
      cctx.globalAlpha = 1;
      // 잉크 안에서는 글자가 흰색으로 반전
      cctx.font = FONT(fontSize);
      cctx.textAlign = "center";
      cctx.textBaseline = "middle";
      cctx.fillStyle = "#ffffff";
      cctx.fillText(text, w / 2, textY);
    }

    function resize() {
      const r = wrap.getBoundingClientRect();
      w = r.width; h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      [canvas, color, mask].forEach((c) => {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      });
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fitText();
    }

    function addInk(x, y, speed) {
      const n = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const base = Math.min(w, h) * (0.05 + Math.random() * 0.07) + speed * 0.8;
        blobs.push({
          x: x + (Math.random() - 0.5) * base * 1.6,
          y: y + (Math.random() - 0.5) * base * 1.6,
          r: base * 0.3,
          max: base * (1 + Math.random()),
          seed: Math.random() * 100,
          life: 1,
        });
      }
      // 가끔 튀는 작은 잉크 방울
      if (Math.random() < 0.35) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.min(w, h) * (0.08 + Math.random() * 0.12);
        blobs.push({
          x: x + Math.cos(a) * d, y: y + Math.sin(a) * d,
          r: 2, max: 6 + Math.random() * 14, seed: Math.random() * 100, life: 1,
        });
      }
      if (blobs.length > 600) blobs.splice(0, blobs.length - 600);
    }

    function drawBlob(b) {
      // 가장자리가 울퉁불퉁한 잉크 모양
      const pts = 28;
      const p = [];
      for (let i = 0; i < pts; i++) {
        const a = (i / pts) * Math.PI * 2;
        const wob = 0.8 + 0.2 * Math.sin(a * 3 + b.seed) * Math.cos(a * 5 - b.seed * 0.7);
        p.push([b.x + Math.cos(a) * b.r * wob, b.y + Math.sin(a) * b.r * wob]);
      }
      // 점 사이를 곡선으로 이어 부드러운 잉크 가장자리
      mctx.beginPath();
      const mid = (i) => {
        const a = p[i % pts], c = p[(i + 1) % pts];
        return [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
      };
      const s = mid(0);
      mctx.moveTo(s[0], s[1]);
      for (let i = 1; i <= pts; i++) {
        const c = p[i % pts], m = mid(i);
        mctx.quadraticCurveTo(c[0], c[1], m[0], m[1]);
      }
      mctx.closePath();
      mctx.fill();
    }

    function frame(now) {
      t = now;
      // 자동 시연: 사용자가 움직이지 않으면 가상의 붓이 지나갑니다
      if (!userActive) {
        const ax = w / 2 + Math.sin(now * 0.0009) * w * 0.38;
        const ay = textY + Math.sin(now * 0.0017) * h * 0.22;
        stroke(ax, ay);
      }

      // 마스크를 천천히 지워 잉크가 사라지게
      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = "rgba(0,0,0,0.018)";
      mctx.fillRect(0, 0, w, h);
      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = "#000";
      blobs = blobs.filter((b) => {
        b.r += (b.max - b.r) * 0.08;
        b.life -= 0.02;
        drawBlob(b);
        return b.life > 0;
      });

      // 바탕: 흰 종이 + 검은 글자
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#f7f5f2";
      ctx.fillRect(0, 0, w, h);
      ctx.font = FONT(fontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#0b0a10";
      ctx.fillText(text, w / 2, textY);

      // 잉크 모양대로 색 레이어 합성
      paintColor();
      cctx.setTransform(1, 0, 0, 1, 0, 0);
      cctx.globalCompositeOperation = "destination-in";
      cctx.drawImage(mask, 0, 0);
      cctx.globalCompositeOperation = "source-over";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(color, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      raf = requestAnimationFrame(frame);
    }

    function stroke(x, y) {
      if (last) {
        const dx = x - last.x, dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.floor(dist / 14));
        for (let i = 1; i <= steps; i++) {
          addInk(last.x + (dx * i) / steps, last.y + (dy * i) / steps, Math.min(dist, 60) / steps);
        }
      } else addInk(x, y, 0);
      last = { x, y };
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      if (!userActive) last = null;
      userActive = true;
      stroke(e.clientX - r.left, e.clientY - r.top);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { userActive = false; last = null; }, 2500);
    }
    function onLeave() { last = null; }

    resize();
    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(wrap);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const start = () => {
      fitText();
      if (reduceMotion) {
        // 움직임 최소화 설정: 정지 화면만 그림
        frameStatic();
      } else raf = requestAnimationFrame(frame);
    };
    function frameStatic() {
      ctx.fillStyle = "#f7f5f2";
      ctx.fillRect(0, 0, w, h);
      ctx.font = FONT(fontSize);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#0b0a10";
      ctx.fillText(text, w / 2, textY);
    }
    document.fonts.load(FONT(100)).then(start, start);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return (
    <div ref={wrapRef} className="ink-wrap">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
