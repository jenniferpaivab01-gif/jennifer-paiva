"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { useTranslations } from "@/i18n/LocaleProvider";

export default function Home() {
  const t = useTranslations();

  return (
    <div id="top" className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Header />
      <main className="mx-auto w-full max-w-[1920px]">
        <Hero />
        <section
          id="trabalho"
          className="grid grid-cols-1 gap-x-8 gap-y-14 px-6 pb-8 md:grid-cols-2 md:gap-y-16 md:px-8 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-[72px] lg:pb-12"
          aria-label={t.home.workAria}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
        <ConnectButton />
      </main>
      <Footer />
    </div>
  );
}
