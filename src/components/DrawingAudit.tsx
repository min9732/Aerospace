import React, { useState } from 'react';
import { 
  Scan, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  ChevronRight,
  FileSearch,
  Settings2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { AuditResult } from '@/types';

export function DrawingAudit() {
  const [auditing, setAuditing] = useState(false);
  const [results, setResults] = useState<AuditResult[] | null>(null);

  const handleAudit = async () => {
    setAuditing(true);
    setResults(null);
    
    // Simulate Gemini Audit
    setTimeout(async () => {
      const mockDrawingText = "Part: Bracket-A1, Material: Al-7075, Heat: T6, Tolerance: +/- 0.5";
      const response = await fetch('/api/audit/drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textContent: mockDrawingText, rules: "Check for standard aerospace tolerances." })
      });
      const data = await response.json();
      setResults(data.results || [
        { type: 'Error', message: 'Missing geometric tolerance for mounting holes.', section: 'Geometric Specs' },
        { type: 'Warning', message: 'Title block uses outdated revision (C) - latest is D.', section: 'Metadata' },
        { type: 'Error', message: 'Edge radius (R2.0) overlaps with dimension line A-A.', section: 'Dimension Audit' }
      ]);
      setAuditing(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[34px] font-bold text-[#1d1d1f] apple-tight">Drawing Intelligence Audit</h2>
          <p className="text-[17px] text-slate-500 mt-1">AI-powered validation of manufacturing annotations and GD&T symbols.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-bold text-slate-600 shadow-sm hover:border-[#0066cc] hover:text-[#0066cc] transition-all button-active-scale">
            <Settings2 className="w-4 h-4" />
            Audit Rules
          </button>
          <button 
            onClick={handleAudit}
            disabled={auditing}
            className="flex items-center gap-2 px-6 py-2 bg-[#0066cc] text-white rounded-full text-[13px] font-bold shadow-lg shadow-blue-200 hover:bg-[#0071e3] transition-all disabled:opacity-50 button-active-scale"
          >
            {auditing ? <Scan className="w-5 h-5 animate-pulse" /> : <Scan className="w-5 h-5" />}
            {auditing ? 'Scanning Drawing...' : 'Start Audit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Drawing Viewer Mockup */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 h-[600px] relative overflow-hidden flex items-center justify-center group shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
            
            <div className="relative text-center p-12 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md transform group-hover:scale-[1.02] transition-transform">
              <FileSearch className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h4 className="text-[21px] font-bold text-[#1d1d1f] apple-tight">Blueprint Viewer</h4>
              <p className="text-sm text-slate-500 mt-2">Upload a drawing to visualize localized error reports and coordinate-based feedback.</p>
              <button className="mt-6 px-6 py-2 bg-slate-100 text-[#1d1d1f] rounded-full text-[13px] font-bold hover:bg-slate-200 transition-colors button-active-scale">
                Select File
              </button>
            </div>

            {/* Simulated Error Indicators */}
            {results && results.map((_, i) => (
              <motion.div 
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ top: `${20 + i * 25}%`, left: `${30 + i * 15}%` }}
                className="absolute w-8 h-8 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500/40"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel: Audit Logs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest leading-none">Validation Results</h3>
              {results && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-md text-[9px] font-bold uppercase tracking-tight">
                  {results.filter(r => r.type === 'Error').length} Critical Errors
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {!results && !auditing && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <ShieldCheck className="w-12 h-12 mb-4 opacity-10 text-[#0066cc]" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Awaiting drawing scan</p>
                </div>
              )}

              {auditing && (
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-20 bg-slate-50 rounded-xl animate-pulse border border-slate-100" />
                  ))}
                </div>
              )}

              {results && results.map((result, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className={cn(
                    "p-4 border rounded-xl flex items-center justify-between group cursor-pointer transition-all hover:border-[#0066cc]/30 bg-white shadow-sm",
                    result.type === 'Error' ? 'border-red-50' : 'border-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      result.type === 'Error' ? 'bg-red-500' : 'bg-[#0066cc]'
                    )}></div>
                    <div>
                      <p className="text-sm font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">{result.message}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight mt-0.5">{result.section}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0066cc] transition-all" />
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-[#0066cc] uppercase tracking-widest hover:bg-[#0066cc] hover:text-white transition-all shadow-sm button-active-scale">
                Generate Full Compliance PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
