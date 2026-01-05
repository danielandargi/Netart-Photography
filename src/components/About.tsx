import Image from "next/image";
import { SiteSettings } from "@/sanity/types";
import { getImageUrl } from "@/sanity/lib";

interface AboutProps {
  siteSettings?: SiteSettings | null;
}

export default function About({ siteSettings }: AboutProps) {
  const title = siteSettings?.aboutTitle || "נעים להכיר";
  const aboutImageUrl = siteSettings?.aboutImage ? getImageUrl(siteSettings.aboutImage, 800, 1000) : null;
  
  const defaultText = `שלום, אני נטע, הצלמת מאחורי NetArt.

אני מאמינה שצילום הוא הרבה יותר מלחיצה על כפתור. 
זהו רגע של חיבור, של אמון, ושל יצירת זיכרון שילווה אתכם לנצח.

המומחיות שלי היא ביצירת תמונות טבעיות ואותנטיות, 
שמספרות את הסיפור שלכם בדרך הכי יפה שיש. 
בין אם זה צילומי הריון, משפחה, אירועים או כל רגע מיוחד אחר - 
אני כאן כדי להנציח אותו.

בואו ניצור יחד זיכרונות מדהימים.`;

  const aboutText = siteSettings?.aboutText || defaultText;

  return (
    <section id="about" className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              {aboutImageUrl ? (
                <Image
                  src={aboutImageUrl}
                  alt="הצלמת"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary via-primary/20 to-accent/30 flex items-center justify-center">
                  <span className="text-muted/50 text-lg">תמונת הצלמת</span>
                </div>
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="section-heading">{title}</h2>
            <div className="space-y-4 text-muted text-lg leading-relaxed">
              {aboutText.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index}>{paragraph.trim()}</p>
                )
              ))}
            </div>
            <div className="mt-8">
              <a href="#contact" className="btn-primary">
                בואו נדבר
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
