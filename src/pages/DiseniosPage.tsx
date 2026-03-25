/**
 * DiseniosPage - Galería filtrable de diseños de uñas
 * URL: /disenos
 * Sin breadcrumb visual (JSON-LD para SEO).
 */
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";

import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import serviceManicura from "@/assets/service-manicura.jpg";
import servicePedicura from "@/assets/service-pedicura.jpg";
import serviceGel from "@/assets/service-gel.jpg";

/** Categorías de filtro */
const categorias = ["Todo", "Manicura", "Pedicura", "Uñas de Gel"] as const;
type Categoria = typeof categorias[number];

/** Galería de diseños */
const disenos = [
  { src: gallery1, alt: "French manicure dorado Madrid", label: "Gold Leaf French", category: "Manicura" as Categoria, price: "€30" },
  { src: gallery2, alt: "Diseño geométrico nude Madrid", label: "Geometric Gold", category: "Uñas de Gel" as Categoria, price: "€55" },
  { src: gallery3, alt: "Ombré rosa glitter Madrid", label: "Pink Ombré", category: "Manicura" as Categoria, price: "€35" },
  { src: gallery4, alt: "Burgundy lámina oro Madrid", label: "Burgundy Luxe", category: "Pedicura" as Categoria, price: "€40" },
  { src: gallery5, alt: "Efecto mármol dorado Madrid", label: "Marble Edition", category: "Uñas de Gel" as Categoria, price: "€60" },
  { src: gallery6, alt: "Nail art floral Madrid", label: "Floral Delicate", category: "Manicura" as Categoria, price: "€35" },
  { src: serviceManicura, alt: "Manicura rosa pastel Madrid", label: "Rosa Pastel", category: "Manicura" as Categoria, price: "€25" },
  { src: servicePedicura, alt: "Pedicura rojo clásico Madrid", label: "Rojo Clásico", category: "Pedicura" as Categoria, price: "€30" },
  { src: serviceGel, alt: "Uñas gel nude shimmer Madrid", label: "Nude Shimmer", category: "Uñas de Gel" as Categoria, price: "€50" },
];

const DiseniosPage = () => {
  const [filtro, setFiltro] = useState<Categoria>("Todo");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<number | null>(null);
  const referencia = useRef(null);
  const enVista = useInView(referencia, { once: true, margin: "-80px" });

  const filtrados = filtro === "Todo" ? disenos : disenos.filter((d) => d.category === filtro);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Diseños de Uñas Madrid | Galería | Lumière Nails"
        description="Explora nuestra galería de diseños de uñas. Manicura, pedicura y uñas de gel con estilos únicos en Madrid Centro."
      />

      {/* Header */}
      <section className="pt-28 md:pt-32 pb-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px gold-gradient" />
              <p className="font-body text-sm tracking-[0.3em] uppercase text-gold">Galería</p>
            </div>
            <h1 className="font-display text-3xl md:text-6xl font-semibold text-foreground mb-4">
              Nuestros <span className="italic gold-text">Diseños</span>
            </h1>
            <p className="font-body text-base md:text-xl text-muted-foreground max-w-2xl">
              Inspírate con nuestra colección de diseños exclusivos. Cada uno creado con precisión y creatividad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm md:text-base transition-all duration-300 ${
                  filtro === cat
                    ? "gold-gradient text-primary-foreground shadow-card"
                    : "border border-border text-muted-foreground hover:border-gold/30 hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="pb-24" ref={referencia}>
        <div className="container mx-auto px-6">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtrados.map((img, i) => (
                <motion.div
                  key={img.label}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-500"
                  onClick={() => setImagenSeleccionada(i)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-sm md:text-lg text-primary-foreground">{img.label}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-body text-xs md:text-sm text-primary-foreground/80">{img.category}</span>
                      <span className="font-display text-sm md:text-lg text-gold">{img.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {imagenSeleccionada !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
            onClick={() => setImagenSeleccionada(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtrados[imagenSeleccionada]?.src}
              alt={filtrados[imagenSeleccionada]?.alt}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-elevated object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiseniosPage;
