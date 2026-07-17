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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Performance Overview</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time automation throughput and data integrity metrics.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Live Monitoring
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <span className={cn("px-2 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-tight", stat.badgeColor)}>
                {stat.badge}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h4>
              {stat.label === 'Active Audits' && <span className="text-xs font-medium text-slate-400 italic">Drawing sets</span>}
            </div>
            
            {stat.label === 'BOM Data Integrity' ? (
              <div className="flex gap-1 mt-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 bg-blue-500 rounded-sm"></div>
                ))}
              </div>
            ) : (
              <p className={cn("text-[10px] mt-6 font-medium text-slate-500", stat.subtext?.includes('Update') && "underline cursor-pointer hover:text-blue-600")}>
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
            <h3 className="font-bold text-slate-900">Throughput Analytics</h3>
            <div className="flex gap-1 p-1 bg-slate-50 rounded-lg border border-slate-100">
              <button className="px-3 py-1 text-[10px] font-bold bg-white shadow-sm rounded-md text-slate-900">7D</button>
              <button className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors">30D</button>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0F172A] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <TrendingUp className="w-32 h-32 text-blue-400" />
             </div>
             <h3 className="text-lg font-bold mb-2">Automated Optimization</h3>
             <p className="text-slate-400 text-xs leading-relaxed mb-6">
               System identified 4 redundant part entries in the Turbine assembly that can be standardized to the Aero-MS series.
             </p>
             <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-900/40">
               Apply Auto-Standardization
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
              Module Efficiency
              <Layers className="w-4 h-4 text-slate-300" />
            </h3>
            <div className="space-y-4">
              {[
                { label: 'BOM Converter', val: 95, color: 'bg-blue-500' },
                { label: 'Drawing Audit', val: 78, color: 'bg-orange-500' },
                { label: 'Part Generator', val: 92, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    <span>{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
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
