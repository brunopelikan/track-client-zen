import { ClientStatus, DashboardData, WeeklyData, ClientTrajectory } from '@/types/dashboard';

// Dados mock para o gráfico de barras empilhadas
export const mockWeeklyHealth: WeeklyData[] = [
  { week: 'S1-2025', risk: 15, normal: 25, accelerated: 5, completed: 2, total: 47 },
  { week: 'S2-2025', risk: 14, normal: 26, accelerated: 7, completed: 4, total: 51 },
  { week: 'S3-2025', risk: 12, normal: 28, accelerated: 9, completed: 7, total: 56 },
  { week: 'S4-2025', risk: 11, normal: 24, accelerated: 12, completed: 11, total: 58 },
  { week: 'S5-2025', risk: 10, normal: 22, accelerated: 15, completed: 15, total: 62 },
  { week: 'S6-2025', risk: 9, normal: 20, accelerated: 18, completed: 18, total: 65 },
  { week: 'S7-2025', risk: 8, normal: 23, accelerated: 20, completed: 22, total: 73 },
  { week: 'S8-2025', risk: 7, normal: 25, accelerated: 22, completed: 25, total: 79 },
  { week: 'S9-2025', risk: 6, normal: 27, accelerated: 24, completed: 28, total: 85 },
  { week: 'S10-2025', risk: 5, normal: 29, accelerated: 25, completed: 31, total: 90 },
  { week: 'S11-2025', risk: 4, normal: 30, accelerated: 25, completed: 33, total: 92 },
  { week: 'S12-2025', risk: 4, normal: 28, accelerated: 25, completed: 35, total: 92 },
];

// Nomes de clientes fictícios
const clientNames = [
  'TechCorp Solutions',
  'StartupNext Ltda',
  'InnovaTech S.A.',
  'DataFlow Systems',
  'CloudFirst Inc.',
  'AgileWorks',
  'FinanceFlow Co.',
  'RetailMax Group',
  'HealthTech Plus',
  'EduSoft Solutions',
  'GreenEnergy Corp',
  'LogisticsPro',
  'MediaStream Ltd',
  'CyberSec Systems',
  'AutoTech Industries'
];

// Função para gerar trajetórias realistas
function generateRealisticTrajectory(clientId: string): Record<string, ClientStatus> {
  const trajectory: Record<string, ClientStatus> = {};
  const weeks = mockWeeklyHealth.map(w => w.week);
  
  // Diferentes padrões de evolução
  const patterns = [
    // Padrão 1: Evolução linear positiva
    () => {
      let currentStatus: ClientStatus = 'risk';
      weeks.forEach((week, index) => {
        if (index < 3) trajectory[week] = 'risk';
        else if (index < 6) trajectory[week] = 'normal';
        else if (index < 9) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    },
    
    // Padrão 2: Início normal com aceleração
    () => {
      weeks.forEach((week, index) => {
        if (index < 4) trajectory[week] = 'normal';
        else if (index < 8) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    },
    
    // Padrão 3: Com regressão e recuperação
    () => {
      weeks.forEach((week, index) => {
        if (index < 2) trajectory[week] = 'normal';
        else if (index < 4) trajectory[week] = 'risk';
        else if (index < 7) trajectory[week] = 'normal';
        else if (index < 10) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    },
    
    // Padrão 4: Acelera rapidamente
    () => {
      weeks.forEach((week, index) => {
        if (index < 2) trajectory[week] = 'normal';
        else if (index < 5) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    },
    
    // Padrão 5: Lenta mas constante
    () => {
      weeks.forEach((week, index) => {
        if (index < 5) trajectory[week] = 'normal';
        else if (index < 9) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    },
    
    // Padrão 6: Múltiplas regressões
    () => {
      weeks.forEach((week, index) => {
        if (index < 1) trajectory[week] = 'risk';
        else if (index < 3) trajectory[week] = 'normal';
        else if (index < 4) trajectory[week] = 'risk';
        else if (index < 7) trajectory[week] = 'normal';
        else if (index < 10) trajectory[week] = 'accelerated';
        else trajectory[week] = 'completed';
      });
    }
  ];
  
  // Seleciona um padrão baseado no ID do cliente
  const patternIndex = parseInt(clientId.split('-')[1]) % patterns.length;
  patterns[patternIndex]();
  
  return trajectory;
}

// Gera trajetórias para todos os clientes
export const mockClientTrajectories: ClientTrajectory[] = clientNames.map((name, index) => ({
  clientId: `client-${index + 1}`,
  clientName: name,
  weeklyStatus: generateRealisticTrajectory(`client-${index + 1}`)
}));

export const mockDashboardData: DashboardData = {
  weeklyHealth: mockWeeklyHealth,
  clientTrajectories: mockClientTrajectories
};

// Cores dos status (sincronizadas com o CSS)
export const statusColors = {
  risk: '#ef4444',
  normal: '#f59e0b',
  accelerated: '#22c55e',
  completed: '#6b7280'
};