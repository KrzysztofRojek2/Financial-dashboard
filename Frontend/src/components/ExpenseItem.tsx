import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";
import { useDeleteExpense, useExpensesData, useUpdateExpense } from "../api/expenses";
import { toast } from "react-toastify";
import Button from "./Button";

interface ExpenseItemProps {
  id: number;
  expenseName: string;
  cost: number;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, expenseName, cost }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(expenseName);
  const [editedCost, setEditedCost] = useState(cost.toString());
  const { refetch } = useExpensesData();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { mutate: deleteExpense } = useDeleteExpense();
  const { mutate: updateExpense } = useUpdateExpense();


  const handleUpdateExpense = () => {
    updateExpense(
      { id, name: editedName, cost: Number(editedCost)},
      {
        onSuccess: () => {
          toast.success("Expense updated successfully!")
          refetch();
        },
        onError: () => {
          toast.error("Error updating expense!")
        },
      }
    );
    setEditModalOpen(false);
  };

  const handleDeleteExpense = () => {
    deleteExpense(id, {
      onSuccess: () => {
        setDeleteModalOpen(false); 
        refetch(); 
        toast.success("Expense deleted succesfully!")
      },
      onError: () => {
        toast.error("Expense couldn't be deleted!")
      }
    });
  };
  
  return (
    <div className="flex w-full justify-between items-center px-4 md:px-10 py-5 bg-[#121826] rounded-3xl text-sm sm:text-lg shadow-lg shadow-gray-950">
      <p className="w-1/4">{expenseName}</p>
      <p className="md:w-1/2">${cost}</p>
      <div className="flex gap-2 md:gap-10">
        <Button style="hover:!text-blue-500" onClick={() => setEditModalOpen(true)}>
          <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
        </Button>
        <Button style="hover:!text-red-500" onClick={() => setDeleteModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
        </Button>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Expense"
        onClose={() => setEditModalOpen(false)}
        onConfirm={handleUpdateExpense}
        confirmText="Save"
      >
        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Expense Name"
            id="edit-expense-name"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <InputField
            label="Cost"
            id="edit-expense-cost"
            type="number"
            value={editedCost}
            onChange={(e) => setEditedCost(e.target.value)}
          />
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Are you sure you want to delete this expense?"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteExpense}
        confirmText="Delete"
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ExpenseItem;
