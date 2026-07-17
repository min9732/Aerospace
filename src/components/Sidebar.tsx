import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  SearchCheck, 
  Settings, 
  Box,
  ChevronRight,
  LogOut,
  Plane
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ActiveView } from '@/types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'bom', label: 'Smart BOM Converter', icon: FileSpreadsheet },
  { id: 'audit', label: 'Drawing Audit', icon: SearchCheck },
  { id: 'generator', label: 'Part Generator', icon: Box },
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="w-60 bg-white border-r border-slate-200 flex flex-col p-4 gap-2 h-screen shrink-0">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-4">Core Modules</div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ActiveView)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-semibold transition-all duration-200 text-[15px] button-active-scale",
              activeView === item.id 
                ? "bg-blue-50 text-[#0066cc]" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4",
              activeView === item.id ? "text-[#0066cc]" : "text-slate-400"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-[#1d1d1f] rounded-xl text-white shadow-xl">
        <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-widest font-bold">Total Lead-time Saved</p>
        <p className="text-2xl font-bold tracking-tight">1,248h <span className="text-xs font-normal text-green-400 font-mono ml-1">+14%</span></p>
        <div className="w-full bg-slate-700 h-1 rounded-full mt-3 overflow-hidden">
          <div className="bg-[#0066cc] w-3/4 h-full shadow-[0_0_8px_rgba(0,102,204,0.5)]"></div>
        </div>
        <p className="text-[9px] mt-2 text-slate-400 uppercase tracking-widest font-semibold italic">Target: 1,500h / Q3</p>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100">
        <button 
          onClick={() => setActiveView('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors button-active-scale",
            activeView === 'settings' ? "bg-slate-100 text-[#1d1d1f]" : "text-slate-500 hover:bg-slate-50"
          )}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
