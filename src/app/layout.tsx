import type { Metadata } from "next";
import { Inter, Manrope, MuseoModerno } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { dictionaries, defaultLocale } from "@/i18n";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const museo = MuseoModerno({
  variable: "--font-museo",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const defaultCopy = dictionaries[defaultLocale].meta;

export const metadata: Metadata = {
  title: defaultCopy.title,
  description: defaultCopy.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${inter.variable} ${museo.variable} h-full antialiased`}
    >
      <body className="min-h-full font-[family-name:var(--font-manrope)]">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
