import type { CSSProperties } from "react";
import Image from "next/image";

type StickerProps = {
  label: string;
  icon: string;
  iconSize: number;
  bg: string;
  border: string;
  insetShadow: string;
  gradientFrom: string;
  gradientTo: string;
  rotate: number;
  className?: string;
  textClassName?: string;
  style?: CSSProperties;
};

export function Sticker({
  label,
  icon,
  iconSize,
  bg,
  border,
  insetShadow,
  gradientFrom,
  gradientTo,
  rotate,
  className = "",
  textClassName = "",
  style,
}: StickerProps) {
  return (
    <div
      className={`sticker pointer-events-none absolute select-none ${className}`}
      style={{
        ["--sticker-rot" as string]: `${rotate}deg`,
        ...style,
      }}
      aria-hidden
    >
      <div
        className="relative flex items-center gap-3 overflow-hidden rounded-[22px] border-b px-5 py-3.5 md:px-6 md:py-4"
        style={
          {
            backgroundColor: bg,
            borderColor: border,
            boxShadow: `inset 0 6px 6px 0 ${insetShadow}, 0 10px 24px rgba(0,0,0,0.1)`,
          } as CSSProperties
        }
      >
        <Image
          src={icon}
          alt=""
          width={iconSize}
          height={iconSize}
          className="shrink-0"
          style={{ width: iconSize, height: iconSize }}
        />
        <span
          className={`bg-clip-text font-[family-name:var(--font-inter)] font-semibold text-transparent ${textClassName}`}
          style={{
            backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
