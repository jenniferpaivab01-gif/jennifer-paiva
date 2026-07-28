"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "@/i18n/LocaleProvider";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/case/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const { locale, setLocale } = useLocale();

  const navItems = [
    { label: t.nav.work, href: "/" },
    { label: t.nav.fun, href: "/diversao" },
    { label: t.nav.about, href: "/sobre" },
    { label: t.nav.resume, href: "/#resumo" },
  ] as const;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="nav-frost pointer-events-none absolute inset-x-0 top-0 h-28" />
      <div className="pointer-events-auto relative mx-auto flex h-[112px] max-w-[1920px] items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black"
          aria-label={t.nav.homeAria}
        >
          <span
            className="font-[family-name:var(--font-museo)] text-2xl font-medium leading-none text-[#f1f1ee]"
            style={{ letterSpacing: "-0.02em" }}
          >
            jp
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-10 lg:gap-[43px]">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return active ? (
              <Link
                key={item.href}
                href={item.href}
                className="flex h-[43px] items-center rounded-full bg-[rgba(200,200,200,0.63)] px-4 text-lg font-bold text-black transition-colors hover:bg-[rgba(180,180,180,0.75)]"
                aria-current="page"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hidden text-lg font-bold text-[#898989] transition-colors hover:text-black sm:inline"
              >
                {item.label}
              </Link>
            );
          })}

          <div
            className="relative flex h-[30px] w-[79px] overflow-hidden rounded-2xl bg-[#d7d7d6]"
            role="group"
            aria-label={t.nav.languageAria}
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`absolute left-0 top-0 flex h-full w-10 items-center justify-center text-base transition-colors ${
                locale === "en"
                  ? "rounded-2xl bg-black text-white"
                  : "text-black"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("pt")}
              className={`absolute right-0 top-0 flex h-full w-[39px] items-center justify-center text-base transition-colors ${
                locale === "pt"
                  ? "rounded-2xl bg-black text-white"
                  : "text-black"
              }`}
              aria-pressed={locale === "pt"}
            >
              PT
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
