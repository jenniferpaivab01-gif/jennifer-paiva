"use client";

import Image from "next/image";
import { StickerStack } from "./StickerStack";
import { useTranslations } from "@/i18n/LocaleProvider";

export function Hero() {
  const t = useTranslations();

  return (
    <section className="hero-enter relative px-6 pb-16 pt-36 md:px-8 md:pb-24 md:pt-40">
      <div className="hero-split flex flex-col gap-10 sm:flex-row sm:items-stretch sm:gap-0">
        {/* Left: greeting + headline + stickers */}
        <div className="min-w-0 flex-1 sm:pr-10 lg:pr-14">
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
        </div>

        {/* Right: photo + prazer + bio */}
        <aside
          className="flex w-full shrink-0 flex-col gap-5 sm:pl-10 lg:pl-14"
          style={{ maxWidth: 384, alignSelf: "center", transform: "translateY(-3.5rem)" }}
        >
          <div
            className="relative shrink-0 overflow-hidden rounded-full"
            style={{ width: 72, height: 72 }}
          >
            <Image
              src="/assets/hero/intro-portrait.jpg"
              alt={t.hero.introPortraitAlt}
              width={72}
              height={72}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>

          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold leading-tight text-[#212529]">
            {t.hero.introTitle}
          </h2>

          <p className="text-base font-medium leading-[1.7] text-black/40 md:text-lg md:leading-[1.7]">
            {t.hero.introBody}
          </p>

          <a
            href="https://www.linkedin.com/in/jennifer-paiva-98aa66278/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ width: 28, height: 28 }}
            aria-label={t.hero.introLinkedinAria}
          >
            <Image
              src="/assets/sobre/icon-linkedin.svg"
              alt=""
              width={28}
              height={28}
              style={{ width: 28, height: 28 }}
            />
          </a>
        </aside>
      </div>
    </section>
  );
}
