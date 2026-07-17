import React, { useState } from 'react';
import { 
  Box, 
  Settings, 
  CheckCircle, 
  Link as LinkIcon,
  Maximize2,
  Copy,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const libraries = [
  { id: 'fastener', name: 'Aerospace Fasteners', items: ['MS21042 Nut', 'NAS1149 Washer', 'MS20426 Rivet', 'AN3 Bolt'] },
  { id: 'bearing', name: 'Precision Bearings', items: ['D-Series Roller', 'Needle Bushing', 'Spherical Joint'] },
  { id: 'bracket', name: 'Standard Brackets', items: ['L-Profile (Angle)', 'U-Channel Support'] },
];

export function PartGenerator() {
  const [selectedLib, setSelectedLib] = useState(libraries[0]);
  const [selectedItem, setSelectedItem] = useState(libraries[0].items[0]);
  const [params, setParams] = useState({ size: 'M5', length: '12', pitch: '0.8', material: 'Steel' });
  const [generating, setGenerating] = useState(false);
  const [generatedPart, setGeneratedPart] = useState<any>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedPart({
        partNumber: `AN3-${params.size}-${params.length}`,
        timestamp: new Date().toLocaleTimeString(),
        fileSize: '1.2 MB'
      });
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Standard Part Generator</h2>
        <p className="text-slate-500 mt-2">Generate aerospace-grade standard models with custom parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0F172A] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Quick Part Generator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-200"
                    value={selectedLib.id}
                    onChange={(e) => {
                      const lib = libraries.find(l => l.id === e.target.value)!;
                      setSelectedLib(lib);
                      setSelectedItem(lib.items[0]);
                    }}
                  >
                    {libraries.map(lib => <option key={lib.id} value={lib.id}>{lib.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Item Type</label>
                  <select 
                    className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-slate-200"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    {selectedLib.items.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Size (mm)</label>
                    <input 
                      type="text" 
                      value={params.size}
                      onChange={(e) => setParams({...params, size: e.target.value})}
                      className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs text-slate-200" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Length (mm)</label>
                    <input 
                      type="text" 
                      value={params.length}
                      onChange={(e) => setParams({...params, length: e.target.value})}
                      className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-xs text-slate-200" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-xs font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {generating ? <Plus className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                  {generating ? 'GENERATING...' : 'GENERATE CATIA MODEL'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 h-[500px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-30"></div>
            
            {/* Simulated 3D Part */}
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                rotateX: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl"></div>
              {/* This represents a "standard part" visual */}
              <div className="w-full h-full border-4 border-blue-500/30 rounded-xl flex items-center justify-center bg-slate-800/80 backdrop-blur-sm shadow-2xl relative">
                <Box className="w-32 h-32 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-500">
                  REF: CAD_INT_772
                </div>
              </div>
            </motion.div>

            {/* Overlay UI */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">LIVE PREVIEW</span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-slate-700">360° SPIN</span>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {generatedPart && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{generatedPart.partNumber}</h4>
                    <p className="text-xs text-slate-500">Generated successfully at {generatedPart.timestamp} • {generatedPart.fileSize}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                    <LinkIcon className="w-4 h-4" />
                    Apply Constraints
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


