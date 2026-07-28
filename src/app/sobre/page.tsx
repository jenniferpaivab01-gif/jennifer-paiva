import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SobreContent } from "@/components/SobreContent";

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Header />
      <main className="mx-auto w-full max-w-[1920px]">
        <SobreContent />
      </main>
      <Footer />
    </div>
  );
}
