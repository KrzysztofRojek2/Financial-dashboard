import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';
import { useAssetData } from '../api/assets';

interface AssetChartProps {
  height: number;
}

const AssetChart: React.FC<AssetChartProps> = ({ height }) => {
  const { data: assets = [], isLoading, error } = useAssetData();

  if (isLoading) return <p>Ładowanie danych...</p>;
  if (error) return <p>Błąd podczas ładowania danych!</p>;

  const totalCost = assets.reduce((acc, item) => acc + Number(item.cost), 0);

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Assets</h2>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart width={500} height={500}>
          <Label position="top" />
          <Pie
            data={assets}
            dataKey="cost"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={70}
            label={({ name, value }) =>
              `${name}: ${((value / totalCost) * 100).toFixed(1)}%`
            }
            stroke="#1E2539"
            strokeWidth={5}
            labelLine={{ strokeWidth: 1 }}
          >
            {assets.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#121826',
              borderColor: '#1E2539',
              borderRadius: '1rem',
            }}
            itemStyle={{ color: '#FFFFFF' }}
            labelStyle={{ color: '#FFFFFF' }}
          />
          <Legend
            className="flex flex-col"
            verticalAlign="bottom"
            iconType="square"
            formatter={(value) => {
              const item = assets.find((d) => d.name === value);
              return `${value}: $${item?.cost.toLocaleString()}`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default AssetChart;
