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
      <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-8">
        <div>
          <h2 className="text-[28px] font-bold text-hanwha-dark uppercase tracking-tighter">System Performance Analytics</h2>
          <p className="text-[14px] text-hanwha-gray-400 mt-1">Industrial automation monitoring for aerospace design workflows.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white border border-[#e5e5e5] text-[11px] font-bold text-hanwha-dark flex items-center gap-3 uppercase tracking-[0.2em]">
            <span className="w-2 h-2 bg-hanwha-orange rounded-full animate-pulse"></span>
            Live Telemetry
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-[#e5e5e5] hover:border-hanwha-orange transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-hanwha-orange transition-all duration-300"></div>
            <div className="flex items-start justify-between mb-8">
              <span className="text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] leading-none">{stat.label}</span>
              <span className={cn("px-2 py-0.5 text-[9px] font-black uppercase tracking-widest", 
                stat.badgeColor.includes('blue') ? 'bg-hanwha-orange text-white' : 
                stat.badgeColor.includes('green') ? 'bg-green-600 text-white' : 'bg-hanwha-dark text-white'
              )}>
                {stat.badge}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-[42px] font-bold text-hanwha-dark tracking-tighter tabular-nums leading-none">{stat.value}</h4>
              {stat.label === 'Active Audits' && <span className="text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Sets</span>}
            </div>
            
            {stat.label === 'BOM Data Integrity' ? (
              <div className="flex gap-1.5 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 h-1 bg-hanwha-orange"></div>
                ))}
              </div>
            ) : (
              <p className={cn("text-[11px] mt-8 font-bold text-hanwha-gray-400 uppercase tracking-widest", stat.subtext?.includes('Update') && "text-hanwha-orange cursor-pointer hover:underline")}>
                {stat.subtext || "System Status: Nominal"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Analytics Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white border border-[#e5e5e5] p-8 flex flex-col min-h-[450px]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[16px] font-bold text-hanwha-dark uppercase tracking-widest">Automation Throughput</h3>
            <div className="flex gap-4">
              <button className="text-[11px] font-bold text-hanwha-dark border-b-2 border-hanwha-orange pb-1 tracking-widest uppercase">7 Days</button>
              <button className="text-[11px] font-bold text-hanwha-gray-400 hover:text-hanwha-dark tracking-widest uppercase transition-colors">30 Days</button>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f37321" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f37321" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#767676', fontSize: 10, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#f37321' }}
                />
                <Area type="monotone" dataKey="count" stroke="#f37321" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-hanwha-dark text-white p-8 relative overflow-hidden group">
             <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-24 h-24 text-hanwha-orange" />
             </div>
             <h3 className="text-[16px] font-bold mb-4 uppercase tracking-widest">Optimization Intelligence</h3>
             <p className="text-hanwha-gray-400 text-[13px] leading-relaxed mb-8">
               Advanced ML analysis suggests standardizing the 'Turbine Aero-MS' series across all active propulsion assemblies to reduce lead-time by 12%.
             </p>
             <button className="w-full py-4 bg-hanwha-orange hover:bg-orange-600 text-white text-[12px] font-bold transition-all uppercase tracking-[0.2em] hanwha-button-active">
               Deploy Optimization
             </button>
          </div>

          <div className="bg-white border border-[#e5e5e5] p-8">
            <h3 className="text-[14px] font-bold text-hanwha-dark mb-8 flex items-center justify-between uppercase tracking-widest">
              Module Efficiency
              <Layers className="w-4 h-4 text-hanwha-orange" />
            </h3>
            <div className="space-y-8">
              {[
                { label: 'BOM Converter', val: 95, color: 'bg-hanwha-orange' },
                { label: 'Drawing Audit', val: 78, color: 'bg-hanwha-dark' },
                { label: 'Part Generator', val: 92, color: 'bg-hanwha-gray-700' },
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-widest">
                    <span>{item.label}</span>
                    <span className="text-hanwha-dark">{item.val}%</span>
                  </div>
                  <div className="w-full bg-[#f0f0f0] h-[2px]">
                    <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.val}%` }}></div>
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
