/**
 * DiseniosPage - Galería filtrable de diseños de uñas
 * URL: /disenos
 * Filtra por categoría: Todo, Manicura, Pedicura, Uñas de Gel
 */
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Breadcrumb from "@/components/Breadcrumb";
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
const categories = ["Todo", "Manicura", "Pedicura", "Uñas de Gel"] as const;
type Category = typeof categories[number];

/** Galería de diseños con categoría asignada */
const designs = [
  { src: gallery1, alt: "French manicure dorado Madrid", label: "Gold Leaf French", category: "Manicura" as Category, price: "€30" },
  { src: gallery2, alt: "Diseño geométrico nude Madrid", label: "Geometric Gold", category: "Uñas de Gel" as Category, price: "€55" },
  { src: gallery3, alt: "Ombré rosa glitter Madrid", label: "Pink Ombré", category: "Manicura" as Category, price: "€35" },
  { src: gallery4, alt: "Burgundy lámina oro Madrid", label: "Burgundy Luxe", category: "Pedicura" as Category, price: "€40" },
  { src: gallery5, alt: "Efecto mármol dorado Madrid", label: "Marble Edition", category: "Uñas de Gel" as Category, price: "€60" },
  { src: gallery6, alt: "Nail art floral Madrid", label: "Floral Delicate", category: "Manicura" as Category, price: "€35" },
  { src: serviceManicura, alt: "Manicura rosa pastel Madrid", label: "Rosa Pastel", category: "Manicura" as Category, price: "€25" },
  { src: servicePedicura, alt: "Pedicura rojo clásico Madrid", label: "Rojo Clásico", category: "Pedicura" as Category, price: "€30" },
  { src: serviceGel, alt: "Uñas gel nude shimmer Madrid", label: "Nude Shimmer", category: "Uñas de Gel" as Category, price: "€50" },
];

const DiseniosPage = () => {
  const [filter, setFilter] = useState<Category>("Todo");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = filter === "Todo" ? designs : designs.filter((d) => d.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Diseños de Uñas Madrid | Galería | Lumière Nails"
        description="Explora nuestra galería de diseños de uñas. Manicura, pedicura y uñas de gel con estilos únicos en Madrid Centro."
      />

      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Diseños" }]} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground mb-4">
              Nuestros <span className="italic gold-text">Diseños</span>
            </h1>
            <p className="font-body text-xl text-muted-foreground max-w-2xl">
              Inspírate con nuestra colección de diseños exclusivos. Cada uno creado con precisión y creatividad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtros */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-body text-base transition-all duration-300 ${
                  filter === cat
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

      {/* Galería filtrada */}
      <section className="pb-24" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.label}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-elevated transition-all duration-500"
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-display text-lg text-primary-foreground">{img.label}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-body text-sm text-primary-foreground/80">{img.category}</span>
                      <span className="font-display text-lg text-gold">{img.price}</span>
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
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={filtered[selectedImage]?.src}
              alt={filtered[selectedImage]?.alt}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-elevated object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiseniosPage;
