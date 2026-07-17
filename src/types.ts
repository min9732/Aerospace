export interface Part {
  id: string;
  partNumber: string;
  quantity: number;
  material: string;
  weight: number;
  description: string;
}

export interface AuditResult {
  type: "Error" | "Warning";
  message: string;
  section: string;
}

export type ActiveView = 'dashboard' | 'bom' | 'audit' | 'generator' | 'mrp' | 'settings';

export interface MRPItem {
  id: string;
  partNumber: string;
  requiredQty: number;
  onHand: number;
  shortage: number;
  leadTime: number; // in days
  status: 'Critical' | 'In-Progress' | 'Scheduled';
}

export interface ProductionOrder {
  id: string;
  assembly: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Confirmed' | 'Released';
  items: MRPItem[];
}
