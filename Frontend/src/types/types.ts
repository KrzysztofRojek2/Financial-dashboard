export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  netWorth: number;
  bankAccountId: number;
}

export interface AssetData {
  id: number;
  name: string;
  cost: number;
  color: string;
}

export interface MonthlyData {
  period: number;
  income: number;
  expense: number;
}

export interface YearlyData {
  period: number;
  income: number;
  expense: number;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  name: string;
}

export interface ExpenseData {
  id: number;
  name: string;
  cost: number;
}

export interface BalanceHistory {
  month: string;
  balance: number;
}

export interface BankData {
  id: number;
  bankName: string;
  balance: number;
  balanceHistory: BalanceHistory[];
}

export interface AuthRequest {
  email: string;
  password: string;
}
