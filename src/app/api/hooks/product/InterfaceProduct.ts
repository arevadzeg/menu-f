export interface Product {
  id: string;
  storeId: string;
  title: string;
  price: number;
  isOnSale: boolean;
  image: string;
  section: string | null;
  sortOrder: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
