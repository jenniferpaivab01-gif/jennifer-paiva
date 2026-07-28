"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Sticker } from "./Sticker";
import { useTranslations } from "@/i18n/LocaleProvider";

type CardKind =
  | "agile"
  | "interview"
  | "research"
  | "prototype"
  | "usability";

type DeckCard = {
  id: string;
  kind: CardKind;
  rotate: number;
};

const DECK: DeckCard[] = [
  { id: "agile", kind: "agile", rotate: -11.5 },
  { id: "interview", kind: "interview", rotate: 9.8 },
  { id: "research", kind: "research", rotate: -4.2 },
  { id: "prototype", kind: "prototype", rotate: 7.6 },
  { id: "usability", kind: "usability", rotate: -8.4 },
];

const LEAP_MS = 980;
const REST_MS = 1600;
const FAN_X = 11;
const FAN_Y = 5;

function stackOffset(pos: number, total: number) {
  return {
    x: pos * FAN_X - (total - 1) * (FAN_X / 2),
    y: pos * FAN_Y,
  };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export function StickerStack() {
  const t = useTranslations();
  const reduced = usePrefersReducedMotion();
  const [order, setOrder] = useState(() => DECK.map((_, i) => i));
  const [leapingId, setLeapingId] = useState<string | null>(null);
  const orderRef = useRef(order);
  orderRef.current = order;

  useEffect(() => {
    if (reduced) return;

    let leapTimer: ReturnType<typeof setTimeout> | undefined;
    let loopTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    function runCycle() {
      if (cancelled) return;

      const current = orderRef.current;
      const fromBack = current[0];
      const card = DECK[fromBack];
      setLeapingId(card.id);

      leapTimer = setTimeout(() => {
        if (cancelled) return;
        // Commit new order first so resting coords match the leap landing spot
        setOrder((prev) => [...prev.slice(1), prev[0]]);
        requestAnimationFrame(() => {
          if (cancelled) return;
          setLeapingId(null);
          loopTimer = setTimeout(runCycle, REST_MS);
        });
      }, LEAP_MS);
    }

    loopTimer = setTimeout(runCycle, REST_MS);

    return () => {
      cancelled = true;
      if (leapTimer) clearTimeout(leapTimer);
      if (loopTimer) clearTimeout(loopTimer);
    };
  }, [reduced]);

  const styles = {
    agile: {
      label: t.hero.stickerAgile,
      icon: "/assets/icon-globe.svg",
      iconSize: 40,
      bg: "#effe97",
      border: "#98b52f",
      insetShadow: "#d5e579",
      gradientFrom: "#98b52f",
      gradientTo: "#424f15",
      textClassName: "text-[clamp(1.1rem,1.9vw,2.2rem)] whitespace-nowrap",
    },
    interview: {
      label: t.hero.stickerInterview,
      icon: "/assets/icon-camera.svg",
      iconSize: 34,
      bg: "#ceeafc",
      border: "#9fcbff",
      insetShadow: "#cae6ff",
      gradientFrom: "#579ae9",
      gradientTo: "#315783",
      textClassName: "text-[clamp(1.1rem,1.9vw,2.2rem)] whitespace-nowrap",
    },
    research: {
      label: t.hero.stickerResearch,
      icon: "/assets/icon-search.svg",
      iconSize: 36,
      bg: "#ffe4d4",
      border: "#e8a078",
      insetShadow: "#ffd0b5",
      gradientFrom: "#e07a45",
      gradientTo: "#7a3d1f",
      textClassName: "text-[clamp(1.1rem,1.9vw,2.2rem)] whitespace-nowrap",
    },
    prototype: {
      label: t.hero.stickerPrototype,
      icon: "/assets/icon-prototype.svg",
      iconSize: 36,
      bg: "#e8e0ff",
      border: "#b8a6e8",
      insetShadow: "#d9cff9",
      gradientFrom: "#8b6bc9",
      gradientTo: "#4a3578",
      textClassName: "text-[clamp(1.1rem,1.9vw,2.2rem)] whitespace-nowrap",
    },
    usability: {
      label: t.hero.stickerUsability,
      icon: "/assets/icon-layers.svg",
      iconSize: 36,
      bg: "#d4f5e9",
      border: "#7ec8a4",
      insetShadow: "#b8ebd5",
      gradientFrom: "#3ba67a",
      gradientTo: "#1f5c42",
      textClassName: "text-[clamp(1.1rem,1.9vw,2.2rem)] whitespace-nowrap",
    },
  } as const;

  const total = order.length;
  const front = stackOffset(total - 1, total);
  const back = stackOffset(0, total);

  return (
    <div
      className="sticker-stack absolute left-[72%] top-[85%] hidden h-[10.5rem] w-[min(24rem,38vw)] md:block lg:left-[74%] lg:top-[86%]"
      aria-hidden
    >
      {order.map((deckIndex, stackPos) => {
        const card = DECK[deckIndex];
        const props = styles[card.kind];
        const isLeaping = leapingId === card.id;
        const slot = stackOffset(stackPos, total);

        return (
          <Sticker
            key={card.id}
            {...props}
            rotate={card.rotate}
            className={`sticker-deck-card left-[4%] top-[14%] ${isLeaping ? "is-leaping" : ""}`}
            style={
              {
                zIndex: isLeaping ? total + 10 : stackPos + 1,
                ["--sticker-rot" as string]: `${card.rotate}deg`,
                ["--stack-x" as string]: `${slot.x}px`,
                ["--stack-y" as string]: `${slot.y}px`,
                ["--from-x" as string]: `${back.x}px`,
                ["--from-y" as string]: `${back.y}px`,
                ["--to-x" as string]: `${front.x}px`,
                ["--to-y" as string]: `${front.y}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
