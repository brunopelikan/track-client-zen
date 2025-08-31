export type ClientStatus = 'risk' | 'normal' | 'accelerated' | 'completed';

export interface WeeklyData {
  week: string;
  risk: number;
  normal: number;
  accelerated: number;
  completed: number;
  total: number;
}

export interface ClientTrajectory {
  clientId: string;
  clientName: string;
  weeklyStatus: Record<string, ClientStatus>;
}

export interface DashboardData {
  weeklyHealth: WeeklyData[];
  clientTrajectories: ClientTrajectory[];
}

export interface StatusColors {
  risk: string;
  normal: string;
  accelerated: string;
  completed: string;
}