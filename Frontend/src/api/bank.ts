import { useQuery } from '@tanstack/react-query';
import { BankData } from '../types/types';
import api from './api';

const fetchBankAccount = async () => {
  const response = await api.get(`banks/{userId}`);
  return response.data;
};

export const useBankData = () => {
  return useQuery<BankData, Error>({
    queryKey: ['bankData'],
    queryFn: fetchBankAccount,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
