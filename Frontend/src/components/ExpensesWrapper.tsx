import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpenseItem from './ExpenseItem';
import Button from './Button';
import { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import { useExpensesData, useAddExpense } from '../api/expenses';

const ExpensesWrapper = () => {
  const { data: expensesData, isLoading, isError, refetch } = useExpensesData();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseCost, setNewExpenseCost] = useState('');

  const { mutate: addExpense, isPending: isAdding } = useAddExpense();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching expenses</p>;

  const handleAddExpense = () => {
    const newExpense = {
      name: newExpenseName,
      cost: parseFloat(newExpenseCost),
    };

    addExpense(newExpense, {
      onSuccess: () => {
        setAddModalOpen(false);
        setNewExpenseName('');
        setNewExpenseCost('');
        refetch();
      },
      onError: (error) => {
        console.error('Error adding expense:', error);
      },
    });
  };

  return (
    <div className="div-primary p-6 md:p-10 gap-5">
      {expensesData?.map((expense, index) => (
        <ExpenseItem
          key={index}
          id={expense.id}
          expenseName={expense.name}
          cost={expense.cost}
        />
      ))}

      <Button
        variant="secondary"
        style="hover:text-blue-500 self-end"
        onClick={() => setAddModalOpen(true)}
      >
        <FontAwesomeIcon size="2x" icon={faPlus} />
      </Button>

      <Modal
        isOpen={isAddModalOpen}
        title="Add Expense"
        onClose={() => setAddModalOpen(false)}
        onConfirm={handleAddExpense}
        confirmText={isAdding ? 'Adding...' : 'Add'}
      >
        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Expense Name"
            id="expense-name"
            type="text"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
          />
          <InputField
            label="Cost"
            id="expense-cost"
            type="number"
            value={newExpenseCost}
            onChange={(e) => setNewExpenseCost(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ExpensesWrapper;
