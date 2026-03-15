import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const quickReplies = [
  "¿Qué servicios ofrecen?",
  "¿Cuáles son los precios?",
  "¿Cómo puedo reservar?",
  "Horarios de atención",
];

const botResponses: Record<string, string> = {
  "servicios": "Ofrecemos: Manicura Clásica ($25), Uñas de Gel ($45), Uñas Acrílicas ($55), Nail Art Premium ($35+), Pedicura Spa ($40) y Tratamiento Reparador ($30). ¿Te gustaría reservar alguno?",
  "precios": "Nuestros precios van desde $25 (Manicura Clásica) hasta $55 (Uñas Acrílicas). El Nail Art Premium comienza en $35 según el diseño. ¿Te interesa algún servicio en particular?",
  "reservar": "¡Puedes reservar directamente en nuestra sección de reservas! Desplázate hacia abajo en la página o haz clic en 'Reservar Cita'. También puedes llamarnos al (555) 123-4567.",
  "horarios": "Estamos abiertos de Lunes a Sábado de 9:00 AM a 7:00 PM. Los Domingos de 10:00 AM a 5:00 PM. ¿Te gustaría agendar una cita?",
  "default": "¡Gracias por tu pregunta! Nuestro equipo de especialistas estará encantado de ayudarte. ¿Puedo asistirte con información sobre servicios, precios, o reservas?",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("servicio") || lower.includes("ofrecen") || lower.includes("hacen")) return botResponses.servicios;
  if (lower.includes("precio") || lower.includes("cuesta") || lower.includes("costo") || lower.includes("valor")) return botResponses.precios;
  if (lower.includes("reservar") || lower.includes("cita") || lower.includes("agendar")) return botResponses.reservar;
  if (lower.includes("horario") || lower.includes("hora") || lower.includes("abierto") || lower.includes("atienden")) return botResponses.horarios;
  return botResponses.default;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! 💅 Soy la asistente virtual de Lumière Nails. ¿En qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient shadow-elevated flex items-center justify-center hover:scale-110 transition-transform duration-300"
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageCircle className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] rounded-3xl shadow-elevated overflow-hidden flex flex-col glass border border-border/50"
          >
            {/* Header */}
            <div className="gold-gradient p-5">
              <h4 className="font-display text-lg font-medium text-primary-foreground">Lumière Nails</h4>
              <p className="font-body text-sm text-primary-foreground/80">Asistente Virtual</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl font-body text-base ${
                      msg.role === "user"
                        ? "gold-gradient text-primary-foreground rounded-tr-md"
                        : "bg-card text-foreground border border-border/50 rounded-tl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {typing && (
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
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 rounded-full border border-gold/30 font-body text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center hover:scale-105 transition-transform"
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
