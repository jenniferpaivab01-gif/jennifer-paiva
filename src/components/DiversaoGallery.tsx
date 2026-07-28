"use client";

import Image from "next/image";
import { useState } from "react";
import {
  diversaoCountries,
  diversaoPhotos,
  type DiversaoCountry,
  type DiversaoPhoto,
  type DiversaoTab,
} from "@/data/diversao";
import { useTranslations } from "@/i18n/LocaleProvider";

const aspectClass: Record<DiversaoPhoto["aspect"], string> = {
  "401/602": "aspect-[401/602]",
  "401/267": "aspect-[401/267]",
  "401/713": "aspect-[401/713]",
};

function PhotoCard({
  photo,
  index,
  alt,
}: {
  photo: DiversaoPhoto;
  index: number;
  alt: string;
}) {
  return (
    <div
      className={`diversao-photo relative w-full overflow-hidden rounded-xl ${aspectClass[photo.aspect]}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Image
        src={photo.src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 30vw, 401px"
      />
    </div>
  );
}

export function DiversaoGallery() {
  const t = useTranslations();
  const [tab, setTab] = useState<DiversaoTab>("viagem");
  const [country, setCountry] = useState<DiversaoCountry>("ch");

  const photos = diversaoPhotos.filter((photo) => {
    if (photo.tab !== tab) return false;
    if (tab === "comida") return true;
    return photo.country === country;
  });
  const copy =
    tab === "comida" ? t.diversao.copy.ch : t.diversao.copy[country];

  const columns: DiversaoPhoto[][] = [[], [], []];
  for (const photo of photos) {
    columns[photo.column].push(photo);
  }

  const tabs = [
    { id: "viagem" as const, label: t.diversao.tabTravel },
    { id: "comida" as const, label: t.diversao.tabFood },
  ];

  return (
    <section className="diversao-enter px-6 pb-8 pt-36 md:px-8 md:pt-40">
      <div className="grid gap-10 lg:grid-cols-[minmax(280px,34%)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-12">
        <div className="max-w-[586px] lg:sticky lg:top-36">
          <h1 className="text-[clamp(2.75rem,6vw,4.8rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#212529]">
            {t.diversao.title}
          </h1>
          <p className="mt-4 text-lg font-semibold leading-[1.7] text-black/40">
            {copy.intro}
          </p>
        </div>

        <div className="relative min-w-0">
          <div className="flex items-end justify-between gap-4 border-b border-black/12">
            <div
              className="flex gap-8"
              role="tablist"
              aria-label={t.diversao.categoriesAria}
            >
              {tabs.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(item.id)}
                    className={`relative pb-3 text-lg font-bold transition-colors ${
                      active
                        ? "text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black"
                        : "text-[#777] hover:text-black/70"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <Image
              src="/assets/diversao/cat.png"
              alt=""
              width={62}
              height={75}
              className="mb-[-4px] hidden shrink-0 sm:block"
              style={{ width: 62, height: 75 }}
            />
          </div>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-[595px] text-lg font-semibold leading-[1.7] text-black/40">
              {copy.detail}
            </p>

            {tab === "viagem" ? (
              <div
                className="flex shrink-0 gap-3 sm:gap-4"
                role="group"
                aria-label={t.diversao.countryAria}
              >
                {diversaoCountries.map((item) => {
                  const selected = country === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCountry(item.id)}
                      aria-pressed={selected}
                      aria-label={t.diversao.countries[item.id]}
                      className={`diversao-flag flex size-10 items-center justify-center rounded-full ${
                        selected
                          ? "bg-black/15 ring-2 ring-black/25 ring-offset-2 ring-offset-[var(--bg)]"
                          : "bg-black/[0.04] hover:bg-black/10"
                      }`}
                    >
                      <Image
                        src={item.flagSrc}
                        alt=""
                        width={22}
                        height={22}
                        unoptimized
                        className="pointer-events-none size-[22px]"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="mt-10 md:mt-14">
            {photos.length === 0 ? (
              <p className="py-24 text-center text-lg font-semibold text-black/40">
                {t.diversao.empty}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {columns.map((columnPhotos, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-3">
                    {columnPhotos.map((photo, index) => (
                      <PhotoCard
                        key={photo.id}
                        photo={photo}
                        alt={t.diversao.photos[photo.id]}
                        index={colIndex * 4 + index}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
