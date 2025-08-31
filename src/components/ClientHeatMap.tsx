import React, { useState } from 'react';
import { ClientTrajectory, ClientStatus } from '@/types/dashboard';
import { statusColors, mockWeeklyHealth } from '@/data/mockData';
import { Card } from '@/components/ui/card';

interface ClientHeatMapProps {
  data: ClientTrajectory[];
  className?: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: {
    client: string;
    week: string;
    status: string;
  };
}

const statusLabels: Record<ClientStatus, string> = {
  risk: 'Risco',
  normal: 'Normal',
  accelerated: 'Acelerado',
  completed: 'Concluído'
};

export const ClientHeatMap: React.FC<ClientHeatMapProps> = ({ data, className = '' }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: { client: '', week: '', status: '' }
  });

  const weeks = mockWeeklyHealth.map(w => w.week);

  const handleCellHover = (
    event: React.MouseEvent<HTMLDivElement>,
    client: string,
    week: string,
    status: ClientStatus
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content: {
        client,
        week,
        status: statusLabels[status]
      }
    });
  };

  const handleCellLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          Trajetória Individual dos Clientes
        </h2>
        <p className="text-sm text-muted-foreground">
          Status de cada cliente ao longo das semanas
        </p>
      </div>

      <div className="relative">
        {/* Cabeçalho com semanas */}
        <div className="flex mb-2">
          <div className="w-48 flex-shrink-0"></div>
          <div className="flex overflow-x-auto">
            {weeks.map((week) => (
              <div
                key={week}
                className="w-12 text-xs font-medium text-center text-muted-foreground py-2 flex-shrink-0"
              >
                {week.split('-')[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Grid do heatmap */}
        <div className="max-h-96 overflow-y-auto">
          {data.map((client) => (
            <div key={client.clientId} className="flex items-center mb-1">
              {/* Nome do cliente */}
              <div className="w-48 flex-shrink-0 pr-4">
                <span className="text-sm font-medium text-card-foreground truncate block">
                  {client.clientName}
                </span>
              </div>
              
              {/* Células do status */}
              <div className="flex overflow-x-auto">
                {weeks.map((week) => {
                  const status = client.weeklyStatus[week];
                  return (
                    <div
                      key={`${client.clientId}-${week}`}
                      className="w-12 h-8 border border-border/30 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-border flex-shrink-0"
                      style={{
                        backgroundColor: statusColors[status],
                        opacity: 0.8
                      }}
                      onMouseEnter={(e) => handleCellHover(e, client.clientName, week, status)}
                      onMouseLeave={handleCellLeave}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {Object.entries(statusLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-border/30"
                style={{ backgroundColor: statusColors[key as ClientStatus] }}
              />
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip.visible && (
          <div
            className="absolute z-50 bg-card border border-border rounded-lg p-2 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: tooltip.x,
              top: tooltip.y
            }}
          >
            <div className="text-sm font-medium text-card-foreground">
              {tooltip.content.client}
            </div>
            <div className="text-xs text-muted-foreground">
              {tooltip.content.week} - {tooltip.content.status}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};