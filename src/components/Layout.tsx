/**
 * Layout - Wrapper con Navbar, Footer y ChatBot
 * Usado por todas las páginas excepto Index (que tiene su propio layout).
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

  // Scroll al top cuando cambia la ruta
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
