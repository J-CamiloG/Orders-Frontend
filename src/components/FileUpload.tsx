'use client';
import React, { useState } from 'react';
import { importOrders } from '../services/api';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FileUpload({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      await importOrders(file);
      toast.success('Archivo importado. Procesando órdenes...');
      onUploadSuccess(); 
    } catch (error) {
      toast.error('Error al subir el archivo');
    } finally {
      setLoading(false);
      e.target.value = ''; 
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
        {loading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
        {loading ? 'Subiendo...' : 'Importar CSV'}
        <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}