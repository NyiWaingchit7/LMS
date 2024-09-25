import { BaseOption } from "./auth";

export interface Category {
  id?: number;
  name: string;
  assetUrl?: string;
}

export interface CategorySlice {
  items: Category[];
  data: Category;
  isLoading: boolean;
  error: Error | null;
}

export interface CreateCategory extends BaseOption {
  name: string;
  assetUrl?: string;
}

export interface UpdateCategory extends BaseOption {
  id: number;
  name: string;
  assetUrl?: string;
}

export interface DeleteCategory extends BaseOption {
  id: number;
}

export const categoryData = {
  id: undefined,
  name: "",
  assetUrl: "",
};
