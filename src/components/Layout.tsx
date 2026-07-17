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
    <div className="flex h-screen bg-white overflow-hidden font-sans text-hanwha-dark">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <nav className="h-16 bg-white border-b border-[#e5e5e5] flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-6">
            <h1 className="text-[14px] font-bold tracking-widest text-hanwha-dark uppercase">
              Engineering Automation <span className="text-hanwha-orange ml-1">Suite</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1 text-hanwha-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-widest">Aero-System Live</span>
            </div>
            
            <div className="w-px h-4 bg-[#e5e5e5]"></div>
            
            <div className="flex items-center gap-6">
              <button className="text-[12px] font-bold text-hanwha-gray-400 hover:text-hanwha-orange transition-colors uppercase tracking-widest hanwha-button-active">Docs</button>
              <button className="text-[12px] font-bold text-hanwha-gray-400 hover:text-hanwha-orange transition-colors uppercase tracking-widest hanwha-button-active">Support</button>
              <div className="w-8 h-8 bg-hanwha-dark rounded-full flex items-center justify-center group cursor-pointer hanwha-button-active">
                <User className="w-4 h-4 text-white group-hover:text-hanwha-orange transition-colors" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
