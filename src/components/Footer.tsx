"use client";

import Image from "next/image";
import { useTranslations } from "@/i18n/LocaleProvider";

export function Footer() {
  const t = useTranslations();

  const socials = [
    {
      href: "mailto:jenniferpaivab01@gmail.com",
      src: "/assets/footer/gmail.svg",
      alt: t.footer.gmail,
      rotate: 0,
    },
    {
      href: "https://instagram.com",
      src: "/assets/footer/instagram.svg",
      alt: t.footer.instagram,
      rotate: -6,
    },
    {
      href: "https://behance.net",
      src: "/assets/footer/behance.svg",
      alt: t.footer.behance,
      rotate: 0,
    },
    {
      href: "https://linkedin.com",
      src: "/assets/footer/linkedin.svg",
      alt: t.footer.linkedin,
      rotate: 3.5,
    },
  ] as const;

  return (
    <footer className="mx-6 mb-8 mt-24 md:mx-8 md:mb-12 md:mt-32">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-[#252525] px-6 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-5">
        <a
          href="mailto:jenniferpaivab01@gmail.com"
          className="flex items-center gap-3 text-[#e7e7e7] transition-opacity hover:opacity-80"
        >
          <Image
            src="/assets/diversao/icon-plane.svg"
            alt=""
            width={31}
            height={31}
            style={{ width: 31, height: 31 }}
          />
          <span className="font-[family-name:var(--font-inter)] text-lg font-medium tracking-tight sm:text-[22.8px]">
            jenniferpaivab01@gmail.com
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {socials.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                social.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex size-12 shrink-0 items-center justify-center transition-transform hover:scale-105 sm:size-14"
              aria-label={social.alt}
            >
              <Image
                src={social.src}
                alt=""
                width={56}
                height={56}
                unoptimized
                className="size-12 sm:size-14"
                style={{ transform: `rotate(${social.rotate}deg)` }}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
