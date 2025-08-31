import React, { useState } from 'react';
import { StackedBarChart } from './StackedBarChart';
import { ClientHeatMap } from './ClientHeatMap';
import { DashboardHeader } from './DashboardHeader';
import { mockDashboardData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export const CustomerSuccessDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    // Simulação de carregamento de dados para o novo ano
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dados atualizados",
        description: `Dados carregados para o ano ${year}`,
      });
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard atualizado",
        description: "Os dados foram sincronizados com sucesso",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto p-6 max-w-7xl">
        <DashboardHeader
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="order-1">
            <StackedBarChart 
              data={mockDashboardData.weeklyHealth}
              className="animate-fade-in"
            />
          </div>
          
          <div className="order-2">
            <ClientHeatMap 
              data={mockDashboardData.clientTrajectories}
              className="animate-fade-in"
            />
          </div>
        </div>

        {/* Cards de métricas resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-card rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {mockDashboardData.weeklyHealth[mockDashboardData.weeklyHealth.length - 1]?.total || 0}
                </p>
              </div>
              <div className="w-2 h-8 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Risco</p>
                <p className="text-2xl font-bold text-status-risk">
                  {mockDashboardData.weeklyHealth[mockDashboardData.weeklyHealth.length - 1]?.risk || 0}
                </p>
              </div>
              <div className="w-2 h-8 bg-status-risk rounded-full"></div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Acelerados</p>
                <p className="text-2xl font-bold text-status-accelerated">
                  {mockDashboardData.weeklyHealth[mockDashboardData.weeklyHealth.length - 1]?.accelerated || 0}
                </p>
              </div>
              <div className="w-2 h-8 bg-status-accelerated rounded-full"></div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold text-status-completed">
                  {mockDashboardData.weeklyHealth[mockDashboardData.weeklyHealth.length - 1]?.completed || 0}
                </p>
              </div>
              <div className="w-2 h-8 bg-status-completed rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};