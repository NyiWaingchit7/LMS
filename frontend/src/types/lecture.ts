import { BaseOption } from "./auth";
import { Category } from "./category";

export interface Lecture {
  id?: number;
  title: string;
  description: string;
  price?: number;
  isPremium?: boolean;
  discount_price?: number;
  assetUrl?: string;
  categories: Category[];
}

export interface LectureSlice {
  items: Lecture[];
  data: Lecture;
  isLoading: boolean;
  error: null | { [key: string]: string };
}

export interface CreateLecture extends BaseOption {
  title: string;
  description: string;
  price?: number;
  isPremium?: boolean;
  discount_price?: number;
  assetUrl?: string;
  categories: number[];
}

export interface UpdateLecture extends BaseOption {
  id: number;
  title: string;
  description: string;
  price?: number;
  isPremium?: boolean;
  discount_price?: number;
  assetUrl?: string;
  categories: number[];
}

export interface DeleteLecture extends BaseOption {
  id: number;
}

export const lectureData = {
  id: undefined,
  title: "",
  description: "",
  price: 0,
  discount_price: 0,
  isPremium: false,
  assetUrl: "",
  categories: [],
};
