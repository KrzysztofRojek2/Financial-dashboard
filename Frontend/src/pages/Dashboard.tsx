import CashFlowChart from '../components/CashFlowChart';
import AssetChart from '../components/AssetChart';
import ExpensesChart from '../components/ExpensesChart';
import BankBalanceChart from '../components/BankBalanceChart';
import NetWorth from '../components/NetWorth';

const Dashboard = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-5 w-full">
      <div className="div-primary p-4 sm:p-10">
        <CashFlowChart />
      </div>
      <div className="div-primary p-4 sm:p-10">
        <BankBalanceChart />
      </div>
      <div className="flex flex-col gap-5 h-full">
        <NetWorth />
        <div className="h-1/2 div-primary p-4 sm:p-10">
          <ExpensesChart height={200} maxExpensesCount={6} />
        </div>
      </div>
      <div className="div-primary p-4 sm:p-10">
        <AssetChart height={500} />
      </div>
    </div>
  );
};

export default Dashboard;
