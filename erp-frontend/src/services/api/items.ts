import { mockItems } from '../../mocks/items';
import type { Item, ItemFormData } from '../../features/items/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getItems() {
  await delay(500);
  return { data: mockItems, success: true, message: 'Items fetched successfully' };
}

export async function createItem(data: ItemFormData) {
  await delay(800);
  
  const newItem: Item = {
    ...data,
    _id: Math.random().toString(36).substr(2, 9),
    itemCode: `${data.category.substring(0,3).toUpperCase()}-${Math.floor(Math.random()*1000)}`,
    createdAt: new Date().toISOString()
  };
  
  mockItems.unshift(newItem);
  return { data: newItem, success: true, message: 'Item created successfully' };
}
