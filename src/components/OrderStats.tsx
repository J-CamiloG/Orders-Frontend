'use client';
import { Order } from '../types/order';
import { ClipboardList, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OrderStats({ orders = [] }: { orders: Order[] }) {
  // Validación de seguridad: nos aseguramos de que siempre sea un array
  const safeOrders = Array.isArray(orders) ? orders : [];

  const stats = [
    {
      label: 'Total Órdenes',
      value: safeOrders.length,
      icon: ClipboardList,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
    },
    {
      label: 'En Proceso',
      value: safeOrders.filter((o) => o.status === 'processing' || o.status === 'pending').length,
      icon: Loader2,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      animate: safeOrders.some(o => o.status === 'processing'),
    },
    {
      label: 'Completadas',
      value: safeOrders.filter((o) => o.status === 'completed').length,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Fallidas',
      value: safeOrders.filter((o) => o.status === 'failed').length,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} className={stat.animate ? 'animate-spin' : ''} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}