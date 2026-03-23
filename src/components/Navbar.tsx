/**
 * Navbar - Barra de navegación principal
 * Incluye menú desplegable de servicios con mini-imágenes,
 * botón CTA "Reservar Cita" destacado, y versión mobile responsive.
 * En móvil, el botón sticky de reservar se posiciona en la parte inferior.
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Mini-imágenes para el dropdown de servicios
import imagenManicura from "@/assets/service-manicura.jpg";
import imagenPedicura from "@/assets/service-pedicura.jpg";
import imagenGel from "@/assets/service-gel.jpg";

/** Submenú de servicios con imagen, nombre y ruta */
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

  /** Detectar scroll para cambiar el estilo del navbar */
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
                /* Dropdown de Servicios */
                <div key={enlace.etiqueta} className="relative" ref={referenciaDropdown}>
                  <button
                    onClick={() => setServiciosAbierto(!serviciosAbierto)}
                    className="flex items-center gap-1 font-body text-lg text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {enlace.etiqueta}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${serviciosAbierto ? "rotate-180" : ""}`}
                    />
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
                            <img
                              src={servicio.imagen}
                              alt={servicio.alt}
                              className="w-14 h-14 rounded-xl object-cover shadow-card group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
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
                /* Link normal */
                <Link
                  key={enlace.etiqueta}
                  to={enlace.ruta}
                  className={`font-body text-lg transition-colors duration-300 ${
                    ubicacion.pathname === enlace.ruta
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {enlace.etiqueta}
                </Link>
              )
            )}

            {/* Botón CTA Reservar */}
            <Link
              to="/#reservar"
              className="gold-gradient px-6 py-2.5 rounded-full font-body text-lg text-primary-foreground shadow-card hover:shadow-elevated transition-all duration-300"
            >
              Reservar Cita
            </Link>
          </div>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
            className="md:hidden text-foreground"
            aria-label="Abrir menú"
          >
            {menuMovilAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Menú Móvil ── */}
        <AnimatePresence>
          {menuMovilAbierto && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border overflow-hidden"
            >
              <div className="flex flex-col items-center gap-2 py-6">
                {enlacesNavegacion.map((enlace) =>
                  enlace.tieneDropdown ? (
                    <div key={enlace.etiqueta} className="w-full px-6">
                      <button
                        onClick={() => setServiciosMovilAbierto(!serviciosMovilAbierto)}
                        className="flex items-center justify-center gap-2 w-full py-3 font-body text-xl text-foreground"
                      >
                        {enlace.etiqueta}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${serviciosMovilAbierto ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {serviciosMovilAbierto && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 pb-2"
                          >
                            {enlacesServicios.map((servicio) => (
                              <Link
                                key={servicio.ruta}
                                to={servicio.ruta}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors"
                              >
                                <img
                                  src={servicio.imagen}
                                  alt={servicio.alt}
                                  className="w-12 h-12 rounded-lg object-cover"
                                  loading="lazy"
                                />
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
                      className="font-body text-xl text-foreground py-2"
                    >
                      {enlace.etiqueta}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Botón sticky "Reservar Cita" en móvil ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 glass border-t border-border/50">
        <Link
          to="/#reservar"
          className="block w-full gold-gradient py-3.5 rounded-full font-body text-lg text-primary-foreground text-center shadow-elevated"
        >
          Reservar Cita
        </Link>
      </div>
    </>
  );
};

export default Navbar;
