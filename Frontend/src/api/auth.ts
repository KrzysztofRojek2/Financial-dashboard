import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AuthRequest } from '../types/types';
import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const loginRequest = async (credentials: AuthRequest) => {
  const response = await axios.post(`${BASE_URL}auth/login`, credentials);
  const { token, userId } = response.data;

  useAuthStore.getState().setAuth(token, userId);
  console.log("Zalogowano, token:", token, "userId:", userId);

  return { token, userId };
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      console.log('Logowanie udane:', data);
    },
    onError: (error) => {
      console.error('Błąd logowania:', error);
    },
  });
};

const registerRequest = async (credentials: { email: string; password: string }) => {
  await axios.post(`${BASE_URL}auth/register`, credentials);
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      console.log('Rejestracja udana');
    },
    onError: (error) => {
      console.error('Błąd rejestracji:', error);
    },
  });
};
