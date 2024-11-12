export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subCategories: SubCategory[];
}
