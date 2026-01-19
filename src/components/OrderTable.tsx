'use client';
import { Order } from '../types/order';
import { CheckCircle2, Clock, Loader2, XCircle } from 'lucide-react';

const statusMap = {
  pending: { label: 'Pendiente', color: 'text-gray-500 bg-gray-100', icon: Clock },
  processing: { label: 'Procesando', color: 'text-blue-500 bg-blue-100', icon: Loader2 },
  completed: { label: 'Completado', color: 'text-green-500 bg-green-100', icon: CheckCircle2 },
  failed: { label: 'Fallido', color: 'text-red-500 bg-red-100', icon: XCircle },
};

export default function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
            <th className="px-6 py-4 font-semibold">Orden</th>
            <th className="px-6 py-4 font-semibold">Cliente</th>
            <th className="px-6 py-4 font-semibold">Producto</th>
            <th className="px-6 py-4 font-semibold text-center">Cant.</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            const StatusIcon = statusMap[order.status].icon;
            return (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{order.order_number}</td>
                <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.product}</td>
                <td className="px-6 py-4 text-center text-gray-600">{order.quantity}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusMap[order.status].color}`}>
                    <StatusIcon size={14} className={order.status === 'processing' ? 'animate-spin' : ''} />
                    {statusMap[order.status].label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}