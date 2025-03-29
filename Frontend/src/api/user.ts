import { useMutation, useQuery } from '@tanstack/react-query';
import api from './api';

const fetchUser = async () => {
  const response = await api.get('users/{userId}');
  return response.data;
};

const updateUserNameSurname = async (userData: {
  name: string;
  surname: string;
}) => {
  const { name, surname } = userData;
  await api.patch(
    `users/{userId}/name-surname?name=${name}&surname=${surname}`
  );
};

const updateUserEmail = async (email: string) => {
  await api.patch(`users/{userId}/email?email=${email}`);
};

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUserNameSurname = () => {
  return useMutation({
    mutationFn: updateUserNameSurname,
    onError: (error) => {
      console.error('Error updating user name and surname:', error);
    },
    onSuccess: () => {
      console.log('User name and surname updated successfully');
    },
  });
};

export const useUpdateUserEmail = () => {
  return useMutation({
    mutationFn: updateUserEmail,
    onError: (error) => {
      console.error('Error updating user email:', error);
    },
    onSuccess: () => {
      console.log('User email updated successfully');
    },
  });
};
