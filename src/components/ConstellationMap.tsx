import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Constellation, CONSTELLATIONS } from "../constants/constellations";
import { cn } from "../lib/utils";
import { Info, ChevronDown } from "lucide-react";

interface ConstellationMapProps {
  highlightedId?: string;
  onStarClick?: (star: Star) => void;
}

export function ConstellationMap({ highlightedId, onStarClick }: ConstellationMapProps) {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null);
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null);

  useEffect(() => {
    if (highlightedId) {
      const found = CONSTELLATIONS.find(c => c.id === highlightedId);
      if (found) setSelectedConstellation(found);
    }
  }, [highlightedId]);

  const currentConstellation = selectedConstellation || CONSTELLATIONS[0];

  return (
    <div className="relative w-full h-full flex flex-col glass-panel overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-white/70">Star Map</span>
        </div>
        
        {/* Dropdown Menu */}
        <div className="relative group">
          <select
            value={currentConstellation?.id}
            onChange={(e) => {
              const found = CONSTELLATIONS.find(c => c.id === e.target.value);
              if (found) setSelectedConstellation(found);
            }}
            className="bg-black/40 text-white text-[10px] uppercase tracking-widest font-mono px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-space-accent/50 appearance-none cursor-pointer pr-10 transition-all hover:bg-white/5"
          >
            {CONSTELLATIONS.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-white py-2">
                {c.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 group-hover:text-space-accent transition-colors">
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 relative bg-black/60 cursor-crosshair">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full p-8"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Milky Way Background (Subtle Gradient) */}
          <defs>
            <radialGradient id="milkyWay" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#milkyWay)" />

          {/* Background Stars (Random) */}
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.circle
              key={`bg-${i}`}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r={Math.random() * 0.3}
              fill="white"
              initial={{ opacity: Math.random() * 0.4 }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Constellation Lines */}
          <AnimatePresence mode="wait">
            <motion.g
              key={currentConstellation?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {currentConstellation?.lines.map(([startIdx, endIdx], i) => {
                const start = currentConstellation.stars[startIdx];
                const end = currentConstellation.stars[endIdx];
                if (!start || !end) return null;
                return (
                  <line
                    key={`line-${i}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(255, 78, 0, 0.3)"
                    strokeWidth="0.4"
                    strokeDasharray="1,1"
                  />
                );
              })}

              {/* Stars */}
              {currentConstellation?.stars.map((star) => (
                <g 
                  key={star.id} 
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  onClick={() => onStarClick?.(star)}
                >
                  {/* Glow effect */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={4 / star.magnitude}
                    fill="rgba(255, 78, 0, 0.15)"
                    className="group-hover:fill-space-accent/30 transition-all animate-pulse"
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={2 / star.magnitude}
                    fill="rgba(255, 78, 0, 0.3)"
                    className="group-hover:fill-space-accent/50 transition-all"
                  />
                  {/* Core star */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={1 / star.magnitude}
                    fill="white"
                    className="group-hover:scale-150 transition-all shadow-glow"
                  />
                  {/* Label on hover */}
                  {star.name && (
                    <text
                      x={star.x + 2}
                      y={star.y - 2}
                      fill="white"
                      fontSize="2.5"
                      className={cn(
                        "pointer-events-none transition-opacity font-mono uppercase tracking-tighter",
                        hoveredStar?.id === star.id ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {star.name}
                    </text>
                  )}
                </g>
              ))}
            </motion.g>
          </AnimatePresence>
        </svg>

        {/* Constellation Info Overlay */}
        {currentConstellation && (
          <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 pointer-events-none">
            <h3 className="text-sm font-bold text-white mb-1">{currentConstellation.name}</h3>
            <p className="text-[10px] text-white/70 leading-relaxed italic">
              {currentConstellation.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
