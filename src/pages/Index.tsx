import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import FAQSection from "@/components/FAQSection";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingSection />
      <FAQSection />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
