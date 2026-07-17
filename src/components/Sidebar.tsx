import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  SearchCheck, 
  Settings, 
  Box,
  ChevronRight,
  LogOut,
  Plane,
  Calendar
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
  { id: 'mrp', label: 'Production Planning', icon: Calendar },
];

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="w-64 bg-hanwha-dark flex flex-col h-screen shrink-0 border-r border-white/5">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-hanwha-orange flex items-center justify-center text-white font-black text-xl">H</div>
          <span className="text-white font-bold tracking-tighter text-lg uppercase">Aerospace</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <div className="text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em] px-4 mb-4 opacity-50">Operations</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ActiveView)}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-3 text-[14px] font-medium transition-all hanwha-button-active",
              activeView === item.id 
                ? "bg-hanwha-orange text-white" 
                : "text-hanwha-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4",
              activeView === item.id ? "text-white" : "text-hanwha-gray-400"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 bg-hanwha-gray-900 m-4 border border-white/5">
        <p className="text-[10px] text-hanwha-gray-400 mb-1 uppercase tracking-widest font-bold">Automation Performance</p>
        <p className="text-2xl font-bold text-white tabular-nums tracking-tighter">1,248<span className="text-sm font-normal text-hanwha-orange ml-1">h</span></p>
        <div className="w-full bg-white/10 h-[2px] mt-3">
          <div className="bg-hanwha-orange w-3/4 h-full shadow-[0_0_10px_rgba(243,115,33,0.5)]"></div>
        </div>
        <p className="text-[9px] mt-2 text-hanwha-gray-400 uppercase tracking-widest font-semibold italic">Efficiency Target: 85%</p>
      </div>

      <div className="px-4 py-6 border-t border-white/5">
        <button 
          onClick={() => setActiveView('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium transition-colors hanwha-button-active",
            activeView === 'settings' ? "text-hanwha-orange" : "text-hanwha-gray-400 hover:text-white"
          )}
        >
          <Settings className="w-4 h-4" />
          System Config
        </button>
      </div>
    </div>
  );
}
