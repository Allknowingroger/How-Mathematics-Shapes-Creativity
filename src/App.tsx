/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Triangle, 
  Binary, 
  Zap, 
  Dices, 
  BookOpen, 
  Cpu, 
  Eye, 
  Music, 
  Trees, 
  ChevronRight,
  RefreshCw,
  Info,
  Layers,
  Sparkles,
  Play,
  Pause,
  Shuffle,
  DraftingCompass
} from 'lucide-react';
import * as d3 from 'd3';
import { cn } from './lib/utils';
import { generateMathematicalStory } from './services/geminiService';

// --- Types ---
type Section = 'intro' | 'primes' | 'fractals' | 'randomness' | 'philosophy' | 'storyteller';

// --- Components ---

const TrinityVisualization = () => {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Triangle Lines */}
        <motion.path
          d="M 200 50 L 350 320 L 50 320 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Nodes */}
        <g>
          <circle cx="200" cy="50" r="40" fill="var(--color-bg)" stroke="currentColor" strokeWidth="2" />
          <text x="200" y="55" textAnchor="middle" className="text-[12px] font-mono fill-current">MATHEMATICS</text>
          
          <circle cx="350" cy="320" r="40" fill="var(--color-bg)" stroke="currentColor" strokeWidth="2" />
          <text x="350" y="325" textAnchor="middle" className="text-[12px] font-mono fill-current">NATURE</text>
          
          <circle cx="50" cy="320" r="40" fill="var(--color-bg)" stroke="currentColor" strokeWidth="2" />
          <text x="50" y="325" textAnchor="middle" className="text-[12px] font-mono fill-current">CREATIVE ARTS</text>
        </g>

        {/* Connections */}
        <motion.path d="M 200 90 L 350 280" stroke="var(--color-accent)" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
        <motion.path d="M 310 320 L 90 320" stroke="var(--color-accent)" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
        <motion.path d="M 50 280 L 200 90" stroke="var(--color-accent)" strokeWidth="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-bg/80 p-4 rounded-full border border-ink/10 backdrop-blur-sm">
          <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">The Trinity of</p>
          <p className="text-xl font-serif italic">Structure</p>
        </div>
      </div>
    </div>
  );
};

const PrimeVisualizer = () => {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'messiaen' | 'cicada'>('messiaen');
  const [isPlaying, setIsPlaying] = useState(true);
  
  const p1 = mode === 'messiaen' ? 17 : 13;
  const p2 = mode === 'messiaen' ? 29 : 17;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (p1 * p2));
    }, 100);
    return () => clearInterval(timer);
  }, [isPlaying, p1, p2]);

  return (
    <div className="p-6 border border-ink/20 rounded-lg bg-white/50 backdrop-blur-sm relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-tighter opacity-60">
            {mode === 'messiaen' ? "Messiaen's Blueprint" : "Nature's Evolutionary Strategy"}
          </h3>
          <p className="text-2xl font-serif italic">The Timelessness of Primes</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-ink/5 p-1 rounded-md">
            <button 
              onClick={() => { setMode('messiaen'); setStep(0); }}
              className={cn("px-3 py-1 text-[10px] font-mono uppercase rounded transition-all", mode === 'messiaen' ? "bg-ink text-bg" : "opacity-40")}
            >
              Music
            </button>
            <button 
              onClick={() => { setMode('cicada'); setStep(0); }}
              className={cn("px-3 py-1 text-[10px] font-mono uppercase rounded transition-all", mode === 'cicada' ? "bg-ink text-bg" : "opacity-40")}
            >
              Cicadas
            </button>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 hover:bg-ink/5 rounded-full"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>

      <div className="text-right font-mono text-[10px] mb-2 opacity-40">
        <p>P1: {p1} | P2: {p2} | SYNC_POINT: {p1 * p2}</p>
      </div>

      <div className="relative h-32 flex items-center gap-1 overflow-hidden border-y border-ink/5 py-4">
        {Array.from({ length: 60 }).map((_, i) => {
          const s = (step + i) % (p1 * p2);
          const isP1 = s % p1 === 0;
          const isP2 = s % p2 === 0;
          return (
            <motion.div
              key={i}
              className={cn(
                "w-3 rounded-full transition-all duration-300",
                isP1 && isP2 ? "h-24 bg-accent shadow-[0_0_15px_rgba(242,125,38,0.5)]" :
                isP1 ? "h-16 bg-ink/40" :
                isP2 ? "h-16 bg-blueprint/40" :
                "h-4 bg-ink/5"
              )}
            />
          );
        })}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className={cn("p-3 border rounded transition-all", mode === 'cicada' ? "border-accent bg-accent/5" : "border-ink/10 opacity-50")}>
          <span className="text-accent font-bold">Nature:</span> Periodic cicadas emerge every 13 or 17 years. These prime cycles are an evolutionary strategy to stay "out of sync" with predators.
        </div>
        <div className={cn("p-3 border rounded transition-all", mode === 'messiaen' ? "border-blueprint bg-blueprint/5" : "border-ink/10 opacity-50")}>
          <span className="text-blueprint font-bold">Music:</span> Messiaen used a 17-note rhythm and a 29-chord sequence. They remain out of sync for 493 steps, creating a sense of "timelessness".
        </div>
      </div>
    </div>
  );
};

const FractalVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chaos, setChaos] = useState(10);
  const [depth, setDepth] = useState(9);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let angle = 0;

    const drawTree = (x: number, y: number, len: number, deg: number, currentDepth: number) => {
      if (currentDepth === 0) return;

      const x2 = x + len * Math.cos(deg * Math.PI / 180);
      const y2 = y + len * Math.sin(deg * Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(20, 20, 20, ${currentDepth / 10})`;
      ctx.lineWidth = currentDepth / 2;
      ctx.stroke();

      const angleOffset = Math.sin(angle) * chaos;
      drawTree(x2, y2, len * 0.75, deg - 25 + angleOffset, currentDepth - 1);
      drawTree(x2, y2, len * 0.75, deg + 25 + angleOffset, currentDepth - 1);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.02;
      drawTree(canvas.width / 2, canvas.height - 20, 60, -90, depth);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [chaos, depth]);

  return (
    <div className="p-6 border border-ink/20 rounded-lg bg-white/50 backdrop-blur-sm">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-tighter opacity-60">The Geometry of Nature</h3>
          <p className="text-2xl font-serif italic">Fractal Blueprints</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase opacity-40">Chaos Factor</p>
            <input 
              type="range" min="0" max="30" value={chaos} 
              onChange={(e) => setChaos(Number(e.target.value))}
              className="w-24 accent-accent"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase opacity-40">Depth</p>
            <input 
              type="range" min="4" max="11" value={depth} 
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-24 accent-blueprint"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <canvas ref={canvasRef} width={300} height={300} className="bg-ink/5 rounded-lg border border-ink/5" />
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Sparkles size={14} className="text-accent" />
              Jackson Pollock
            </p>
            <p className="text-xs text-ink/70 leading-relaxed">
              Drip paintings contain fractal patterns used by mathematicians to verify authenticity. Fakes often lack this specific "chaotic pendulum" geometry.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Layers size={14} className="text-blueprint" />
              Pixar & Marvel
            </p>
            <p className="text-xs text-ink/70 leading-relaxed">
              Pixar uses fractal math for realistic jungles in <span className="italic">Up</span>. Marvel used a 3D fractal called the <span className="font-mono">Mandelbulb</span> for Ego the Living Planet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MusicalDiceGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const newSeq = Array.from({ length: 8 }).map(() => Math.floor(Math.random() * 11) + 2);
      setSequence(newSeq);
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className="p-6 border border-ink/10 rounded-lg bg-white/30 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xs font-mono uppercase tracking-widest opacity-50">Mozart's Dice Game</h4>
        <button 
          onClick={rollDice}
          disabled={isRolling}
          className="flex items-center gap-2 px-4 py-2 bg-ink text-bg rounded font-mono text-[10px] uppercase hover:bg-accent transition-colors disabled:opacity-50"
        >
          <Shuffle size={12} className={isRolling ? "animate-spin" : ""} />
          Roll Composition
        </button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-4">
        {sequence.length > 0 ? sequence.map((val, i) => (
          <motion.div
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex-shrink-0 w-12 h-20 border border-ink/20 flex flex-col items-center justify-center bg-white rounded shadow-sm"
          >
            <span className="text-[10px] font-mono opacity-30">BAR {i+1}</span>
            <span className="text-lg font-serif italic">{val}</span>
          </motion.div>
        )) : (
          <div className="w-full h-20 border border-dashed border-ink/20 flex items-center justify-center text-[10px] font-mono opacity-30">
            Roll to generate a waltz sequence
          </div>
        )}
      </div>
      <p className="mt-4 text-[10px] font-mono opacity-50 leading-relaxed">
        Mozart's "Musikalisches Würfelspiel" allowed players to compose a waltz by randomly selecting from pre-written bars of music.
      </p>
    </div>
  );
};

const UnfortunatesReader = () => {
  const chapters = [
    "The First Chapter (Fixed)",
    "A memory of a rainy afternoon in Nottingham.",
    "The smell of old books and damp wool.",
    "A conversation overheard at a football match.",
    "The random nature of human memory.",
    "A sudden realization of loss.",
    "The Last Chapter (Fixed)"
  ];
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6]);

  const shuffle = () => {
    const middle = [1, 2, 3, 4, 5];
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }
    setOrder([0, ...middle, 6]);
  };

  return (
    <div className="p-6 border border-ink/10 rounded-lg bg-white/30 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xs font-mono uppercase tracking-widest opacity-50">B.S. Johnson's Box</h4>
        <button 
          onClick={shuffle}
          className="flex items-center gap-2 px-4 py-2 border border-ink/20 rounded font-mono text-[10px] uppercase hover:bg-ink hover:text-bg transition-colors"
        >
          <RefreshCw size={12} />
          Shuffle Memory
        </button>
      </div>
      
      <div className="space-y-2">
        {order.map((idx, i) => (
          <motion.div
            key={idx}
            layout
            className={cn(
              "p-3 text-xs font-serif border rounded transition-colors",
              idx === 0 || idx === 6 ? "bg-ink/5 border-ink/20 italic" : "bg-white border-ink/10"
            )}
          >
            <span className="font-mono text-[8px] opacity-30 mr-2">SEC {i+1}</span>
            {chapters[idx]}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[10px] font-mono opacity-50 leading-relaxed">
        "The Unfortunates" consists of 27 chapters in a box. Aside from the first and last, they can be read in any order to simulate random memory.
      </p>
    </div>
  );
};

const GeminiStoryteller = () => {
  const [concept, setConcept] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTellStory = async () => {
    if (!concept) return;
    setIsLoading(true);
    const result = await generateMathematicalStory(concept);
    setStory(result);
    setIsLoading(false);
  };

  return (
    <div className="p-8 border border-ink/20 rounded-lg bg-white/50 backdrop-blur-sm space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-serif italic">The Narrative Proof</h3>
        <p className="text-sm text-ink/60">
          Ask the AI to weave a mathematical concept into a narrative journey.
        </p>
      </div>

      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="e.g. Entropy, The Golden Ratio, Infinity..."
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="flex-1 bg-ink/5 border border-ink/10 rounded px-4 py-2 text-sm font-mono focus:outline-none focus:border-accent"
        />
        <button 
          onClick={handleTellStory}
          disabled={isLoading || !concept}
          className="bg-ink text-bg px-6 py-2 rounded font-mono text-xs uppercase hover:bg-accent transition-colors disabled:opacity-50"
        >
          {isLoading ? "Drafting..." : "Generate Narrative"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {story && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-blueprint/5 border-l-4 border-blueprint rounded-r-lg"
          >
            <div className="flex items-center gap-2 mb-4 text-blueprint opacity-60">
              <Sparkles size={16} />
              <span className="text-[10px] font-mono uppercase tracking-widest">AI Narrative Output</span>
            </div>
            <div className="prose prose-sm font-serif italic leading-relaxed text-ink/80">
              {story}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RandomnessVisualizer = () => {
  const [grid, setGrid] = useState<string[]>([]);
  
  const generateGrid = () => {
    const colors = ['#F27D26', '#2A4B7C', '#141414', '#E4E3E0', '#8E9299', '#FFFFFF'];
    const newGrid = Array.from({ length: 64 }).map(() => colors[Math.floor(Math.random() * colors.length)]);
    setGrid(newGrid);
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div className="space-y-8">
      <div className="p-6 border border-ink/20 rounded-lg bg-white/50 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-tighter opacity-60">Chance as a Constraint</h3>
            <p className="text-2xl font-serif italic">Randomness & Order</p>
          </div>
          <button 
            onClick={generateGrid}
            className="p-2 hover:bg-ink/5 rounded-full transition-colors"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="grid grid-cols-8 gap-1 aspect-square w-full max-w-[300px] mx-auto mb-8">
          {grid.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.005 }}
              style={{ backgroundColor: color }}
              className="w-full h-full border border-ink/5"
            />
          ))}
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-1" />
            <p><span className="font-bold">Gerhard Richter:</span> Random color placement in "4900 Colors" verified by statistical analysis.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MusicalDiceGame />
        <UnfortunatesReader />
      </div>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('intro');
  const [isDraftingMode, setIsDraftingMode] = useState(true);

  const sections = [
    { id: 'intro', label: 'The Blueprint', icon: Triangle },
    { id: 'primes', label: 'Primes & Time', icon: Binary },
    { id: 'fractals', label: 'Fractal Nature', icon: Trees },
    { id: 'randomness', label: 'Order in Chaos', icon: Dices },
    { id: 'storyteller', label: 'AI Narratives', icon: Sparkles },
    { id: 'philosophy', label: 'The Narrative', icon: BookOpen },
  ];

  return (
    <div className={cn(
      "min-h-screen selection:bg-accent/30 transition-colors duration-500",
      isDraftingMode ? "blueprint-grid" : "bg-white"
    )}>
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-16 md:w-64 border-r border-ink/10 bg-bg/80 backdrop-blur-md z-50 flex flex-col">
        <div className="p-4 md:p-8 border-bottom border-ink/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink text-bg flex items-center justify-center rounded-sm">
              <span className="font-mono font-bold">B</span>
            </div>
            <h1 className="hidden md:block text-xs font-mono font-bold uppercase tracking-widest">Blueprints</h1>
          </div>
        </div>
        
        <div className="flex-1 py-8 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as Section)}
              className={cn(
                "w-full flex items-center gap-4 px-4 md:px-8 py-3 transition-all group",
                activeSection === s.id ? "text-accent border-r-2 border-accent bg-accent/5" : "text-ink/40 hover:text-ink hover:bg-ink/5"
              )}
            >
              <s.icon size={20} />
              <span className="hidden md:block text-xs font-mono uppercase tracking-tighter">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 md:p-8 border-t border-ink/10 space-y-4">
          <button 
            onClick={() => setIsDraftingMode(!isDraftingMode)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded text-[10px] font-mono uppercase transition-all",
              isDraftingMode ? "bg-accent text-white" : "bg-ink/5 text-ink/40"
            )}
          >
            <DraftingCompass size={14} />
            <span className="hidden md:block">Drafting Mode</span>
          </button>
          <div className="text-[10px] font-mono opacity-30 hidden md:block">
            © 2026 BLUEPRINT LABS<br />
            STRUCTURAL ANALYSIS
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pl-16 md:pl-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24">
          <AnimatePresence mode="wait">
            {activeSection === 'intro' && (
              <motion.section
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl font-serif leading-tight">
                    How Mathematics <br />
                    <span className="italic">Shapes Creativity</span>
                  </h2>
                  <p className="max-w-2xl text-lg text-ink/70 leading-relaxed font-light">
                    Mathematics is the study of structure. Artists use these structures as "blueprints" or constraints to trigger creativity, connecting the realms of nature and the arts.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <TrinityVisualization />
                  <div className="space-y-6">
                    <div className="p-6 border-l-2 border-accent bg-white/30">
                      <p className="text-sm italic font-serif mb-4">"Structure is not a cage, but a springboard."</p>
                      <p className="text-xs font-mono leading-relaxed opacity-60">
                        The Trinity of Structure visualizes how patterns originate in nature, are modeled by mathematics, and are utilized by artists to create meaning.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveSection('primes')}
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-accent transition-colors"
                    >
                      Explore the Blueprints <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {activeSection === 'primes' && (
              <motion.section
                key="primes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-4xl font-serif italic">Prime Numbers</h2>
                  <p className="text-ink/70 leading-relaxed">
                    Primes are the "atoms" of mathematics. Their inability to be divided creates unique cycles that nature and art use to stay "out of sync."
                  </p>
                </div>
                <div className="grid md:grid-cols-1 gap-8">
                  <PrimeVisualizer />
                </div>
              </motion.section>
            )}

            {activeSection === 'fractals' && (
              <motion.section
                key="fractals"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-4xl font-serif italic">Fractals</h2>
                  <p className="text-ink/70 leading-relaxed">
                    The geometry of nature is self-similar. From the drip paintings of Pollock to the CGI jungles of Pixar, fractals provide the blueprint for organic complexity.
                  </p>
                </div>
                <FractalVisualizer />
              </motion.section>
            )}

            {activeSection === 'randomness' && (
              <motion.section
                key="randomness"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="max-w-2xl space-y-4">
                  <h2 className="text-4xl font-serif italic">Randomness</h2>
                  <p className="text-ink/70 leading-relaxed">
                    By surrendering control to chance, artists like Richter and Mozart discover structures that the conscious mind might never conceive.
                  </p>
                </div>
                <RandomnessVisualizer />
              </motion.section>
            )}

            {activeSection === 'storyteller' && (
              <motion.section
                key="storyteller"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <GeminiStoryteller />
              </motion.section>
            )}

            {activeSection === 'philosophy' && (
              <motion.section
                key="philosophy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-accent">
                        <BookOpen size={20} />
                        <span className="text-xs font-mono uppercase tracking-widest">Math as Storytelling</span>
                      </div>
                      <h3 className="text-3xl font-serif italic">The Narrative Proof</h3>
                      <p className="text-ink/70 leading-relaxed">
                        A mathematical proof is a narrative. It takes the reader on a journey, connecting two seemingly unrelated realms through a logical sequence of events.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-accent">
                        <Cpu size={20} />
                        <span className="text-xs font-mono uppercase tracking-widest">Aesthetics vs. AI</span>
                      </div>
                      <h3 className="text-3xl font-serif italic">The Human Filter</h3>
                      <p className="text-ink/70 leading-relaxed">
                        AI can generate infinite structures, but humans provide the <span className="font-bold">aesthetic judgment</span> to decide which of those structures are actually interesting or meaningful.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="p-8 border border-ink/10 bg-ink text-bg rounded-lg space-y-6">
                      <div className="flex items-center gap-2 opacity-50">
                        <Eye size={20} />
                        <span className="text-xs font-mono uppercase tracking-widest">Evolutionary Beauty</span>
                      </div>
                      <p className="text-xl font-serif italic leading-relaxed">
                        "Our brains 'light up' at symmetry and fractals because recognizing these patterns in the jungle once helped our ancestors survive."
                      </p>
                      <div className="pt-6 border-t border-bg/10 flex justify-between items-center">
                        <span className="text-[10px] font-mono uppercase">Survival Instinct</span>
                        <span className="text-[10px] font-mono uppercase">Pattern Recognition</span>
                      </div>
                    </div>

                    <div className="p-6 border border-ink/10 rounded-lg flex gap-4 items-start">
                      <Info className="text-accent shrink-0" size={20} />
                      <p className="text-xs font-mono leading-relaxed opacity-60">
                        Data sourced from the lecture "Blueprints: How Mathematics Shapes Creativity". Full video available at the Royal Institution.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Background Micro-details */}
      {isDraftingMode && (
        <div className="fixed bottom-8 right-8 pointer-events-none opacity-20 hidden lg:block">
          <div className="font-mono text-[10px] space-y-1">
            <p>COORD_X: 40.7128° N</p>
            <p>COORD_Y: 74.0060° W</p>
            <p>STRUCT_ID: 0x7F2A9</p>
            <p>BLUEPRINT_VER: 1.0.4</p>
          </div>
        </div>
      )}
    </div>
  );
}
