import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { WeeklyData } from '@/types/dashboard';
import { statusColors } from '@/data/mockData';
import { Card } from '@/components/ui/card';

interface StackedBarChartProps {
  data: WeeklyData[];
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-card-foreground mb-2">{`${label}`}</p>
        {payload.reverse().map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} clientes`}
          </p>
        ))}
        <p className="text-sm font-medium text-muted-foreground mt-2">
          Total: {payload.reduce((sum, entry) => sum + entry.value, 0)} clientes
        </p>
      </div>
    );
  }
  return null;
};

export const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, className = '' }) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">
          Saúde Semanal da Carteira
        </h2>
        <p className="text-sm text-muted-foreground">
          Evolução dos status dos clientes ao longo das semanas
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: 'hsl(var(--chart-text))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--chart-grid))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--chart-text))', fontSize: 12 }}
              axisLine={{ stroke: 'hsl(var(--chart-grid))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px'
              }}
            />
            <Bar dataKey="risk" stackId="a" fill={statusColors.risk} name="Risco" />
            <Bar dataKey="normal" stackId="a" fill={statusColors.normal} name="Normal" />
            <Bar dataKey="accelerated" stackId="a" fill={statusColors.accelerated} name="Acelerado" />
            <Bar dataKey="completed" stackId="a" fill={statusColors.completed} name="Concluído" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};