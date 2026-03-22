/**
 * Index - Página de inicio principal
 * Incluye hero, trust bar, tratamientos, testimonios,
 * booking, FAQ, redes sociales y footer.
 * Schema markup y SEO optimizado.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import TreatmentsPreview from "@/components/TreatmentsPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import FAQSection from "@/components/FAQSection";
import SocialSection from "@/components/SocialSection";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Lumière Nails | Salón de Uñas en Madrid | Manicura, Pedicura y Gel"
        description="Salón de uñas premium en Madrid Centro. Manicura, pedicura y uñas de gel con los mejores profesionales. Reserva tu cita online."
      />
      <SchemaMarkup />
      <Navbar />
      <HeroSection />
      <TrustBar />
      <TreatmentsPreview />
      <TestimonialsSection />
      <BookingSection />
      <FAQSection />
      <SocialSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
