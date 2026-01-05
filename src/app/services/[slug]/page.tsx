import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServiceGallery from "@/components/ServiceGallery";
import { services, contactInfo } from "@/lib/utils";
import { getServiceBySlug, getServices, getImageUrl, getAllServiceSlugs, getSiteSettings } from "@/sanity/lib";

// Static fallback data for services
const staticServiceData: Record<string, {
  title: string;
  description: string;
  fullDescription: string;
}> = {
  pregnancy: {
    title: "צילומי הריון",
    description: "תיעוד רגעי ההריון המיוחדים שלך באווירה אינטימית וחמה",
    fullDescription: `צילומי הריון הם הזדמנות מושלמת להנציח את אחד השלבים המרגשים ביותר בחיים. 
      אני מאמינה שכל אישה בהריון היא יפה באופן מיוחד, ומטרתי היא לתפוס את היופי הזה בתמונות שתאהבו לנצח.
      הצילומים מתבצעים בטבע או בסטודיו, בהתאם להעדפתכם. אני דואגת לאווירה רגועה ונעימה שתאפשר לכם להיות עצמכם לחלוטין.`,
  },
  family: {
    title: "צילומי משפחה",
    description: "צילומי משפחה בסגנון טבעי ואותנטי, בטבע או בסטודיו",
    fullDescription: `המשפחה היא הדבר הכי חשוב שיש, וצילומי משפחה הם הזדמנות להנציח את הרגעים היפים יחד.
      אני מתמחה בצילומים טבעיים שמציגים את הקשר האמיתי בין בני המשפחה - את החיבוקים, הצחוקים, והמבטים האוהבים.
      הצילומים יכולים להתבצע בחוץ, בטבע, או אצלכם בבית - המקום שבו אתם מרגישים הכי נוח.`,
  },
  events: {
    title: "צילומי אירועים",
    description: "תיעוד מקצועי של האירועים החשובים בחייכם",
    fullDescription: `כל אירוע הוא סיפור מיוחד שמחכה שיספרו אותו. אני כאן כדי לתעד את הרגעים המרגשים, 
      המצחיקים והבלתי נשכחים שלכם.
      מימי הולדת ועד חגיגות משפחתיות, אני דואגת לתפוס את כל הרגעים הקטנים שעושים את האירוע לבלתי נשכח.`,
  },
  "bar-mitzvah": {
    title: "צילומי בוק בר/בת מצווה",
    description: "בוק מקצועי ומרגש לציון הרגע הגדול",
    fullDescription: `בר/בת מצווה הוא אירוע משמעותי בחיי כל נער ונערה. 
      בוק מקצועי הוא הזדמנות להנציח את התקופה הזו בתמונות מרהיבות.
      אני עובדת עם הנערים והנערות ביצירת חוויה מהנה ומעצימה, שתוצאותיה הם תמונות שישארו איתכם לתמיד.`,
  },
  business: {
    title: "צילומי תדמית לעסק",
    description: "תדמית מקצועית שתשדרג את העסק שלך",
    fullDescription: `בעולם העסקים של היום, תדמית מקצועית היא הכרחית. 
      צילומי תדמית איכותיים יכולים להעלות את העסק שלכם לרמה הבאה.
      אני מציעה צילומים לאתרי אינטרנט, רשתות חברתיות, חומרים שיווקיים ועוד. 
      יחד ניצור תמונות שמשדרות מקצועיות ואמינות.`,
  },
  proposal: {
    title: "הצעת נישואין",
    description: "תיעוד הרגע המרגש בו אתם מתארסים",
    fullDescription: `הצעת נישואין היא רגע שמחכים לו כל החיים. 
      תנו לי להיות שם ולתעד את הרגע המרגש הזה בצורה דיסקרטית ומקצועית.
      אני מתמחה בצילום הפתעות ויודעת להסתתר כדי לתפוס את הרגע האמיתי, הספונטני והמלא רגש.`,
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  // Try to get slugs from Sanity first
  const sanityServices = await getAllServiceSlugs();
  if (sanityServices.length > 0) {
    return sanityServices;
  }
  
  // Fall back to static services
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try Sanity first
  const sanityService = await getServiceBySlug(slug);
  if (sanityService) {
    return {
      title: `${sanityService.title} | NetArt`,
      description: sanityService.description,
    };
  }
  
  // Fall back to static data
  const staticService = staticServiceData[slug];
  if (staticService) {
    return {
      title: `${staticService.title} | NetArt`,
      description: staticService.description,
    };
  }

  return {
    title: "שירות לא נמצא | NetArt",
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to fetch from Sanity first
  const sanityService = await getServiceBySlug(slug);
  const allServices = await getServices();
  const siteSettings = await getSiteSettings();
  
  // Use Sanity data or fall back to static
  const staticService = staticServiceData[slug];
  
  if (!sanityService && !staticService) {
    notFound();
  }
  
  // Combine Sanity data with static fallbacks
  const service = {
    title: sanityService?.title || staticService?.title || "",
    description: sanityService?.description || staticService?.description || "",
    fullDescription: sanityService?.fullDescription || staticService?.fullDescription || "",
    heroBanner: sanityService?.heroBanner,
    gallery: sanityService?.gallery || [],
  };
  
  // Get hero banner URL from Sanity or use placeholder
  const heroBannerUrl = service.heroBanner 
    ? getImageUrl(service.heroBanner, 1920, 800) 
    : null;
  
  // Convert Sanity gallery to format expected by ServiceGallery
  // src: Width-only sizing to preserve original aspect ratio (masonry layout)
  // fullSrc: original quality for lightbox view
  const galleryImages = service.gallery.length > 0
    ? service.gallery.map((img, index) => ({
        src: getImageUrl(img, 600, undefined, 'fit') || "",
        fullSrc: getImageUrl(img, undefined, undefined, 'original') || "",
        alt: img.alt || `${service.title} ${index + 1}`,
        caption: img.caption,
      }))
    : Array.from({ length: 8 }, (_, i) => ({
        src: `/images/services/${slug}/0${i + 1}.jpg`,
        fullSrc: `/images/services/${slug}/0${i + 1}.jpg`,
        alt: `${service.title} ${i + 1}`,
        caption: undefined,
      }));

  return (
    <>
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
            {heroBannerUrl ? (
              <Image
                src={heroBannerUrl}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/30 via-secondary to-accent/30" />
            )}
          </div>

          <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                בית
              </Link>
              <span className="mx-2 text-white/50">/</span>
              <Link
                href="/#services"
                className="text-white/70 hover:text-white transition-colors"
              >
                שירותים
              </Link>
              <span className="mx-2 text-white/50">/</span>
              <span>{service.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {service.description}
            </p>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-lg max-w-none text-muted leading-relaxed">
              {service.fullDescription.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-section"
                className="btn-primary"
              >
                הזמינו צילום
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                שלחו הודעה בוואטסאפ
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-6">
            <h2 className="section-heading text-center mb-12">גלריית עבודות</h2>
            <ServiceGallery images={galleryImages} />
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact-section" className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="section-heading">מעוניינים בצילום {service.title}?</h2>
            <p className="section-subheading mb-8">
              צרו איתי קשר עוד היום ונתחיל לתכנן את הצילום המושלם עבורכם
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                דברו איתי בוואטסאפ
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-secondary"
              >
                שלחו אימייל
              </a>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="section-heading text-center mb-12">שירותים נוספים</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Use Sanity services if available, otherwise static */}
              {(allServices.length > 0 ? allServices : services)
                .filter((s) => s.slug !== slug)
                .slice(0, 3)
                .map((otherService) => (
                  <Link
                    key={'_id' in otherService ? otherService._id : otherService.id}
                    href={`/services/${otherService.slug}`}
                    className="group bg-cream rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {otherService.title}
                    </h3>
                    <p className="text-muted text-sm">{otherService.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
      <WhatsAppButton siteSettings={siteSettings} />
    </>
  );
}
