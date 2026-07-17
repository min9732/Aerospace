import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  ArrowRight,
  Filter,
  Download,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ProductionOrder, MRPItem } from '@/types';

const MOCK_MRP_DATA: ProductionOrder[] = [
  {
    id: "PO-2026-001",
    assembly: "Turbine Blade Assembly - V1",
    startDate: "2026-07-20",
    endDate: "2026-08-05",
    status: "Confirmed",
    items: [
      { id: "1", partNumber: "HW-TB-772", requiredQty: 120, onHand: 80, shortage: 40, leadTime: 14, status: "Critical" },
      { id: "2", partNumber: "HW-BL-102", requiredQty: 60, onHand: 65, shortage: 0, leadTime: 7, status: "Scheduled" },
      { id: "3", partNumber: "HW-SC-005", requiredQty: 500, onHand: 1200, shortage: 0, leadTime: 3, status: "Scheduled" },
    ]
  },
  {
    id: "PO-2026-002",
    assembly: "Fuel Injector Housing",
    startDate: "2026-07-25",
    endDate: "2026-08-15",
    status: "Released",
    items: [
      { id: "4", partNumber: "HW-FI-889", requiredQty: 45, onHand: 10, shortage: 35, leadTime: 21, status: "In-Progress" },
      { id: "5", partNumber: "HW-FI- gaskets", requiredQty: 90, onHand: 100, shortage: 0, leadTime: 5, status: "Scheduled" },
    ]
  }
];

export function MRPPlanner() {
  const [orders] = useState<ProductionOrder[]>(MOCK_MRP_DATA);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-8">
        <div>
          <h2 className="text-[28px] font-bold text-hanwha-dark uppercase tracking-tighter">Production Planning (MRP)</h2>
          <p className="text-[14px] text-hanwha-gray-400 mt-1">Material requirements planning and automated production scheduling.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white border border-[#e5e5e5] text-[12px] font-bold text-hanwha-dark flex items-center gap-2 uppercase tracking-widest transition-all hanwha-button-active">
            <Download className="w-4 h-4 text-hanwha-orange" />
            Export Schedule
          </button>
          <button className="px-6 py-2.5 bg-hanwha-dark text-white text-[12px] font-bold flex items-center gap-2 uppercase tracking-widest transition-all hanwha-button-active">
            <Play className="w-4 h-4 text-hanwha-orange" />
            Run MRP Calc
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-[#e5e5e5] overflow-hidden group">
            <div className="bg-hanwha-gray-900 p-6 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-hanwha-orange flex items-center justify-center text-white font-black text-lg">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Order ID</span>
                    <span className="text-white font-bold text-sm">{order.id}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg tracking-tight">{order.assembly}</h3>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em]">Timeline</span>
                  <div className="flex items-center gap-3 text-white font-bold text-sm mt-1">
                    <Calendar className="w-4 h-4 text-hanwha-orange" />
                    {order.startDate} <ArrowRight className="w-3 h-3 opacity-50" /> {order.endDate}
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-hanwha-gray-400 uppercase tracking-[0.2em]">Status</span>
                  <div className={cn(
                    "mt-1 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-center",
                    order.status === 'Released' ? "bg-green-600 text-white" : "bg-hanwha-orange text-white"
                  )}>
                    {order.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-[#e5e5e5]">
                    <th className="px-8 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Part Number</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Required</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">On Hand</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Shortage</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest">Lead Time</th>
                    <th className="px-8 py-4 text-[11px] font-bold text-hanwha-gray-400 uppercase tracking-widest text-right">Procurement Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-[#f0f0f0] hover:bg-slate-50 transition-colors group/row">
                      <td className="px-8 py-5">
                        <div className="font-bold text-hanwha-dark tracking-tighter">{item.partNumber}</div>
                        <div className="text-[10px] text-hanwha-gray-400 uppercase tracking-widest mt-0.5">Aerospace Grade</div>
                      </td>
                      <td className="px-6 py-5 font-mono text-sm font-bold text-hanwha-dark">{item.requiredQty}</td>
                      <td className="px-6 py-5 font-mono text-sm text-hanwha-gray-400">{item.onHand}</td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "font-mono text-sm font-bold",
                          item.shortage > 0 ? "text-hanwha-orange" : "text-green-600"
                        )}>
                          {item.shortage}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs font-bold text-hanwha-gray-400 uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" />
                          {item.leadTime} Days
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-2 py-0.5",
                            item.status === 'Critical' ? "bg-hanwha-orange text-white" : 
                            item.status === 'In-Progress' ? "bg-hanwha-dark text-white" : "bg-green-100 text-green-700"
                          )}>
                            {item.status}
                          </span>
                          {item.status === 'Critical' && <AlertTriangle className="w-4 h-4 text-hanwha-orange animate-pulse" />}
                          {item.status === 'Scheduled' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Insight */}
      <div className="bg-hanwha-dark p-8 border-l-4 border-hanwha-orange flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/5 border border-white/10">
            <AlertTriangle className="w-8 h-8 text-hanwha-orange" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg tracking-tight uppercase">MRP Action Required</h4>
            <p className="text-hanwha-gray-400 text-sm mt-1">Shortage detected in PO-2026-001 (Turbine Blade Assembly). Supplier lead-time exceeds production start date.</p>
          </div>
        </div>
        <button className="px-8 py-3 bg-white text-hanwha-dark text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-hanwha-orange hover:text-white hanwha-button-active">
          Optimize Supply Chain
        </button>
      </div>
    </div>
  );
}
