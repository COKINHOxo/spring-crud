export interface Product {
    id: number;      
    name: string;
    description: string;
    price: number;
    category: string;
    quantityInStock: number;
    releaseDate: Date;
    rating?: number;
    active: boolean;
    imageUrl?: string;
    discount: number;
  }