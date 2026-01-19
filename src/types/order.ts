export interface Order {
  id: number;
  order_number: string;
  customer: string;
  product: string;
  quantity: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}