import { api } from './client';
import type { ItemFormData } from '../../features/items/types';

export async function getItems() {
  const response = await api.get('/items');
  return response.data;
}

export async function createItem(data: ItemFormData) {
  const response = await api.post('/items', data);
  return response.data;
}

export async function updateItem(id: string, data: ItemFormData) {
  const response = await api.put(`/items/${id}`, data);
  return response.data;
}

export async function deleteItem(id: string) {
  const response = await api.delete(`/items/${id}`);
  return response.data;
}
