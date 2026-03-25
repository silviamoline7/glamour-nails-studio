/**
 * Navbar - Barra de navegación principal
 * Desktop: menú horizontal con dropdown de servicios
 * Móvil: menú lateral (sidebar) que se desliza desde la derecha
 * Botón sticky de reservar rediseñado para móvil
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import imagenManicura from "@/assets/service-manicura.jpg";
import imagenPedicura from "@/assets/service-pedicura.jpg";
import imagenGel from "@/assets/service-gel.jpg";

/** Submenú de servicios */
const enlacesServicios = [
  { etiqueta: "Manicura", ruta: "/servicios/manicura", imagen: imagenManicura, alt: "Manicura profesional Madrid" },
  { etiqueta: "Pedicura", ruta: "/servicios/pedicura", imagen: imagenPedicura, alt: "Pedicura spa Madrid" },
  { etiqueta: "Uñas de Gel", ruta: "/servicios/unas-de-gel", imagen: imagenGel, alt: "Uñas de gel Madrid" },
];

/** Links principales del menú */
const enlacesNavegacion = [
  { etiqueta: "Inicio", ruta: "/" },
  { etiqueta: "Servicios", ruta: "#", tieneDropdown: true },
  { etiqueta: "Diseños", ruta: "/disenos" },
  { etiqueta: "Sobre Nosotros", ruta: "/sobre-nosotros" },
  { etiqueta: "Contacto", ruta: "/contacto" },
];

const Navbar = () => {
  const [haScrolleado, setHaScrolleado] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [serviciosAbierto, setServiciosAbierto] = useState(false);
  const [serviciosMovilAbierto, setServiciosMovilAbierto] = useState(false);
  const referenciaDropdown = useRef<HTMLDivElement>(null);
  const ubicacion = useLocation();
  const navegarA = useNavigate();

  /** Detectar scroll */
  useEffect(() => {
    const alScrollear = () => setHaScrolleado(window.scrollY > 50);
    window.addEventListener("scroll", alScrollear);
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  /** Cerrar menú móvil al cambiar de ruta */
  useEffect(() => {
    setMenuMovilAbierto(false);
    setServiciosMovilAbierto(false);
  }, [ubicacion]);

  /** Bloquear scroll del body cuando el menú está abierto */
  useEffect(() => {
    document.body.style.overflow = menuMovilAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuMovilAbierto]);

  /** Cerrar dropdown desktop al hacer clic fuera */
  useEffect(() => {
    const alClickFuera = (e: MouseEvent) => {
      if (referenciaDropdown.current && !referenciaDropdown.current.contains(e.target as Node)) {
        setServiciosAbierto(false);
      }
    };
    document.addEventListener("mousedown", alClickFuera);
    return () => document.removeEventListener("mousedown", alClickFuera);
  }, []);

  /** Navegar a la sección de reservar */
  const irAReservar = () => {
    if (ubicacion.pathname === "/") {
      const seccion = document.querySelector("#reservar");
      seccion?.scrollIntoView({ behavior: "smooth" });
    } else {
      navegarA("/?reservar=true");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          haScrolleado ? "glass shadow-card py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-semibold tracking-wide text-foreground">
            Lumière <span className="gold-text">Nails</span>
          </Link>

          {/* ── Navegación Desktop ── */}
          <div className="hidden md:flex items-center gap-8">
            {enlacesNavegacion.map((enlace) =>
              enlace.tieneDropdown ? (
                <div key={enlace.etiqueta} className="relative" ref={referenciaDropdown}>
                  <button
                    onClick={() => setServiciosAbierto(!serviciosAbierto)}
                    className="flex items-center gap-1 font-body text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {enlace.etiqueta}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${serviciosAbierto ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {serviciosAbierto && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 glass rounded-2xl shadow-elevated border border-border/50 overflow-hidden"
                      >
                        {enlacesServicios.map((servicio) => (
                          <Link
                            key={servicio.ruta}
                            to={servicio.ruta}
                            onClick={() => setServiciosAbierto(false)}
                            className="flex items-center gap-4 px-5 py-4 hover:bg-accent/50 transition-colors duration-200 group"
                          >
                            <img src={servicio.imagen} alt={servicio.alt} className="w-14 h-14 rounded-xl object-cover shadow-card group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                            <span className="font-display text-base font-medium text-foreground group-hover:text-gold transition-colors duration-200">
                              {servicio.etiqueta}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={enlace.etiqueta}
                  to={enlace.ruta}
                  className={`font-body text-lg transition-colors duration-300 ${
                    ubicacion.pathname === enlace.ruta ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {enlace.etiqueta}
                </Link>
              )
            )}
            <button
              onClick={irAReservar}
              className="gold-gradient px-6 py-2.5 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all duration-300"
            >
              Reservar Cita
            </button>
          </div>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
            className="md:hidden text-foreground z-50"
            aria-label="Abrir menú"
          >
            {menuMovilAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Sidebar Móvil (desliza desde la derecha) ── */}
      <AnimatePresence>
        {menuMovilAbierto && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden"
              onClick={() => setMenuMovilAbierto(false)}
            />
            {/* Panel lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-card border-l border-border shadow-elevated overflow-y-auto md:hidden"
            >
              <div className="flex flex-col pt-24 px-6 pb-10 gap-1">
                {/* Logo en sidebar */}
                <div className="mb-6">
                  <p className="font-display text-xl font-semibold text-foreground">
                    Lumière <span className="gold-text">Nails</span>
                  </p>
                </div>

                {enlacesNavegacion.map((enlace) =>
                  enlace.tieneDropdown ? (
                    <div key={enlace.etiqueta}>
                      <button
                        onClick={() => setServiciosMovilAbierto(!serviciosMovilAbierto)}
                        className="flex items-center justify-between w-full py-3 font-body text-lg text-foreground"
                      >
                        {enlace.etiqueta}
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${serviciosMovilAbierto ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {serviciosMovilAbierto && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-2 space-y-1 mb-2"
                          >
                            {enlacesServicios.map((servicio) => (
                              <Link
                                key={servicio.ruta}
                                to={servicio.ruta}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-colors"
                              >
                                <img src={servicio.imagen} alt={servicio.alt} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                                <span className="font-display text-base font-medium text-foreground">
                                  {servicio.etiqueta}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={enlace.etiqueta}
                      to={enlace.ruta}
                      className="py-3 font-body text-lg text-foreground hover:text-gold transition-colors"
                    >
                      {enlace.etiqueta}
                    </Link>
                  )
                )}

                {/* CTA en sidebar */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <button
                    onClick={() => { setMenuMovilAbierto(false); irAReservar(); }}
                    className="w-full gold-gradient py-3.5 rounded-full font-body text-lg text-primary-foreground shadow-card flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Reservar Cita
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Botón sticky "Reservar Cita" en móvil - rediseñado ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 glass border-t border-border/30">
        <button
          onClick={irAReservar}
          className="w-full gold-gradient py-3 rounded-full font-body text-base text-primary-foreground shadow-elevated flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Reservar Cita
        </button>
      </div>
    </>
  );
};

export default Navbar;
