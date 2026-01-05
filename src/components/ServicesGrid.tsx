import Link from "next/link";
import Image from "next/image";
import { services as staticServices } from "@/lib/utils";
import { getImageUrl } from "@/sanity/lib";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: { asset?: { _ref: string } };
}

interface ServicesGridProps {
  services?: ServiceItem[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  // Cast static services to include optional thumbnail
  const staticWithThumbnails: ServiceItem[] = staticServices.map(s => ({
    ...s,
    thumbnail: undefined,
  }));
  
  const displayServices = services && services.length > 0 ? services : staticWithThumbnails;

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading">השירותים שלנו</h2>
          <p className="section-subheading">
            מגוון שירותי צילום מקצועיים לכל אירוע ורגע מיוחד בחייכם
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, index) => {
            // Use higher resolution for crisp thumbnails (800x600 for 4:3 aspect ratio)
            const thumbnailUrl = service.thumbnail ? getImageUrl(service.thumbnail, 800, 600, 'crop') : null;
            
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[4/3]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary to-accent/20 flex items-center justify-center">
                      <span className="text-muted/30 text-sm">{service.title}</span>
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                    <span className="text-sm font-medium">לגלריה</span>
                    <svg
                      className="w-4 h-4 transform rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
