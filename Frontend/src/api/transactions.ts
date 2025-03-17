import { useQuery } from '@tanstack/react-query';
import { YearlyData, MonthlyData, Transaction } from '../types/types';
import api from './api';

export const fetchTransactions = async () => {
  const response = await api.get(`transactions/latest/{userId}`);
  return response.data;
};

export const fetchMonthlyData = async (): Promise<MonthlyData[]> => {
  const response = await api.get(`transactions/monthly-summary/{userId}`);
  return response.data;
};

const fetchYearlyData = async (): Promise<YearlyData[]> => {
  const response = await api.get(`transactions/yearly-summary/{userId}`);
  return response.data;
};

export const useTransactionsData = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactionData'],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useMonthlyData = () => {
  return useQuery<MonthlyData[], Error>({
    queryKey: ['monthlyData'],
    queryFn: fetchMonthlyData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useYearlyData = () => {
  return useQuery<YearlyData[], Error>({
    queryKey: ['yearlyData'],
    queryFn: fetchYearlyData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
