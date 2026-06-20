import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { STOCK_CATEGORIES } from '../../../mocks/items';
import type { ItemFormData, Item } from '../types';
import { useEffect } from 'react';

const schema = z.object({
  itemName: z.string().min(2, 'Item Name is required'),
  brand: z.string().optional(),
  type: z.enum(['Duplex', 'Reel', 'PrintedPaper', 'FinishedGood', 'Consumable', 'RawMaterial']),
  category: z.string().min(1, 'Category is required'),
  unitOfMeasure: z.string().min(1, 'Unit is required'),
  itemSpecification: z.object({
    gsm: z.string().optional(),
    dimensions: z.string().optional()
  }).optional(),
  boxSpecification: z.object({
    ply: z.string().optional(),
    flute: z.string().optional(),
    boardSize: z.string().optional(),
    sheetSize: z.string().optional(),
    boxSize: z.string().optional()
  }).optional()
});

type FormValues = z.infer<typeof schema>;

interface ItemFormProps {
  initialData?: Item;
  onSubmit: (data: ItemFormData) => void;
  isSubmitting: boolean;
}

export function ItemForm({ initialData, onSubmit, isSubmitting }: ItemFormProps) {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      itemName: initialData.itemName,
      brand: initialData.brand || '',
      type: initialData.type,
      category: initialData.category,
      unitOfMeasure: initialData.unitOfMeasure,
      itemSpecification: initialData.itemSpecification || {},
      boxSpecification: initialData.boxSpecification || {},
    } : {
      type: 'RawMaterial',
      category: STOCK_CATEGORIES[0],
      unitOfMeasure: 'KG'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        itemName: initialData.itemName,
        brand: initialData.brand || '',
        type: initialData.type,
        category: initialData.category,
        unitOfMeasure: initialData.unitOfMeasure,
        itemSpecification: initialData.itemSpecification || {},
        boxSpecification: initialData.boxSpecification || {},
      });
    }
  }, [initialData, reset]);

  const category = watch('category');
  const isFinishedGood = category === 'Finished Boxes';

  const inputClass = 'w-full rounded-lg border border-gray-300 dark:border-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-black placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors shadow-inner';

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-5 p-1 pb-10">
      
      {/* Basic Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Basic Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
            <input {...register('itemName')} placeholder="e.g. Duplex Reel 350 GSM" className={inputClass} />
            {errors.itemName && <p className="mt-1 text-xs text-red-500">{errors.itemName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
            <input {...register('brand')} placeholder="e.g. ITC, Agarwal Paper" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
            <select {...register('category')} className={inputClass}>
              {STOCK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
            <select {...register('type')} className={inputClass}>
              <option value="RawMaterial">Raw Material</option>
              <option value="FinishedGood">Finished Good</option>
              <option value="Consumable">Consumable</option>
              <option value="Duplex">Duplex</option>
              <option value="Reel">Reel</option>
              <option value="PrintedPaper">Printed Paper</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Unit of Measure *</label>
          <select {...register('unitOfMeasure')} className={inputClass}>
            <option value="KG">KG</option>
            <option value="Sheets">Sheets</option>
            <option value="Rolls">Rolls</option>
            <option value="PCS">PCS</option>
            <option value="Bundles">Bundles</option>
          </select>
        </div>
      </div>

      {/* Raw Material Specifications */}
      {!isFinishedGood && (
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Material Specifications</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GSM</label>
              <input {...register('itemSpecification.gsm')} placeholder="e.g. 250" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensions / Size</label>
              <input {...register('itemSpecification.dimensions')} placeholder="e.g. 28x40 inch" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Box Specifications */}
      {isFinishedGood && (
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Box Specifications</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Ply</label>
              <select {...register('boxSpecification.ply')} className={inputClass}>
                <option value="">— Select —</option>
                <option value="2">2 Ply</option>
                <option value="3">3 Ply</option>
                <option value="5">5 Ply</option>
                <option value="7">7 Ply</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Flute Type</label>
              <input {...register('boxSpecification.flute')} placeholder="e.g. E-Flute, B-Flute" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Board Size</label>
              <input {...register('boxSpecification.boardSize')} placeholder="e.g. 24x24 inch" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Box Size (L x B x H)</label>
              <input {...register('boxSpecification.boxSize')} placeholder="e.g. 12x12x2 inch" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200 dark:border-neutral-800">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (initialData ? 'Updating Item...' : 'Creating Item...') : (initialData ? 'Update Item' : 'Create Item')}
        </button>
      </div>
    </form>
  );
}
