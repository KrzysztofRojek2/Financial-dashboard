import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';
import { useState } from 'react';
import { useMonthlyData, useYearlyData } from '../api/transactions';
import { YearlyData } from '../types/types';

const CashFlowChart = () => {
  const [view, setView] = useState('monthly');

  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
    error: monthlyError,
  } = useMonthlyData();
  const {
    data: yearlyData,
    isLoading: isYearlyLoading,
    error: yearlyError,
  } = useYearlyData();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const transformedYearlyData = yearlyData?.map((item: YearlyData) => ({
    ...item,
    period: months[item.period - 1],
  }));

  const data = view === 'monthly' ? monthlyData : transformedYearlyData;
  const dataKey = 'period';

  if (isMonthlyLoading || isYearlyLoading) {
    return <p>ładowanie!</p>;
  }

  if (monthlyError || yearlyError) {
    return <p>Wystąpił błąd podczas ładowania danych!</p>;
  }

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Income & Expenses</h2>
      <div className="flex text-orange-500 gap-4 text-sm">
        <button
          className={`p-2 rounded-xl border shadow-md shadow-black cursor-pointer ${view === 'monthly' ? 'text-white border-orange-500' : 'bg-[#121826] border border-transparent hover:border-orange-500'}`}
          onClick={() => setView('monthly')}
        >
          Monthly
        </button>
        <button
          className={`p-2 rounded-xl border shadow-md shadow-black cursor-pointer ${view === 'yearly' ? 'text-white border-orange-500' : 'bg-[#121826] border border-transparent hover:border-orange-500'}`}
          onClick={() => setView('yearly')}
        >
          Yearly
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F56C4E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F56C4E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#2A4F77" />
          <XAxis
            stroke="#2A4F77"
            dataKey={dataKey}
            tick={{ fontSize: 12, fill: '#FFFFFF' }}
          />
          <YAxis stroke="#2A4F77" tick={{ fontSize: 12, fill: '#FFFFFF' }} />
          <Label
            value="Podział Zarobków i Wydatków"
            offset={0}
            position="top"
            fill="#FFFFFF"
            fontSize={16}
            fontWeight="bold"
          />
          <Legend />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#F56C4E"
            fill="url(#colorIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#4CAF50"
            strokeDasharray="5 5"
            fill="none"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121826',
              borderColor: '#1E2539',
              color: '#FFFFFF',
              borderRadius: '1rem',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default CashFlowChart;
