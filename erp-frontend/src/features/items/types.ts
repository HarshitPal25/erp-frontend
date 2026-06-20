export type ItemType = 'Duplex' | 'Reel' | 'PrintedPaper' | 'FinishedGood' | 'Consumable' | 'RawMaterial';

export interface ItemSpecification {
  gsm?: string;
  dimensions?: string; // or size
}

export interface BoxSpecification {
  ply?: string;
  flute?: string;
  boardSize?: string;
  sheetSize?: string;
  boxSize?: string;
}

export interface Item {
  _id: string;
  itemCode: string;
  itemName: string;
  brand?: string;
  type: ItemType;
  category: string;
  itemSpecification?: ItemSpecification;
  boxSpecification?: BoxSpecification;
  unitOfMeasure: string;
  createdAt?: string;
}

export interface ItemFormData {
  itemName: string;
  brand?: string;
  type: ItemType;
  category: string;
  itemSpecification?: {
    gsm?: string;
    dimensions?: string;
  };
  boxSpecification?: {
    ply?: string;
    flute?: string;
    boardSize?: string;
    sheetSize?: string;
    boxSize?: string;
  };
  unitOfMeasure: string;
}
