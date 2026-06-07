import axios from 'axios';
import type { Order, OrderFormData } from '../../features/orders/types';

const API_URL = "http://localhost:5000/api/orders";

export async function getOrders(): Promise<{ data: Order[] }> {
  // If the backend doesn't support GET /api/orders yet, this might fail,
  // but it's the standard pattern. We will wrap it in a try-catch in the hook if needed.
  try {
    const response = await axios.get(API_URL);
    return response.data; // Assumes backend returns { data: Order[] } or we can map it
  } catch (error) {
    console.error("Failed to fetch orders, returning empty array", error);
    return { data: [] };
  }
}

export async function createOrder(data: OrderFormData): Promise<{ data: Order }> {
  const response = await axios.post(API_URL, data);
  return response.data;
}

export async function updateOrder(id: string, data: Partial<OrderFormData>): Promise<{ data: Order }> {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

export async function deleteOrder(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
