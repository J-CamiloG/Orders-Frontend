import axios from 'axios';
import { Order } from '../types/order';

const api = axios.create({
  // URL base apuntando a tu orquestador Laravel
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Obtiene el listado de órdenes desde la base de datos de Laravel
 */
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  // Si Laravel devuelve la data envuelta en un objeto { data: [...] }, 
  // la lógica en page.tsx ya lo maneja, pero aquí devolvemos la respuesta directa.
  return response.data;
};

/**
 * Sube un archivo CSV o JSON a la API de Laravel.
 * Incluye el campo 'format' requerido por la validación del backend.
 */
export const importOrders = async (file: File) => {
  const formData = new FormData();
  
  // Extraemos la extensión (csv o json) para cumplir con la validación de Laravel
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

  formData.append('file', file);
  formData.append('format', fileExtension); 

  const response = await api.post('/orders/import', formData, {
    headers: {
      // Importante: Al enviar FormData, axios configura el Boundary automáticamente
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default api;