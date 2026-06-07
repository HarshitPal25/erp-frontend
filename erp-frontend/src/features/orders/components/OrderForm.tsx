import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { OrderFormData } from '../types';
import { Calculator } from 'lucide-react';

const isPositiveNumber = (val: string) => !val || (!isNaN(Number(val)) && Number(val) > 0);

const schema = z.object({
  orderNumber: z.string().min(3, 'Order number must be at least 3 characters'),
  customerName: z.string().min(2, 'Customer name is required'),
  itemName: z.string().min(2, 'Item name is required'),
  itemSerialNumber: z.string(),
  dieSerialNumber: z.string(),
  quantityOrdered: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0 && Number.isInteger(Number(val)), 'Valid whole number > 0 required'),
  boxType: z.string().min(1, 'Please select a Box Type'),
  printed: z.boolean(),
  laminated: z.boolean(),
  length: z.string().refine(isPositiveNumber, 'Must be > 0'),
  breadth: z.string().refine(isPositiveNumber, 'Must be > 0'),
  height: z.string().refine(isPositiveNumber, 'Must be > 0'),
  sheetLength: z.string().refine(isPositiveNumber, 'Must be > 0'),
  sheetBreadth: z.string().refine(isPositiveNumber, 'Must be > 0'),
  ply: z.string().refine(val => !val || (Number.isInteger(Number(val)) && Number(val) > 0), 'Whole number > 0'),
  gsm: z.string().refine(isPositiveNumber, 'Must be > 0'),
});

type FormValues = z.infer<typeof schema>;

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<OrderFormData>;
}

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

export function OrderForm({ onSubmit, isSubmitting, defaultValues }: OrderFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderNumber: '',
      customerName: '',
      itemName: '',
      itemSerialNumber: '',
      dieSerialNumber: '',
      quantityOrdered: '',
      boxType: '',
      printed: false,
      laminated: false,
      length: '',
      breadth: '',
      height: '',
      sheetLength: '',
      sheetBreadth: '',
      ply: '',
      gsm: '',
      ...defaultValues,
    },
  });

  const onValidSubmit = (values: FormValues) => {
    onSubmit(values as unknown as OrderFormData);
  };

  // Auto-calculation values (Display only, not sent to backend)
  const l = parseFloat(watch('length') || '0');
  const b = parseFloat(watch('breadth') || '0');
  const gsm = parseFloat(watch('gsm') || '0');
  const qty = parseFloat(watch('quantityOrdered') || '0');
  
  // Dummy packaging formula: (L * B * GSM) / 1550 (to get kg per 1000 sheets)
  const estWeightPer1000 = (l * b * gsm) / 1550;
  const totalWeight = (estWeightPer1000 * qty) / 1000;

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Order & Party Info</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Order Number *" error={errors.orderNumber?.message}>
            <input {...register('orderNumber')} placeholder="e.g. ORD-1001" className={inputClass} />
          </FormField>
          <FormField label="Customer Name *" error={errors.customerName?.message}>
            <input {...register('customerName')} placeholder="Select Customer" className={inputClass} />
          </FormField>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Item Specifications</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Item Name *" error={errors.itemName?.message}>
            <input {...register('itemName')} placeholder="Item Description" className={inputClass} />
          </FormField>
          <FormField label="Box Type *" error={errors.boxType?.message}>
            <select {...register('boxType')} className={inputClass}>
              <option value="">Select Box Type</option>
              <option value="Pizza Type">Pizza Type</option>
              <option value="Flap Type">Flap Type</option>
              <option value="Carton Type">Carton Type</option>
              <option value="Ghera Patti">Ghera Patti</option>
              <option value="Z Patti">Z Patti</option>
            </select>
          </FormField>
          <FormField label="Item Serial No." error={errors.itemSerialNumber?.message}>
            <input {...register('itemSerialNumber')} placeholder="Item SN" className={inputClass} />
          </FormField>
          <FormField label="Die Serial No." error={errors.dieSerialNumber?.message}>
            <input {...register('dieSerialNumber')} placeholder="Die SN" className={inputClass} />
          </FormField>
          <FormField label="Quantity *" error={errors.quantityOrdered?.message}>
            <input {...register('quantityOrdered')} type="number" placeholder="Qty" className={inputClass} />
          </FormField>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Dimensions & Material (Auto-calculated)</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <FormField label="Length (inches)" error={errors.length?.message}>
            <input {...register('length')} type="number" step="0.1" placeholder="L" className={inputClass} />
          </FormField>
          <FormField label="Breadth (inches)" error={errors.breadth?.message}>
            <input {...register('breadth')} type="number" step="0.1" placeholder="B" className={inputClass} />
          </FormField>
          <FormField label="Height (inches)" error={errors.height?.message}>
            <input {...register('height')} type="number" step="0.1" placeholder="H" className={inputClass} />
          </FormField>
          <FormField label="Sheet Length (in)" error={errors.sheetLength?.message}>
            <input {...register('sheetLength')} type="number" step="0.1" placeholder="SL" className={inputClass} />
          </FormField>
          <FormField label="Sheet Breadth (in)" error={errors.sheetBreadth?.message}>
            <input {...register('sheetBreadth')} type="number" step="0.1" placeholder="SB" className={inputClass} />
          </FormField>
          <FormField label="Ply (layers)" error={errors.ply?.message}>
            <input {...register('ply')} type="number" placeholder="e.g. 3" className={inputClass} />
          </FormField>
          <FormField label="GSM (g/m²)" error={errors.gsm?.message}>
            <input {...register('gsm')} type="number" placeholder="e.g. 150" className={inputClass} />
          </FormField>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
          <Calculator className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Duplex Estimate</h4>
            <p className="text-xs text-blue-700 mt-1">Est. Weight per 1000: <span className="font-bold">{estWeightPer1000 > 0 ? estWeightPer1000.toFixed(2) : '--'} kg</span></p>
            <p className="text-xs text-blue-700">Total Order Weight: <span className="font-bold">{totalWeight > 0 ? totalWeight.toFixed(2) : '--'} kg</span></p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Finishing</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" {...register('printed')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
            Printed
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" {...register('laminated')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
            Laminated
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Create Order'}
        </button>
      </div>
    </form>
  );
}
