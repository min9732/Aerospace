import React from 'react';
import { 
  Activity, 
  Database, 
  Layers, 
  ArrowUpRight, 
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', count: 42 },
  { name: 'Tue', count: 58 },
  { name: 'Wed', count: 35 },
  { name: 'Thu', count: 72 },
  { name: 'Fri', count: 51 },
  { name: 'Sat', count: 24 },
  { name: 'Sun', count: 18 },
];

const barData = [
  { name: 'BOM', val: 400 },
  { name: 'Audit', val: 300 },
  { name: 'Parts', val: 200 },
  { name: 'CAD', val: 278 },
];

const stats = [
  { label: 'BOM Data Integrity', value: '100%', badge: 'EXCELLENT', badgeColor: 'bg-blue-100 text-blue-700', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Audits', value: '12', badge: '3 WARNINGS', badgeColor: 'bg-orange-100 text-orange-700', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50', subtext: 'Last scan: 4 mins ago' },
  { label: 'Part Library Sync', value: '4,209', badge: 'SYNCED', badgeColor: 'bg-green-100 text-green-700', icon: Layers, color: 'text-green-600', bg: 'bg-green-50', subtext: 'Update Standard Catalog (YAML)' },
];

export function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[34px] font-bold text-[#1d1d1f] tracking-tight apple-tight">System Performance Overview</h2>
          <p className="text-[17px] text-slate-500 mt-1">Real-time automation throughput and data integrity metrics.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 shadow-sm flex items-center gap-2 uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#0066cc] rounded-full animate-pulse"></span>
            Live Monitoring
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-default">
            <div className="flex items-start justify-between mb-6">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</span>
              <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-tight", stat.badgeColor)}>
                {stat.badge}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-[40px] font-bold text-[#1d1d1f] tracking-tight leading-none apple-tight">{stat.value}</h4>
              {stat.label === 'Active Audits' && <span className="text-sm font-medium text-slate-400 italic">Drawing sets</span>}
            </div>
            
            {stat.label === 'BOM Data Integrity' ? (
              <div className="flex gap-1 mt-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 bg-[#0066cc] rounded-sm"></div>
                ))}
              </div>
            ) : (
              <p className={cn("text-[12px] mt-6 font-medium text-slate-500 uppercase tracking-wide", stat.subtext?.includes('Update') && "underline cursor-pointer hover:text-[#0066cc]")}>
                {stat.subtext || "Processing telemetry active..."}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Main functional areas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[21px] font-bold text-[#1d1d1f] apple-tight">Throughput Analytics</h3>
            <div className="flex gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
              <button className="px-3 py-1 text-[10px] font-bold bg-white shadow-sm rounded-md text-[#1d1d1f] button-active-scale">7D</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors button-active-scale">30D</button>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0066cc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1d1d1f', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '13px' }}
                  itemStyle={{ color: '#0066cc' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0066cc" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1d1d1f] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-32 h-32 text-blue-400" />
             </div>
             <h3 className="text-[21px] font-bold mb-2 apple-tight">Automated Optimization</h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-6">
               System identified 4 redundant part entries in the Turbine assembly that can be standardized to the Aero-MS series.
             </p>
             <button className="w-full py-3 bg-[#0066cc] hover:bg-[#0071e3] rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/40 uppercase tracking-widest button-active-scale">
               Apply Auto-Standardization
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-[17px] font-bold text-[#1d1d1f] mb-6 flex items-center justify-between apple-tight">
              Module Efficiency
              <Layers className="w-4 h-4 text-slate-300" />
            </h3>
            <div className="space-y-6">
              {[
                { label: 'BOM Converter', val: 95, color: 'bg-[#0066cc]' },
                { label: 'Drawing Audit', val: 78, color: 'bg-orange-500' },
                { label: 'Part Generator', val: 92, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span className="text-[#1d1d1f]">{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden border border-slate-100">
                    <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
