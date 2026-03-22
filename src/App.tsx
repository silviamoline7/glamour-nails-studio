/**
 * App - Componente raíz con enrutamiento
 * Define todas las rutas de la aplicación.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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
          <Route path="/" element={<Index />} />
          <Route path="/servicios/manicura" element={<ManicuraPage />} />
          <Route path="/servicios/pedicura" element={<PedicuraPage />} />
          <Route path="/servicios/unas-de-gel" element={<UnasDeGelPage />} />
          <Route path="/disenos" element={<DiseniosPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
