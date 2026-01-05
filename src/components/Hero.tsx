import Image from "next/image";
import { SiteSettings } from "@/sanity/types";
import { getImageUrl } from "@/sanity/lib";

interface HeroProps {
  siteSettings?: SiteSettings | null;
}

export default function Hero({ siteSettings }: HeroProps) {
  const title = siteSettings?.heroTitle || "רגעים שנשארים לנצח";
  const subtitle = siteSettings?.heroSubtitle || "צילום מקצועי שמנציח את הרגעים היפים בחייכם\nבסגנון טבעי, אותנטי ומלא רגש";
  const heroImageUrl = siteSettings?.heroImage ? getImageUrl(siteSettings.heroImage, 1920, 1080) : null;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="NetArt Photography"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-accent/30 flex items-center justify-center">
            <span className="text-muted/50 text-lg">תמונת רקע ראשית</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 font-light opacity-90 max-w-2xl mx-auto whitespace-pre-line">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="btn-primary text-lg"
          >
            הזמינו צילום
          </a>
          <a
            href="#services"
            className="btn-secondary border-white text-white hover:bg-white hover:text-foreground text-lg"
          >
            לשירותים שלנו
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#services" className="text-white/70 hover:text-white transition-colors">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
