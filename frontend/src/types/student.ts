import { BaseOption } from "./auth";
import { Purchase } from "./purchase";

export interface Student {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  assetUrl: string;
  purchase?: Purchase[];
}

export interface StudentSlice {
  items: Student[];
  links: any[];
  data: Student;
  isLoading: boolean;
  error: null | { [key: string]: string };
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
