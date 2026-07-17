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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Drawing Audit</h2>
          <p className="text-slate-500 mt-2">Intelligent rule-based verification for aerospace blueprints.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <Settings2 className="w-4 h-4" />
            Audit Rules
          </button>
          <button 
            onClick={handleAudit}
            disabled={auditing}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {auditing ? <Scan className="w-5 h-5 animate-pulse" /> : <Scan className="w-5 h-5" />}
            {auditing ? 'Scanning Drawing...' : 'Start Audit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Drawing Viewer Mockup */}
        <div className="lg:col-span-7">
          <div className="bg-slate-100 rounded-2xl border-2 border-slate-200 h-[600px] relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
            
            <div className="relative text-center p-12 bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md transform group-hover:scale-[1.02] transition-transform">
              <FileSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-slate-900">Blueprint Viewer</h4>
              <p className="text-slate-500 mt-2">Upload a drawing to visualize localized error reports and coordinate-based feedback.</p>
              <button className="mt-6 px-6 py-2 bg-slate-100 text-slate-900 rounded-lg font-medium hover:bg-slate-200">
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
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Validation Results</h3>
              {results && (
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {results.filter(r => r.type === 'Error').length} Critical Errors
                </span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!results && !auditing && (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <ShieldCheck className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-medium">Run scan to view compliance report</p>
                </div>
              )}

              {auditing && (
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-20 bg-slate-50 rounded-xl animate-pulse" />
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
                    "p-3 border rounded-xl flex items-center justify-between group cursor-pointer transition-all hover:shadow-sm",
                    result.type === 'Error' ? 'border-red-100 bg-red-50/50' : 'border-slate-100 bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                      result.type === 'Error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    )}>
                      {result.type === 'Error' ? '!' : '✓'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{result.message}</p>
                      <p className="text-[10px] text-slate-500 italic tracking-tight">{result.section}</p>
                    </div>
                  </div>
                  {result.type === 'Error' && (
                    <button className="text-[10px] font-bold text-red-600 underline opacity-0 group-hover:opacity-100 transition-opacity">LOCATE</button>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button className="w-full text-blue-600 text-sm font-bold hover:underline">
                Generate Full Compliance PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
