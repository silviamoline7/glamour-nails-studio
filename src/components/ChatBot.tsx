/**
 * ChatBot - Asistente virtual flotante
 * Botón flotante que abre una ventana de chat con respuestas automáticas.
 * En móvil se posiciona por encima del botón sticky "Reservar Cita".
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Mensaje = { rol: "usuario" | "asistente"; contenido: string };

/** Respuestas rápidas sugeridas al inicio */
const respuestasRapidas = [
  "¿Qué servicios ofrecen?",
  "¿Cuáles son los precios?",
  "¿Cómo puedo reservar?",
  "Horarios de atención",
];

/** Base de respuestas del bot por tema */
const respuestasBot: Record<string, string> = {
  servicios: "Ofrecemos: Manicura Clásica ($25), Uñas de Gel ($45), Uñas Acrílicas ($55), Nail Art Premium ($35+), Pedicura Spa ($40) y Tratamiento Reparador ($30). ¿Te gustaría reservar alguno?",
  precios: "Nuestros precios van desde $25 (Manicura Clásica) hasta $55 (Uñas Acrílicas). El Nail Art Premium comienza en $35 según el diseño. ¿Te interesa algún servicio en particular?",
  reservar: "¡Puedes reservar directamente en nuestra sección de reservas! Desplázate hacia abajo en la página o haz clic en 'Reservar Cita'. También puedes llamarnos al (555) 123-4567.",
  horarios: "Estamos abiertos de Lunes a Sábado de 9:00 AM a 7:00 PM. Los Domingos de 10:00 AM a 5:00 PM. ¿Te gustaría agendar una cita?",
  porDefecto: "¡Gracias por tu pregunta! Nuestro equipo de especialistas estará encantado de ayudarte. ¿Puedo asistirte con información sobre servicios, precios, o reservas?",
};

/** Buscar la mejor respuesta según el mensaje del usuario */
const obtenerRespuesta = (mensaje: string): string => {
  const textoMinuscula = mensaje.toLowerCase();
  if (textoMinuscula.includes("servicio") || textoMinuscula.includes("ofrecen") || textoMinuscula.includes("hacen")) return respuestasBot.servicios;
  if (textoMinuscula.includes("precio") || textoMinuscula.includes("cuesta") || textoMinuscula.includes("costo") || textoMinuscula.includes("valor")) return respuestasBot.precios;
  if (textoMinuscula.includes("reservar") || textoMinuscula.includes("cita") || textoMinuscula.includes("agendar")) return respuestasBot.reservar;
  if (textoMinuscula.includes("horario") || textoMinuscula.includes("hora") || textoMinuscula.includes("abierto") || textoMinuscula.includes("atienden")) return respuestasBot.horarios;
  return respuestasBot.porDefecto;
};

const ChatBot = () => {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "asistente", contenido: "¡Hola! 💅 Soy la asistente virtual de Lumière Nails. ¿En qué puedo ayudarte?" },
  ]);
  const [textoEntrada, setTextoEntrada] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const referenciaFinal = useRef<HTMLDivElement>(null);

  /** Auto-scroll al último mensaje */
  useEffect(() => {
    referenciaFinal.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, escribiendo]);

  /** Enviar un mensaje y obtener respuesta */
  const enviarMensaje = (texto: string) => {
    if (!texto.trim()) return;
    const mensajeUsuario: Mensaje = { rol: "usuario", contenido: texto };
    setMensajes((prev) => [...prev, mensajeUsuario]);
    setTextoEntrada("");
    setEscribiendo(true);

    setTimeout(() => {
      const respuesta = obtenerRespuesta(texto);
      setMensajes((prev) => [...prev, { rol: "asistente", contenido: respuesta }]);
      setEscribiendo(false);
    }, 1000);
  };

  return (
    <>
      {/* ── Botón flotante del chat ── */}
      {/* En móvil: bottom-24 para no chocar con el CTA sticky de reservar */}
      <motion.button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-24 md:bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-300"
        whileTap={{ scale: 0.95 }}
        aria-label={abierto ? "Cerrar chat" : "Abrir chat"}
      >
        {abierto ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      {/* ── Ventana del chat ── */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="fixed bottom-40 md:bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[60vh] md:max-h-[70vh] rounded-3xl shadow-elevated overflow-hidden flex flex-col glass border border-border/50"
          >
            {/* Cabecera */}
            <div className="gold-gradient p-5">
              <h4 className="font-display text-lg font-medium text-primary-foreground">Lumière Nails</h4>
              <p className="font-body text-sm text-primary-foreground/80">Asistente Virtual</p>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mensajes.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.rol === "usuario" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl font-body text-base ${
                      msg.rol === "usuario"
                        ? "gold-gradient text-primary-foreground rounded-tr-md"
                        : "bg-card text-foreground border border-border/50 rounded-tl-md"
                    }`}
                  >
                    {msg.contenido}
                  </div>
                </motion.div>
              ))}

              {/* Indicador de "escribiendo..." */}
              {escribiendo && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={referenciaFinal} />
            </div>

            {/* Respuestas rápidas (solo al inicio) */}
            {mensajes.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {respuestasRapidas.map((pregunta) => (
                  <button
                    key={pregunta}
                    onClick={() => enviarMensaje(pregunta)}
                    className="px-3 py-1.5 rounded-full border border-gold/30 font-body text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    {pregunta}
                  </button>
                ))}
              </div>
            )}

            {/* Campo de entrada */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={textoEntrada}
                  onChange={(e) => setTextoEntrada(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && enviarMensaje(textoEntrada)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={() => enviarMensaje(textoEntrada)}
                  className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
