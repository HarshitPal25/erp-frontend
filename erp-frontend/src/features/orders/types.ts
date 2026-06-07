export interface OrderFormData {
  orderNumber: string;
  customerName: string;
  itemName: string;
  itemSerialNumber: string;
  dieSerialNumber: string;
  quantityOrdered: string;
  boxType: string;
  printed: boolean;
  laminated: boolean;
  length: string;
  breadth: string;
  height: string;
  sheetLength: string;
  sheetBreadth: string;
  ply: string;
  gsm: string;
}

export interface Order extends OrderFormData {
  _id: string;
  status?: string;
  createdAt?: string;
  totalCost?: number;
}
