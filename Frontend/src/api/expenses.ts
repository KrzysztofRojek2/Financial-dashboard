import { useMutation, useQuery } from '@tanstack/react-query';
import { ExpenseData } from '../types/types';
import api from './api';

const fetchExpenses = async () => {
   const response = await api.get(`expenses/{userId}`);
   return response.data;
};

const addExpense = async (newExpense: { name: string, cost: number }) => {
   const response = await api.post(`expenses/{userId}`, newExpense);
   return response.data;
};

const deleteExpense = async (id: number) => {
   await api.delete(`expenses/${id}`);
};

const updateExpense = async (data: { id: number; name: string; cost: number }) => {
   await api.put(`/expenses/${data.id}`, {
      name: data.name,
      cost: data.cost,
    });
};

export const useExpensesData = () => {
   return useQuery<ExpenseData[], Error>({
      queryKey: ['expenesData'],
      queryFn: fetchExpenses,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
   });
};

export const useDeleteExpense = () => {
   return useMutation({
     mutationFn: deleteExpense,
     onError: (error) => {
       console.error('Error deleting expense:', error);
     },
     onSuccess: () => {
       console.log('Expense deleted successfully');
     },
   });
 };
 
export const useAddExpense = () => {
   return useMutation({
      mutationFn: addExpense,
      onError: (error) => {
         console.error("Error adding expense:", error);
      },
      onSuccess: () => {
         console.log("Expense added successfully");
      },
   });
};

export const useUpdateExpense = () => {
   return useMutation({
      mutationFn: updateExpense,
      onError: (error) => {
         console.error('Error updating expense name and cost:', error);
      },
      onSuccess: () => {
         console.log('Expense name and cost updated successfully');
      },
   });
};
