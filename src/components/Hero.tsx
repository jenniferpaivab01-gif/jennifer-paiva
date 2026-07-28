"use client";

import { StickerStack } from "./StickerStack";
import { useTranslations } from "@/i18n/LocaleProvider";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="hero-enter relative px-6 pb-16 pt-36 md:px-8 md:pb-24 md:pt-40">
      <p className="mb-6 max-w-xl font-[family-name:var(--font-inter)] text-[clamp(1.1rem,2vw,1.825rem)] leading-tight text-[#212529] md:mb-8">
        {t.hero.greeting}
      </p>

      <div className="relative w-fit max-w-full pb-24 pr-[min(12rem,22vw)] md:pb-28 md:pr-[min(16rem,26vw)]">
        <div className="relative">
          <h1 className="whitespace-pre-line font-extrabold text-[clamp(2.5rem,6.2vw,5.84rem)] leading-[1.08] tracking-[-0.02em] text-[#212529]">
            {t.hero.headline}
          </h1>
          <StickerStack />
        </div>
      </div>

      <div className="mt-16 grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 md:mt-20 lg:max-w-5xl lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-2xl font-bold leading-9 text-[#212529]">
            {t.hero.currently}
          </p>
          <p className="mt-1 text-2xl font-semibold leading-[1.6] text-black/40">
            {t.hero.currentlyRole}
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold leading-9 text-[#212529]">
            {t.hero.previously}
          </p>
          {t.hero.previouslyRole ? (
            <p className="mt-1 text-2xl font-semibold leading-[1.6] text-black/40">
              {t.hero.previouslyRole}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
