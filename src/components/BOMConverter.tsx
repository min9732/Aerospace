import React, { useState } from 'react';
import { 
  FileUp, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  FileText,
  RefreshCw,
  Search
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Part } from '@/types';

export function BOMConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ issues: string[], erpBOM: any[] } | null>(null);
  const [parts, setParts] = useState<Part[]>([
    { id: '1', partNumber: 'G-742-991', quantity: 2, material: 'Titanium Ti-6Al-4V', weight: 1.2, description: 'Engine Housing Bracket' },
    { id: '2', partNumber: 'F-102-SB', quantity: 4, material: 'Inconel 718', weight: 0.45, description: 'Structural Fastener' },
    { id: '3', partNumber: 'B-882-90', quantity: 1, material: 'Aluminum 7075', weight: 2.1, description: 'Compressor Blade Cover' },
  ]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Auto-process simulation
    handleProcess();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
    }
  } as any);

  const handleProcess = async () => {
    setProcessing(true);
    setResults(null);
    
    // Simulate API call
    setTimeout(async () => {
      const response = await fetch('/api/bom/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parts })
      });
      const data = await response.json();
      setResults(data);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[34px] font-bold text-[#1d1d1f] apple-tight">Smart BOM Converter</h2>
          <p className="text-[17px] text-slate-500 mt-1">Extract and validate CATIA assembly data for ERP integration.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors button-active-scale">
            Version History
          </button>
          <button className="px-6 py-2 bg-[#0066cc] text-white rounded-full text-[13px] font-bold shadow-lg shadow-blue-200 hover:bg-[#0071e3] transition-all flex items-center gap-2 button-active-scale">
            <Download className="w-4 h-4" />
            Export to ERP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            {...getRootProps()} 
            className={cn(
              "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 min-h-[260px] flex flex-col items-center justify-center",
              isDragActive ? "border-[#0066cc] bg-blue-50/50" : "border-slate-200 bg-white hover:border-[#0066cc]"
            )}
          >
            <input {...getInputProps()} />
            <div className="p-4 bg-blue-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
              <FileUp className="w-8 h-8 text-[#0066cc]" />
            </div>
            <p className="text-[17px] font-bold text-[#1d1d1f]">Drag & Drop CATIA Assembly</p>
            <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Supports .CATProduct, .CATPart or .xlsx</p>
          </div>

          <AnimatePresence>
            {processing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-[#0066cc] rounded-xl p-4 text-white shadow-xl shadow-blue-200 flex items-center gap-3"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider">Analyzing Product Tree...</span>
              </motion.div>
            )}

            {results && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">Integrity Report</h3>
                  <span className="text-[9px] font-bold bg-blue-100 text-[#0066cc] px-2 py-0.5 rounded-md uppercase">VERIFIED</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1d1d1f]">Structure Mapped</p>
                      <p className="text-[11px] text-slate-500">3 Level Hierarchy Identified</p>
                    </div>
                  </div>
                  {results.issues.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-tight">{results.issues.length} Discrepancies</span>
                      </div>
                      <ul className="text-[10px] text-slate-500 space-y-1 pl-4 list-disc font-medium">
                        {results.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data View Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full min-h-[600px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <h3 className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-widest leading-none">Extracted Part Data</h3>
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter parts..." 
                  className="bg-transparent border-none text-[13px] focus:ring-0 w-32 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
            <div className="overflow-x-auto grow">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4">Part Number</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4 text-center">Material</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[14px]">
                  {parts.map((part) => (
                    <tr key={part.id} className="hover:bg-slate-50 transition-colors group cursor-default">
                      <td className="px-6 py-4 font-mono font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0066cc] transition-colors">{part.partNumber}</td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">{part.quantity}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-tight border border-slate-200">
                          {part.material}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <span className="text-[#0066cc] font-bold tracking-tight text-[11px] uppercase">Verified</span>
                      </td>
                    </tr>
                  ))}
                  {/* Mock red-line item for design fidelity */}
                  <tr className="bg-red-50/30">
                    <td className="px-6 py-4 font-mono font-bold text-red-600 tracking-tight">HAE-SCRW-M12-L20</td>
                    <td className="px-6 py-4 text-red-600 font-bold">--</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold text-[10px] uppercase tracking-tight border border-red-200">
                        A2-70
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="bg-red-600 text-white px-2 py-0.5 rounded-full font-bold text-[9px] uppercase shadow-sm">QTY MISMATCH</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
