import axios from 'axios';
import { Order } from '../types/order';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};

export const importOrders = async (file: File) => {
  const formData = new FormData();

  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

  formData.append('file', file);
  formData.append('format', fileExtension); 

  const response = await api.post('/orders/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default api;