import { useMutation, useQuery } from '@tanstack/react-query';
import { AssetData } from '../types/types';
import api from './api';

const fetchAssets = async (): Promise<AssetData[]> => {
  const response = await api.get(`assets/{userId}`);
  return response.data;
};

const updateAsset = async (data: { id: number; name: string; cost: number; color: string }) => {
   await api.put(`/assets/${data.id}`, {
      name: data.name,
      cost: data.cost,
      color: data.color
    });
};

const deleteAsset = async (id: number) => {
   await api.delete(`assets/${id}`);
};
const createAsset = async (data: { name: string; cost: number; color: string }) => {
   await api.post(`assets/{userId}`, data);
 }; 
 
export const useAssetData = () => {
   return useQuery<AssetData[], Error>({
      queryKey: ['assetData'],
      queryFn: fetchAssets,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
   });
};

export const useUpdateAsset = () => {
   return useMutation({
      mutationFn: updateAsset,
      onError: (error) => {
         console.error('Error updating asset name and cost:', error);
      },
      onSuccess: () => {
         console.log('Asset name and cost updated successfully');
      },
   });
};

export const useDeleteAsset = () => {
   return useMutation({
     mutationFn: deleteAsset,
     onError: (error) => {
       console.error('Error deleting asset:', error);
     },
     onSuccess: () => {
       console.log('Asset deleted successfully');
     },
   });
 };
 
 export const useAddAsset = () => {
   return useMutation({
     mutationFn: createAsset,
     onError: (error) => {
       console.error('Error adding asset:', error);
     },
     onSuccess: () => {
       console.log('Asset added successfully');
     },
   });
 };
 