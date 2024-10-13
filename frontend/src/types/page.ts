import { BaseOption } from "./auth";
import { Lecture, lectureData } from "./lecture";

export interface Page {
  id?: number;
  title: string;
  content: string;
}

export interface PageSlice {
  items: Page[];
  links: any[];
  data: Page;
  isLoading: boolean;
  error: null | { [key: string]: string };
}

export interface CreatePage extends BaseOption {
  title: string;
  content: string;
}

export interface UpdatePage extends BaseOption {
  id: number;
  title: string;
  content: string;
}

export interface DeletePage extends BaseOption {
  id: number;
}

export const pageData = {
  id: undefined,
  title: "",
  content: "",
};
