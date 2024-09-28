import { BaseOption } from "./auth";

export interface Student {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  assetUrl: string;
}

export interface StudentSlice {
  items: Student[];
  data: Student;
  isLoading: boolean;
  error: Error | null;
}

export interface CreateStudent extends BaseOption {
  name: string;
  email: string;
  password: string;
  phone?: string;
  assetUrl?: string;
}

export interface UpdateStudent extends BaseOption {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  assetUrl?: string;
}

export interface DeletStudent extends BaseOption {
  id: number;
}

export const studentData = {
  name: "",
  email: "",
  password: "",
  phone: "",
  assetUrl: "",
};
