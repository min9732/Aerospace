import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { BOMConverter } from './BOMConverter';
import { DrawingAudit } from './DrawingAudit';
import { PartGenerator } from './PartGenerator';
import { ActiveView } from '@/types';
import { Bell, Search, User } from 'lucide-react';

export function Layout() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'bom': return <BOMConverter />;
      case 'audit': return <DrawingAudit />;
      case 'generator': return <PartGenerator />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-slate-800">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic text-xl shadow-lg shadow-blue-200">A</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">ADIS <span className="font-normal text-slate-400 hidden sm:inline">| Aero-Design Intelligence Suite</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Engineering Automation System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-tight">CATIA V6 Connected</span>
            </div>
            
            <div className="w-px h-6 bg-slate-200"></div>
            
            <div className="flex items-center gap-4">
              <button className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">Documentation</button>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden group cursor-pointer">
                <User className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
