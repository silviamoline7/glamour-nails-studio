/**
 * App - Componente raíz con enrutamiento
 * Layout compartido en sub-páginas, Index con layout propio.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";

// Páginas
import Index from "./pages/Index";
import DiseniosPage from "./pages/DiseniosPage";
import SobreNosotrosPage from "./pages/SobreNosotrosPage";
import ContactoPage from "./pages/ContactoPage";
import ManicuraPage from "./pages/servicios/ManicuraPage";
import PedicuraPage from "./pages/servicios/PedicuraPage";
import UnasDeGelPage from "./pages/servicios/UnasDeGelPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home tiene su propio layout completo */}
          <Route path="/" element={<Index />} />

          {/* Sub-páginas con Layout compartido (Navbar + Footer + ChatBot) */}
          <Route path="/servicios/manicura" element={<Layout><ManicuraPage /></Layout>} />
          <Route path="/servicios/pedicura" element={<Layout><PedicuraPage /></Layout>} />
          <Route path="/servicios/unas-de-gel" element={<Layout><UnasDeGelPage /></Layout>} />
          <Route path="/disenos" element={<Layout><DiseniosPage /></Layout>} />
          <Route path="/sobre-nosotros" element={<Layout><SobreNosotrosPage /></Layout>} />
          <Route path="/contacto" element={<Layout><ContactoPage /></Layout>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
