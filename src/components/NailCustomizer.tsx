/**
 * NailCustomizer - Personalizador interactivo de uñas
 * Permite elegir colores y decoraciones para cada dedo.
 * Visualización en tiempo real sobre una mano SVG.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Circle, Diamond, Star, Heart, Minus, X } from "lucide-react";

/** Paleta de colores disponibles para las uñas */
const COLORES_UNAS = [
  { nombre: "Rojo Clásico", valor: "#C0392B" },
  { nombre: "Rosa Pastel", valor: "#F5B7B1" },
  { nombre: "Rosa Fucsia", valor: "#E91E8C" },
  { nombre: "Nude", valor: "#E8C9B0" },
  { nombre: "Coral", valor: "#FF7F7F" },
  { nombre: "Borgoña", valor: "#7B2D3B" },
  { nombre: "Morado", valor: "#8E44AD" },
  { nombre: "Lavanda", valor: "#D2B4DE" },
  { nombre: "Azul Marino", valor: "#2C3E6B" },
  { nombre: "Azul Cielo", valor: "#85C1E9" },
  { nombre: "Verde Esmeralda", valor: "#1ABC9C" },
  { nombre: "Blanco Francés", valor: "#FDFEFE" },
  { nombre: "Negro Elegante", valor: "#1C1C1C" },
  { nombre: "Dorado", valor: "#D4AC0D" },
  { nombre: "Plateado", valor: "#BDC3C7" },
  { nombre: "Transparente", valor: "#F8E8E0" },
];

/** Decoraciones disponibles para aplicar sobre cada uña */
const DECORACIONES = [
  { id: "brillo", nombre: "Brillos", icono: Sparkles, emoji: "✨" },
  { id: "perla", nombre: "Perlas", icono: Circle, emoji: "⚪" },
  { id: "diamante", nombre: "Diamantes", icono: Diamond, emoji: "💎" },
  { id: "estrella", nombre: "Estrellas", icono: Star, emoji: "⭐" },
  { id: "corazon", nombre: "Corazones", icono: Heart, emoji: "💕" },
  { id: "linea", nombre: "Líneas", icono: Minus, emoji: "〰️" },
];

/** Estado de cada uña: color y decoraciones aplicadas */
interface EstadoUna {
  color: string;
  decoraciones: string[];
}

const unaInicial: EstadoUna = { color: "#F5B7B1", decoraciones: [] };

const NailCustomizer = () => {
  const [unas, setUnas] = useState<EstadoUna[]>(
    Array(5).fill(null).map(() => ({ ...unaInicial, decoraciones: [] }))
  );
  const [unaSeleccionada, setUnaSeleccionada] = useState<number>(0);
  const [pestanaActiva, setPestanaActiva] = useState<"color" | "decoracion">("color");

  /** Nombres de los dedos de la mano */
  const nombresDedos = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"];

  /** Cambiar el color de la uña seleccionada */
  const cambiarColor = (color: string) => {
    setUnas((prev) => prev.map((una, i) => (i === unaSeleccionada ? { ...una, color } : una)));
  };

  /** Activar/desactivar una decoración en la uña seleccionada */
  const alternarDecoracion = (idDecoracion: string) => {
    setUnas((prev) =>
      prev.map((una, i) =>
        i === unaSeleccionada
          ? {
              ...una,
              decoraciones: una.decoraciones.includes(idDecoracion)
                ? una.decoraciones.filter((d) => d !== idDecoracion)
                : [...una.decoraciones, idDecoracion],
            }
          : una
      )
    );
  };

  /** Aplicar el diseño de la uña seleccionada a todas las demás */
  const aplicarATodas = () => {
    const actual = unas[unaSeleccionada];
    setUnas(Array(5).fill(null).map(() => ({ ...actual, decoraciones: [...actual.decoraciones] })));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="font-display text-xl font-medium text-foreground mb-2">
          Personaliza tus uñas
        </h4>
        <p className="font-body text-base text-muted-foreground">
          Toca cada uña para personalizarla
        </p>
      </div>

      {/* ── Visualización de la mano (SVG) ── */}
      <div className="flex justify-center py-4">
        <div className="relative">
          <svg viewBox="0 0 320 280" className="w-72 h-auto">
            {/* Palma de la mano */}
            <ellipse cx="160" cy="200" rx="90" ry="70" fill="hsl(30, 40%, 82%)" />
            {/* Muñeca */}
            <rect x="100" y="230" width="120" height="50" rx="20" fill="hsl(30, 40%, 82%)" />

            {/* Dedos con uñas editables */}
            {[
              { x: 55, y: 140, rotacion: -20, alto: 80, ancho: 32 },   // Pulgar
              { x: 100, y: 60, rotacion: -8, alto: 100, ancho: 28 },   // Índice
              { x: 148, y: 40, rotacion: 0, alto: 110, ancho: 28 },    // Medio
              { x: 196, y: 55, rotacion: 8, alto: 100, ancho: 28 },    // Anular
              { x: 238, y: 80, rotacion: 16, alto: 80, ancho: 24 },    // Meñique
            ].map((dedo, i) => (
              <g key={i} transform={`rotate(${dedo.rotacion}, ${dedo.x + dedo.ancho / 2}, ${dedo.y + dedo.alto})`}>
                {/* Cuerpo del dedo */}
                <rect
                  x={dedo.x}
                  y={dedo.y}
                  width={dedo.ancho}
                  height={dedo.alto}
                  rx={dedo.ancho / 2}
                  fill="hsl(30, 40%, 82%)"
                  stroke={unaSeleccionada === i ? "hsl(38, 65%, 50%)" : "hsl(30, 30%, 75%)"}
                  strokeWidth={unaSeleccionada === i ? 2.5 : 1}
                />
                {/* Uña */}
                <rect
                  x={dedo.x + 3}
                  y={dedo.y + 2}
                  width={dedo.ancho - 6}
                  height={dedo.ancho * 0.9}
                  rx={dedo.ancho / 3}
                  fill={unas[i].color}
                  stroke={unaSeleccionada === i ? "hsl(38, 65%, 50%)" : "rgba(0,0,0,0.1)"}
                  strokeWidth={unaSeleccionada === i ? 2 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setUnaSeleccionada(i)}
                  style={{ filter: unas[i].color === "#FDFEFE" ? "none" : "brightness(1.05) saturate(1.1)" }}
                />
                {/* Decoraciones sobre la uña */}
                {unas[i].decoraciones.length > 0 && (
                  <text
                    x={dedo.x + dedo.ancho / 2}
                    y={dedo.y + dedo.ancho * 0.55}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={dedo.ancho * 0.3}
                    className="pointer-events-none select-none"
                  >
                    {unas[i].decoraciones
                      .slice(0, 2)
                      .map((d) => DECORACIONES.find((dec) => dec.id === d)?.emoji || "")
                      .join("")}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* ── Indicador de uña seleccionada ── */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent font-body text-sm text-foreground">
          Editando: <strong>{nombresDedos[unaSeleccionada]}</strong>
        </span>
        <button
          onClick={aplicarATodas}
          className="ml-3 px-3 py-1.5 rounded-full border border-border font-body text-sm text-muted-foreground hover:bg-accent transition-all"
        >
          Aplicar a todas
        </button>
      </div>

      {/* ── Pestañas: Colores / Decoraciones ── */}
      <div className="flex gap-2 justify-center">
        {(["color", "decoracion"] as const).map((pestana) => (
          <button
            key={pestana}
            onClick={() => setPestanaActiva(pestana)}
            className={`px-5 py-2 rounded-full font-body text-base transition-all duration-300 ${
              pestanaActiva === pestana
                ? "gold-gradient text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {pestana === "color" ? "🎨 Colores" : "✨ Decoraciones"}
          </button>
        ))}
      </div>

      {/* ── Panel de colores / decoraciones ── */}
      <AnimatePresence mode="wait">
        {pestanaActiva === "color" ? (
          <motion.div
            key="colores"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-8 gap-2"
          >
            {COLORES_UNAS.map((c) => (
              <button
                key={c.valor}
                onClick={() => cambiarColor(c.valor)}
                title={c.nombre}
                className={`w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                  unas[unaSeleccionada].color === c.valor
                    ? "border-gold scale-110 shadow-elevated"
                    : "border-border"
                }`}
                style={{ backgroundColor: c.valor }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="decoraciones"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-3"
          >
            {DECORACIONES.map((deco) => {
              const estaActiva = unas[unaSeleccionada].decoraciones.includes(deco.id);
              return (
                <button
                  key={deco.id}
                  onClick={() => alternarDecoracion(deco.id)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 font-body text-sm transition-all duration-200 ${
                    estaActiva
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold/30 hover:bg-accent"
                  }`}
                >
                  <span className="text-xl">{deco.emoji}</span>
                  <span>{deco.nombre}</span>
                  {estaActiva && <X className="w-3 h-3 text-gold" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NailCustomizer;
