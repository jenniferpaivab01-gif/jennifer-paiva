"use client";

import Image from "next/image";
import { useTranslations } from "@/i18n/LocaleProvider";

export function SobreContent() {
  const t = useTranslations();
  const { sobre } = t;

  const powers = [
    sobre.powers.designAi,
    sobre.powers.synthesize,
    sobre.powers.speed,
    sobre.powers.designDev,
  ] as const;

  const experience = [
    sobre.experience.s1nc,
    sobre.experience.vulp,
    sobre.experience.freelance,
  ];

  const education = [
    sobre.education.bachelor,
    sobre.education.mentorship,
  ] as const;

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/jennifer-paiva-98aa66278/",
      src: "/assets/sobre/icon-linkedin.svg",
      label: sobre.socialLinkedin,
    },
  ] as const;

  return (
    <div className="sobre-enter mx-auto w-full max-w-[1920px] px-8 pb-8 pt-36 sm:px-12 md:px-20 lg:px-32 xl:px-48 2xl:px-72 md:pt-40">
      {/* Hero */}
      <section className="grid items-start gap-10 lg:grid-cols-[401px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <div className="relative mx-auto aspect-[401/687] w-full max-w-[401px] overflow-hidden rounded-xl lg:mx-0">
          <Image
            src="/assets/sobre/portrait.jpg"
            alt={sobre.portraitAlt}
            fill
            className="object-cover object-[center_20%]"
            sizes="401px"
            priority
          />
        </div>

        <div className="min-w-0">
          <h1 className="font-[family-name:var(--font-inter)] text-[clamp(3rem,6.5vw,5.3rem)] font-bold leading-[1.05] text-[#212529]">
            {sobre.hello}
          </h1>
          <p className="mt-1 font-[family-name:var(--font-inter)] text-[clamp(2.5rem,5.5vw,5.3rem)] font-bold leading-[1.05] text-[#999]">
            {sobre.imJennifer}
          </p>
          <p className="mt-3 text-xl font-semibold text-black/40 md:text-2xl">
            {sobre.phonetic}
          </p>
          <p className="mt-8 max-w-[52rem] text-lg font-semibold leading-[1.7] text-black/40 md:text-2xl md:leading-[1.7]">
            {sobre.bio}
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-extrabold text-black">
                {sobre.dailyWorkTitle}
              </h2>
              <p className="mt-4 text-lg font-semibold leading-[1.7] text-black/40">
                <span className="font-bold text-black">
                  {sobre.dailyWorkRole}
                </span>{" "}
                {sobre.dailyWorkBody}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-black">
                {sobre.outsideTitle}
              </h2>
              <p className="mt-4 text-lg font-semibold leading-[1.7] text-black/40">
                {sobre.outsideBody}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="flex size-12 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                aria-label={link.label}
              >
                <Image
                  src={link.src}
                  alt=""
                  width={48}
                  height={48}
                  style={{ width: 48, height: 48 }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="my-16 md:my-20 lg:ml-[calc(401px+3rem)]">
        <hr className="border-black/12" />
      </div>

      {/* Super poderes — notebook bleeds to the left viewport edge */}
      <section>
        <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none text-black">
          {sobre.powersTitle}
        </h2>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <div className="relative -ml-8 w-[calc(100%+2rem)] overflow-hidden sm:-ml-12 sm:w-[calc(100%+3rem)] md:-ml-20 md:w-[calc(100%+5rem)] lg:-ml-32 lg:w-[calc(100%+8rem)] xl:-ml-48 xl:w-[calc(100%+12rem)] 2xl:-ml-72 2xl:w-[calc(100%+18rem)] min-[1920px]:-ml-[calc(18rem+(100vw-1920px)/2)] min-[1920px]:w-[calc(100%+18rem+(100vw-1920px)/2)]">
            <Image
              src="/assets/sobre/notebook.png"
              alt={sobre.notebookAlt}
              width={961}
              height={871}
              className="h-auto w-full max-w-full"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          </div>

          <div className="flex flex-col gap-10 lg:pt-6">
            {powers.map((power) => (
              <div key={power.title}>
                <h3 className="text-lg font-extrabold text-black">
                  {power.title}
                </h3>
                <p className="mt-3 max-w-xl text-lg font-semibold leading-[1.7] text-black/40">
                  {power.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência */}
      <section className="mt-24 md:mt-32">
        <div className="grid gap-8 lg:grid-cols-[401px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none text-black">
            {sobre.experienceTitle}
          </h2>
          <div className="border-t border-black/12 pt-10">
            <ul className="flex flex-col gap-12">
              {experience.map((item) => (
                <li
                  key={`${item.period}-${item.company}`}
                  className="grid gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8"
                >
                  <p className="text-lg font-extrabold text-black">
                    {item.period}
                  </p>
                  <div>
                    <p className="text-lg font-extrabold text-black">
                      {item.company}
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-black/40">
                      {item.role}
                    </p>
                    {item.detail ? (
                      <p className="mt-1 text-lg font-semibold text-black/40">
                        {item.detail}
                      </p>
                    ) : null}
                    {item.body ? (
                      <p className="mt-3 max-w-2xl text-lg font-semibold leading-[1.7] text-black/40">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Educação */}
      <section className="mt-24 md:mt-32">
        <div className="grid gap-8 lg:grid-cols-[401px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-none text-black">
            {sobre.educationTitle}
          </h2>
          <div className="border-t border-black/12 pt-10">
            <ul className="flex flex-col gap-12">
              {education.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8"
                >
                  <p className="text-lg font-extrabold text-black">
                    {item.period}
                  </p>
                  <div>
                    <p className="text-lg font-extrabold text-black">
                      {item.title}
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-black/40">
                      {item.place}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-black/40">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
