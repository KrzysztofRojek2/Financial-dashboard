import ExpensesChart from '../components/ExpensesChart';
import ExpensesWrapper from '../components/ExpensesWrapper';

const Expenses = () => {
  return (
    <>
      <div className="div-primary p-10">
        <ExpensesChart height={500} />
      </div>
      <ExpensesWrapper />
    </>
  );
};

export default Expenses;
