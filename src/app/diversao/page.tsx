import { DiversaoGallery } from "@/components/DiversaoGallery";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function DiversaoPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Header />
      <main className="mx-auto w-full max-w-[1920px]">
        <DiversaoGallery />
      </main>
      <Footer />
    </div>
  );
}
