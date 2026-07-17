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
      <div className="mb-8">
        <h2 className="text-[34px] font-bold text-[#1d1d1f] apple-tight">Standard Part Generator</h2>
        <p className="text-[17px] text-slate-500 mt-1">Generate aerospace-grade standard models with custom parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1d1d1f] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-white/5">
            <div className="relative z-10">
              <h3 className="text-[21px] font-bold mb-8 flex items-center gap-2 apple-tight">
                <Settings className="w-5 h-5 text-[#0066cc]" />
                Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 leading-none">Category</label>
                  <select 
                    className="w-full bg-[#2a2a2c] border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#0066cc] focus:outline-none transition-all text-slate-200"
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
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 leading-none">Item Type</label>
                  <select 
                    className="w-full bg-[#2a2a2c] border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#0066cc] focus:outline-none transition-all text-slate-200"
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                  >
                    {selectedLib.items.map(item => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 leading-none">Size (mm)</label>
                    <input 
                      type="text" 
                      value={params.size}
                      onChange={(e) => setParams({...params, size: e.target.value})}
                      className="w-full bg-[#2a2a2c] border-none rounded-xl px-4 py-3.5 text-sm text-slate-200" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 leading-none">Length (mm)</label>
                    <input 
                      type="text" 
                      value={params.length}
                      onChange={(e) => setParams({...params, length: e.target.value})}
                      className="w-full bg-[#2a2a2c] border-none rounded-xl px-4 py-3.5 text-sm text-slate-200" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full mt-6 bg-[#0066cc] hover:bg-[#0071e3] text-white py-4 rounded-full text-[13px] font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 button-active-scale uppercase tracking-widest"
                >
                  {generating ? <Plus className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                  {generating ? 'Generating...' : 'Generate CATIA Model'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#1d1d1f] rounded-3xl border border-white/5 h-[500px] relative overflow-hidden flex items-center justify-center group shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(#2a2a2c_1.5px,transparent_1.5px)] [background-size:30px_30px] opacity-30"></div>
            
            {/* Simulated 3D Part */}
            <motion.div 
              animate={{ 
                rotateY: [0, 360],
                rotateX: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0 bg-[#0066cc]/10 rounded-full blur-3xl"></div>
              {/* This represents a "standard part" visual */}
              <div className="w-full h-full border-4 border-white/5 rounded-xl flex items-center justify-center bg-[#2a2a2c] backdrop-blur-sm shadow-2xl relative">
                <Box className="w-32 h-32 text-[#0066cc] drop-shadow-[0_0_15px_rgba(0,102,204,0.4)]" />
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-600">
                  REF: CAD_INT_772
                </div>
              </div>
            </motion.div>

            {/* Overlay UI */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="px-3 py-1 bg-[#0066cc] text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">Live Preview</span>
              <span className="px-3 py-1 bg-[#2a2a2c] text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-white/5">360° Spin</span>
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
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[17px] font-bold text-[#1d1d1f] apple-tight">{generatedPart.partNumber}</h4>
                    <p className="text-sm text-slate-500">Generated successfully at {generatedPart.timestamp} • {generatedPart.fileSize}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors button-active-scale">
                    <Copy className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-[#0066cc] text-white rounded-full text-[13px] font-bold shadow-lg shadow-blue-200 hover:bg-[#0071e3] transition-all button-active-scale uppercase tracking-widest">
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


