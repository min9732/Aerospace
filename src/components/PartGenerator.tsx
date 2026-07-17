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
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-[#e5e5e5] pb-8">
        <h2 className="text-[28px] font-bold text-hanwha-dark uppercase tracking-tighter">Standard Part Generator</h2>
        <p className="text-[14px] text-hanwha-gray-400 mt-1">Generate aerospace-grade standard models with custom parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-hanwha-dark text-white p-8 shadow-xl relative overflow-hidden border border-white/5">
            <div className="relative z-10">
              <h3 className="text-[16px] font-bold mb-8 flex items-center gap-2 uppercase tracking-widest">
                <Settings className="w-4 h-4 text-hanwha-orange" />
                Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] mb-3 leading-none">Category</label>
                  <select 
                    className="w-full bg-hanwha-gray-800 border border-white/5 rounded-none px-4 py-3.5 text-sm focus:ring-2 focus:ring-hanwha-orange focus:outline-none transition-all text-slate-200"
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
                  <label className="block text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] mb-3 leading-none">Item Type</label>
                  <select 
                    className="w-full bg-hanwha-gray-800 border border-white/5 rounded-none px-4 py-3.5 text-sm focus:ring-2 focus:ring-hanwha-orange focus:outline-none transition-all text-slate-200"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    {selectedLib.items.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] mb-3 leading-none">Size (mm)</label>
                    <input 
                      type="text" 
                      value={params.size}
                      onChange={(e) => setParams({...params, size: e.target.value})}
                      className="w-full bg-hanwha-gray-800 border border-white/5 rounded-none px-4 py-3.5 text-sm text-slate-200 focus:ring-1 focus:ring-hanwha-orange outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] mb-3 leading-none">Length (mm)</label>
                    <input 
                      type="text" 
                      value={params.length}
                      onChange={(e) => setParams({...params, length: e.target.value})}
                      className="w-full bg-hanwha-gray-800 border border-white/5 rounded-none px-4 py-3.5 text-sm text-slate-200 focus:ring-1 focus:ring-hanwha-orange outline-none" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full mt-6 bg-hanwha-orange hover:bg-orange-600 text-white py-4 text-[12px] font-bold shadow-lg shadow-orange-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hanwha-button-active uppercase tracking-[0.2em]"
                >
                  {generating ? <Plus className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                  {generating ? 'Processing...' : 'Generate CATIA Model'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-hanwha-dark border border-white/5 h-[500px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(#2a2a2c_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-30"></div>
            
            {/* Simulated 3D Part */}
            <motion.div 
              animate={{ rotateY: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0 bg-hanwha-orange/5 rounded-full blur-3xl"></div>
              {/* This represents a "standard part" visual */}
              <div className="w-full h-full border border-white/10 flex items-center justify-center bg-hanwha-gray-900 backdrop-blur-sm shadow-2xl relative">
                <Box className="w-32 h-32 text-hanwha-orange drop-shadow-[0_0_15px_rgba(243,115,33,0.3)]" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-hanwha-gray-400 uppercase tracking-widest">
                  SYS_REF: HW_AERO_2026
                </div>
              </div>
            </motion.div>

            {/* Overlay UI */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="px-3 py-1 bg-hanwha-orange text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">Live Render</span>
              <span className="px-3 py-1 bg-hanwha-gray-800 text-hanwha-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/5">Auto-Spin</span>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="p-3 bg-hanwha-gray-800 text-white hover:bg-hanwha-gray-700 transition-colors hanwha-button-active">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {generatedPart && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#e5e5e5] p-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-green-50 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-bold text-hanwha-dark uppercase tracking-tighter">{generatedPart.partNumber}</h4>
                    <p className="text-[13px] text-hanwha-gray-400">Generated successfully at {generatedPart.timestamp} • {generatedPart.fileSize}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="p-3 bg-white border border-[#e5e5e5] hover:bg-slate-50 transition-colors hanwha-button-active">
                    <Copy className="w-4 h-4 text-hanwha-gray-400" />
                  </button>
                  <button className="flex items-center gap-2 px-8 py-3 bg-hanwha-dark text-white text-[12px] font-bold hover:bg-hanwha-gray-900 transition-all hanwha-button-active uppercase tracking-widest">
                    <LinkIcon className="w-4 h-4 text-hanwha-orange" />
                    Sync to Assembly
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


