'use client';
import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { Order } from '../types/order';
import OrderTable from '../components/OrderTable';
import FileUpload from '../components/FileUpload';
import OrderStats from '../components/OrderStats';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  // Inicializamos siempre con un array vacío []
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      // Verificamos si la data es un array o viene envuelta en un objeto (ej: data.data)
      const formattedData = Array.isArray(data) ? data : (data as any).data || [];
      setOrders(formattedData);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      setOrders([]); // En caso de error, dejamos la lista vacía para que no explote
    }
  };

  useEffect(() => {
    fetchOrders();
    // Polling cada 5 segundos para ver actualizaciones de NestJS
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Order Management</h1>
            <p className="text-gray-500">Monitoreo de procesamiento NestJS + Laravel</p>
          </div>
          <FileUpload onUploadSuccess={fetchOrders} />
        </div>

        <OrderStats orders={orders} />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Listado de Órdenes</h2>
          <OrderTable orders={orders} />
        </div>
      </div>
    </main>
  );
}