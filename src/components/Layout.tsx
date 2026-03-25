/**
 * Layout - Wrapper con Navbar, Footer y ChatBot
 * Maneja el scroll a #reservar cuando se navega desde otras páginas.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
