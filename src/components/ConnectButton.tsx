"use client";

import { Caveat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/i18n/LocaleProvider";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
});

function ConnectScribbles({ playing }: { playing: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const scale = 0.5;
    let alive = true;

    const paint = () => {
      if (!alive) return;

      if (video.readyState >= 2 && video.videoWidth > 0) {
        const w = Math.max(1, Math.round(video.videoWidth * scale));
        const h = Math.max(1, Math.round(video.videoHeight * scale));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }

        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const pixels = frame.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
          // White plate → fully transparent; ink → black with alpha from darkness
          const alpha = lum >= 248 ? 0 : Math.min(255, Math.round((255 - lum) * 1.45));
          pixels[i] = 0;
          pixels[i + 1] = 0;
          pixels[i + 2] = 0;
          pixels[i + 3] = alpha;
        }

        ctx.putImageData(frame, 0, 0);
      }

      if (!video.paused && !video.ended) {
        rafRef.current = requestAnimationFrame(paint);
      }
    };

    if (playing) {
      video.currentTime = 0;
      void video.play().then(() => {
        if (!alive) return;
        rafRef.current = requestAnimationFrame(paint);
      });
    } else {
      cancelAnimationFrame(rafRef.current);
      video.pause();
      video.currentTime = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const onEnded = () => cancelAnimationFrame(rafRef.current);
    video.addEventListener("ended", onEnded);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("ended", onEnded);
    };
  }, [playing]);

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        muted
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
      >
        <source src="/assets/connect-scribbles.webm" type="video/webm" />
      </video>
      <canvas
        ref={canvasRef}
        className="connect-btn__scribbles"
        aria-hidden
      />
    </>
  );
}

export function ConnectButton() {
  const [scribblesOn, setScribblesOn] = useState(false);
  const t = useTranslations();
  const [hintLine1, hintLine2] = t.connect.hint.split("\n");

  return (
    <section
      className="connect-enter flex flex-col items-center px-6 pb-24 pt-8 md:px-8 md:pb-32 md:pt-12"
      aria-label={t.connect.sectionAria}
    >
      <p
        className={`${caveat.className} -rotate-5 mb-10 max-w-xs text-center text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-black/40 md:mb-12`}
      >
        {hintLine1}
        <br />
        {hintLine2}
      </p>

      <a
        href="mailto:jenniferpaivab01@gmail.com"
        className={`connect-btn group relative inline-flex rotate-4 select-none items-center justify-center rounded-full${scribblesOn ? " is-scribbling" : ""}`}
        aria-label={t.connect.aria}
        onMouseEnter={() => setScribblesOn(true)}
        onMouseLeave={() => setScribblesOn(false)}
        onFocus={() => setScribblesOn(true)}
        onBlur={() => setScribblesOn(false)}
      >
        <ConnectScribbles playing={scribblesOn} />

        {/* Silver outer bezel */}
        <span
          aria-hidden
          className="connect-btn__bezel absolute inset-0 rounded-full bg-gradient-to-b from-[#e6e6e6] to-[#a6a6a6] shadow-[inset_0px_-7px_3px_0px_#cfcfcf,inset_0px_-8px_1px_0px_white,0px_6px_6px_0px_#b8b8b8]"
        />

        {/* Black / glowing face */}
        <span className="connect-btn__face relative m-[10px_22px_32px_22px] flex items-center justify-center overflow-hidden rounded-[110px] bg-black px-[clamp(2.5rem,6vw,5.5rem)] py-[clamp(1.25rem,3vw,2.25rem)]">
          <span
            aria-hidden
            className="connect-btn__yellow absolute inset-0 rounded-[inherit] bg-[#ffed79]"
          />
          <span
            aria-hidden
            className="connect-btn__shade absolute inset-0 rounded-[inherit] bg-[#1f1f1f]"
          />
          <span
            aria-hidden
            className="connect-btn__sheen absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[#424242] to-[#2b2b2b] shadow-[inset_0px_-3px_1px_0px_rgba(255,255,255,0.1),inset_0px_12px_6px_0px_rgba(0,0,0,0.1)]"
          />
          <span aria-hidden className="connect-btn__blob connect-btn__blob--a" />
          <span aria-hidden className="connect-btn__blob connect-btn__blob--b" />

          <span className="connect-btn__label relative bg-gradient-to-t from-white/80 to-white bg-clip-text font-[family-name:var(--font-inter)] text-[clamp(3rem,10vw,8rem)] font-medium leading-none tracking-[-0.02em] text-transparent">
            {t.connect.label}
          </span>
        </span>
      </a>
    </section>
  );
}
