import { useState } from 'react';
import { Plus, PackageSearch, Tag, Layers, Package } from 'lucide-react';
import { useItems, useCreateItem } from './hooks/useItems';
import { ItemForm } from './components/ItemForm';
import { SlideOver } from '../../components/ui/SlideOver';
import type { ItemFormData } from './types';

export function ItemsPage() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const { data: itemsData, isLoading } = useItems();
  const createMutation = useCreateItem();

  const items = itemsData?.data || [];

  const handleCreate = (data: ItemFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsSlideOverOpen(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Item Master</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage global item definitions, brands, and specifications.</p>
        </div>
        <button
          onClick={() => setIsSlideOverOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={18} />
          Add New Item
        </button>
      </div>

      <div className="bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-neutral-900/50 border-b border-gray-200 dark:border-neutral-800">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Item</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Brand</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Specifications</th>
                <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">UOM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading items...</td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <PackageSearch size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">No items found</p>
                      <p className="text-sm mt-1">Add items to populate the Item Master.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400">
                          {item.type === 'FinishedGood' ? <Package size={20} /> : <Layers size={20} />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{item.itemName}</div>
                          <div className="text-xs text-gray-500">{item.itemCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.brand ? (
                        <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                          <Tag size={14} className="text-gray-400" />
                          <span>{item.brand}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.type === 'FinishedGood' && item.boxSpecification ? (
                          <div className="space-y-1">
                            {item.boxSpecification.ply && <div>{item.boxSpecification.ply} Ply {item.boxSpecification.flute ? `(${item.boxSpecification.flute})` : ''}</div>}
                            {item.boxSpecification.boxSize && <div>Size: {item.boxSpecification.boxSize}</div>}
                          </div>
                        ) : item.itemSpecification ? (
                          <div className="space-y-1">
                            {item.itemSpecification.gsm && <div>{item.itemSpecification.gsm} GSM</div>}
                            {item.itemSpecification.dimensions && <div>{item.itemSpecification.dimensions}</div>}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.unitOfMeasure}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SlideOver
        isOpen={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        title="Add New Item"
      >
        <ItemForm onSubmit={handleCreate} isSubmitting={createMutation.isPending} />
      </SlideOver>
    </div>
  );
}
