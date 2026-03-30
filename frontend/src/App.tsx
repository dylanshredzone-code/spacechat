import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { Send, Rocket, Sparkles, RefreshCw, Map as MapIcon, ChevronLeft } from "lucide-react";
import { askSpaceChat } from "./services/geminiService";
import { cn } from "./lib/utils";
import { ConstellationMap } from "./components/ConstellationMap";
import { CONSTELLATIONS, Star } from "./constants/constellations";
import { ErrorBoundary } from "./components/ErrorBoundary";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "Why is Mars red?",
  "What is a black hole?",
  "How big is the Milky Way?",
  "Tell me about the James Webb Telescope.",
  "When is the next meteor shower?"
];

export default function App() {
  return (
    <ErrorBoundary>
      <SpaceChatApp />
    </ErrorBoundary>
  );
}

function SpaceChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "bot",
      content: "Hello! I'm **SpaceChat**, your guide to the cosmos. 🚀\n\nI'm here to answer your questions about the stars, planets, and everything in between. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [highlightedConstellationId, setHighlightedConstellationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect constellations in the last message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "bot") {
      const content = lastMessage.content.toLowerCase();
      const found = CONSTELLATIONS.find(c => content.includes(c.name.toLowerCase()));
      if (found) {
        setHighlightedConstellationId(found.id);
        setShowMap(true); // Automatically show map when a constellation is mentioned
      }
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askSpaceChat(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response || "I'm sorry, I couldn't find an answer to that. Space is full of mysteries!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error asking SpaceChat:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: "Oops! My communication systems are experiencing some interference from a solar flare. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarClick = (star: Star) => {
    handleSend(`Tell me more about the star ${star.name}.`);
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-space-bg">
      <div className="atmosphere" />
      
      {/* Header */}
      <header className="z-20 px-6 py-4 flex items-center justify-between glass-panel mx-6 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-space-accent flex items-center justify-center shadow-lg shadow-space-accent/20">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SpaceChat</h1>
            <p className="text-xs text-white/50 uppercase tracking-widest font-mono">Cosmic Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMap(!showMap)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
              showMap ? "bg-space-accent text-white" : "glass-panel text-white/70 hover:bg-white/10"
            )}
          >
            <MapIcon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Star Map</span>
          </button>
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Reset Conversation"
          >
            <RefreshCw className="w-5 h-5 text-white/70" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Chat Area */}
        <main className={cn(
          "flex-1 flex flex-col transition-all duration-500",
          showMap ? "w-1/2" : "w-full"
        )}>
          <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide pr-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col",
                      message.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[90%] px-6 py-4 rounded-3xl",
                      message.role === "user" 
                        ? "bg-space-accent text-white rounded-tr-none" 
                        : "glass-panel rounded-tl-none"
                    )}>
                      <div className={cn(
                        "markdown-body",
                        message.role === "user" && "text-white font-sans text-base"
                      )}>
                        {message.role === "bot" ? (
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        ) : (
                          <p>{message.content}</p>
                        )}
                      </div>
                      <p className="text-[10px] mt-2 opacity-40 font-mono">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-white/50 font-mono text-xs ml-4"
                >
                  <Sparkles className="w-4 h-4 animate-pulse text-space-accent" />
                  <span>SpaceChat is scanning the cosmos...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <footer className="mt-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-4 py-2 rounded-full glass-panel text-sm hover:bg-white/10 transition-colors text-white/80"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me about the universe..."
                  className="w-full px-6 py-4 pr-16 rounded-full glass-panel focus:outline-none focus:ring-2 focus:ring-space-accent/50 transition-all placeholder:text-white/30"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-space-accent flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-space-accent/20"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </footer>
        </main>

        {/* Map Panel */}
        <AnimatePresence>
          {showMap && (
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-1/2 h-full hidden lg:block"
            >
              <ConstellationMap 
                highlightedId={highlightedConstellationId} 
                onStarClick={handleStarClick}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Map Modal (Simplified for now) */}
      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="lg:hidden fixed inset-0 z-50 p-4 bg-space-bg/90 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setShowMap(false)}
                className="p-2 rounded-full glass-panel"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1">
              <ConstellationMap 
                highlightedId={highlightedConstellationId} 
                onStarClick={handleStarClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
