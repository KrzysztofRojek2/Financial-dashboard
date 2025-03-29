import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useBankData } from '../api/bank';

const BankBalanceChart = () => {
  const { data, isLoading, isError } = useBankData();

  const monthNames: string[] = [
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching bank data</p>;

  const balanceHistory =
    data?.balanceHistory?.map((entry) => ({
      month: monthNames[parseInt(entry.month.substring(5, 7), 10) - 1],
      balance: entry.balance,
    })) || [];

  return (
    <>
      <h2 className="font-bold text-xl mb-4">Bank Account Balance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={balanceHistory}>
          <CartesianGrid stroke="#2A4F77" />
          <XAxis
            dataKey="month"
            stroke="#2A4F77"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12, fill: '#FFFFFF' }}
          />
          <YAxis stroke="#2A4F77" tick={{ fontSize: 12, fill: '#FFFFFF' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121826',
              borderColor: '#1E2539',
              color: '#FFFFFF',
              borderRadius: '1rem',
            }}
          />
          <Line
            type="linear"
            dataKey="balance"
            stroke="#4A90E2"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default BankBalanceChart;
