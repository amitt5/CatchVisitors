import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export function ProductStubPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-32 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#02524b]/60 hover:text-[#02524b] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <h1
          className="text-4xl md:text-5xl font-normal text-[#02524b] mb-4"
          style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          {title}
        </h1>
        <p className="text-lg text-[#02524b]/70 max-w-xl mx-auto">{description}</p>
        <p className="text-sm text-[#02524b]/40 mt-10">Page content coming soon.</p>
      </main>
      <Footer />
    </div>
  );
}
