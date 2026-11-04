import { HeroSection } from "@/features/home/hero-section";
import { LearningPaths } from "@/features/home/learning-paths";
import { FeaturedHadith } from "@/features/home/featured-hadith";
import { MethodologySection } from "@/features/home/methodology-section";
import { PlatformFeatures } from "@/features/home/platform-features";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Main Learning Paths (Wudu & Salah Cards) */}
      <LearningPaths />

      {/* 3. Featured Verified Prophetic Hadith */}
      <FeaturedHadith />

      {/* 4. Learning Methodology & Visual Guidance */}
      <MethodologySection />

      {/* 5. Platform Features & Why Us */}
      <PlatformFeatures />
    </main>
  );
}
