import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Circle, Diamond, Star, Heart, Minus, X } from "lucide-react";

const NAIL_COLORS = [
  { name: "Rojo Clásico", value: "#C0392B" },
  { name: "Rosa Pastel", value: "#F5B7B1" },
  { name: "Rosa Fucsia", value: "#E91E8C" },
  { name: "Nude", value: "#E8C9B0" },
  { name: "Coral", value: "#FF7F7F" },
  { name: "Borgoña", value: "#7B2D3B" },
  { name: "Morado", value: "#8E44AD" },
  { name: "Lavanda", value: "#D2B4DE" },
  { name: "Azul Marino", value: "#2C3E6B" },
  { name: "Azul Cielo", value: "#85C1E9" },
  { name: "Verde Esmeralda", value: "#1ABC9C" },
  { name: "Blanco Francés", value: "#FDFEFE" },
  { name: "Negro Elegante", value: "#1C1C1C" },
  { name: "Dorado", value: "#D4AC0D" },
  { name: "Plateado", value: "#BDC3C7" },
  { name: "Transparente", value: "#F8E8E0" },
];

const DECORATIONS = [
  { id: "sparkle", name: "Brillos", icon: Sparkles, emoji: "✨" },
  { id: "pearl", name: "Perlas", icon: Circle, emoji: "⚪" },
  { id: "diamond", name: "Diamantes", icon: Diamond, emoji: "💎" },
  { id: "star", name: "Estrellas", icon: Star, emoji: "⭐" },
  { id: "heart", name: "Corazones", icon: Heart, emoji: "💕" },
  { id: "line", name: "Líneas", icon: Minus, emoji: "〰️" },
];

interface NailState {
  color: string;
  decorations: string[];
}

const defaultNail: NailState = { color: "#F5B7B1", decorations: [] };

const NailCustomizer = () => {
  const [nails, setNails] = useState<NailState[]>(
    Array(5).fill(null).map(() => ({ ...defaultNail, decorations: [] }))
  );
  const [selectedNail, setSelectedNail] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"color" | "decoration">("color");

  const fingerNames = ["Pulgar", "Índice", "Medio", "Anular", "Meñique"];

  const updateNailColor = (color: string) => {
    setNails((prev) => prev.map((n, i) => (i === selectedNail ? { ...n, color } : n)));
  };

  const toggleDecoration = (decoId: string) => {
    setNails((prev) =>
      prev.map((n, i) =>
        i === selectedNail
          ? {
              ...n,
              decorations: n.decorations.includes(decoId)
                ? n.decorations.filter((d) => d !== decoId)
                : [...n.decorations, decoId],
            }
          : n
      )
    );
  };

  const applyToAll = () => {
    const current = nails[selectedNail];
    setNails(Array(5).fill(null).map(() => ({ ...current, decorations: [...current.decorations] })));
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

      {/* Hand visualization */}
      <div className="flex justify-center py-4">
        <div className="relative">
          {/* Hand shape - SVG simplified hand */}
          <svg viewBox="0 0 320 280" className="w-72 h-auto">
            {/* Palm */}
            <ellipse cx="160" cy="200" rx="90" ry="70" fill="hsl(30, 40%, 82%)" />
            {/* Wrist */}
            <rect x="100" y="230" width="120" height="50" rx="20" fill="hsl(30, 40%, 82%)" />
            
            {/* Fingers - positioned as a spread hand */}
            {[
              { x: 55, y: 140, rotate: -20, height: 80, width: 32 },   // Thumb
              { x: 100, y: 60, rotate: -8, height: 100, width: 28 },   // Index
              { x: 148, y: 40, rotate: 0, height: 110, width: 28 },    // Middle
              { x: 196, y: 55, rotate: 8, height: 100, width: 28 },    // Ring
              { x: 238, y: 80, rotate: 16, height: 80, width: 24 },    // Pinky
            ].map((finger, i) => (
              <g key={i} transform={`rotate(${finger.rotate}, ${finger.x + finger.width / 2}, ${finger.y + finger.height})`}>
                {/* Finger body */}
                <rect
                  x={finger.x}
                  y={finger.y}
                  width={finger.width}
                  height={finger.height}
                  rx={finger.width / 2}
                  fill="hsl(30, 40%, 82%)"
                  stroke={selectedNail === i ? "hsl(38, 65%, 50%)" : "hsl(30, 30%, 75%)"}
                  strokeWidth={selectedNail === i ? 2.5 : 1}
                />
                {/* Nail */}
                <rect
                  x={finger.x + 3}
                  y={finger.y + 2}
                  width={finger.width - 6}
                  height={finger.width * 0.9}
                  rx={finger.width / 3}
                  fill={nails[i].color}
                  stroke={selectedNail === i ? "hsl(38, 65%, 50%)" : "rgba(0,0,0,0.1)"}
                  strokeWidth={selectedNail === i ? 2 : 1}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedNail(i)}
                  style={{ filter: nails[i].color === "#FDFEFE" ? "none" : "brightness(1.05) saturate(1.1)" }}
                />
                {/* Decorations on nail */}
                {nails[i].decorations.length > 0 && (
                  <text
                    x={finger.x + finger.width / 2}
                    y={finger.y + finger.width * 0.55}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={finger.width * 0.3}
                    className="pointer-events-none select-none"
                  >
                    {nails[i].decorations
                      .slice(0, 2)
                      .map((d) => DECORATIONS.find((dec) => dec.id === d)?.emoji || "")
                      .join("")}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Selected nail label */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent font-body text-sm text-foreground">
          Editando: <strong>{fingerNames[selectedNail]}</strong>
        </span>
        <button
          onClick={applyToAll}
          className="ml-3 px-3 py-1.5 rounded-full border border-border font-body text-sm text-muted-foreground hover:bg-accent transition-all"
        >
          Aplicar a todas
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center">
        {(["color", "decoration"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-body text-base transition-all duration-300 ${
              activeTab === tab
                ? "gold-gradient text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab === "color" ? "🎨 Colores" : "✨ Decoraciones"}
          </button>
        ))}
      </div>

      {/* Color / Decoration panels */}
      <AnimatePresence mode="wait">
        {activeTab === "color" ? (
          <motion.div
            key="colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-8 gap-2"
          >
            {NAIL_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => updateNailColor(c.value)}
                title={c.name}
                className={`w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                  nails[selectedNail].color === c.value
                    ? "border-gold scale-110 shadow-elevated"
                    : "border-border"
                }`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="decorations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-3 gap-3"
          >
            {DECORATIONS.map((deco) => {
              const isActive = nails[selectedNail].decorations.includes(deco.id);
              return (
                <button
                  key={deco.id}
                  onClick={() => toggleDecoration(deco.id)}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 font-body text-sm transition-all duration-200 ${
                    isActive
                      ? "border-gold bg-gold/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-gold/30 hover:bg-accent"
                  }`}
                >
                  <span className="text-xl">{deco.emoji}</span>
                  <span>{deco.name}</span>
                  {isActive && (
                    <X className="w-3 h-3 text-gold" />
                  )}
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
