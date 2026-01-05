import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesGrid from "@/components/ServicesGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteSettings, getServices } from "@/sanity/lib";
import { services as staticServices } from "@/lib/utils";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Try to fetch from Sanity if configured
  const siteSettings = await getSiteSettings();
  const sanityServices = await getServices();
  
  // Use Sanity data if available, otherwise use static data
  const services = sanityServices.length > 0 
    ? sanityServices.map(s => ({
        id: s._id,
        title: s.title,
        description: s.description,
        slug: s.slug,
        thumbnail: s.thumbnail,
      }))
    : staticServices;

  return (
    <>
      <Header />
      <main>
        <Hero siteSettings={siteSettings} />
        <ServicesGrid services={services} />
        <About siteSettings={siteSettings} />
        <Contact siteSettings={siteSettings} />
      </main>
      <Footer siteSettings={siteSettings} />
      <WhatsAppButton siteSettings={siteSettings} />
    </>
  );
}
