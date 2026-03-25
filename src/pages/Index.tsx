/**
 * Index - Página de inicio principal
 * Maneja el scroll a #reservar cuando se navega desde otras páginas.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const ubicacion = useLocation();

  /** Si llega con ?reservar=true, hacer scroll a la sección de reservar */
  useEffect(() => {
    const parametros = new URLSearchParams(ubicacion.search);
    if (parametros.get("reservar") === "true") {
      setTimeout(() => {
        const seccion = document.querySelector("#reservar");
        seccion?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [ubicacion.search]);

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
