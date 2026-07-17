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

export type ActiveView = 'dashboard' | 'bom' | 'audit' | 'generator' | 'settings';
