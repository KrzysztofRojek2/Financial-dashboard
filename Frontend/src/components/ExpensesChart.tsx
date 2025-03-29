import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { useExpensesData } from '../api/expenses';

const getColor = (value: number, min: number, max: number) => {
  const percent = (value - min) / (max - min);
  const red = Math.round(211 + percent * (255 - 211));
  const green = Math.round(177 - percent * (177 - 0));
  return `rgb(${red}, ${green}, 47)`;
};

interface ExpensesChartProps {
  height: number;
  maxExpensesCount?: number;
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({
  height,
  maxExpensesCount,
}) => {
  const { data: expensesData, isLoading, isError } = useExpensesData();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching expenses</p>;

  if (!expensesData || expensesData.length === 0)
    return <p>No expenses data available</p>;

  const data = [...expensesData].sort((a, b) => a.cost - b.cost);

  const displayedData = maxExpensesCount
    ? data.slice(0, maxExpensesCount)
    : data;

  const minExpense = Math.min(...displayedData.map((d) => d.cost));
  const maxExpense = Math.max(...displayedData.map((d) => d.cost));
  const yMax = Math.ceil((maxExpense * 1.1) / 100) * 100;

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Biggest Expenses</h2>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={displayedData}>
          <CartesianGrid stroke="#2A4F77" />
          <XAxis
            type="category"
            dataKey="name"
            stroke="#2A4F77"
            interval={0}
            tick={{ fontSize: 12, fill: '#FFFFFF' }}
          />
          <YAxis
            type="number"
            stroke="#2A4F77"
            domain={[0, yMax]}
            tick={{ fill: '#FFFFFF' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121826',
              borderColor: '#1E2539',
              color: '#FFFFFF',
              borderRadius: '1rem',
            }}
          />
          <Bar dataKey="cost" fill="#FFFFFF">
            {displayedData.map((entry) => (
              <Cell
                key={entry.name}
                fill={getColor(entry.cost, minExpense, maxExpense)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesChart;
