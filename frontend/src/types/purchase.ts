import { BaseOption } from "./auth";
import { Lecture, lectureData } from "./lecture";
import { Student, studentData } from "./student";

export interface Purchase {
  id?: number;
  student?: Student;
  lecture?: Lecture;
  studentId?: number;
  lectureId?: number;
  payment_status?: PaymentStatus;
  payment_assetUrl: string;
  created_at?: Date;
}

export interface PurchaseSlice {
  items: Purchase[];
  links: any[];
  data: Purchase;
  isLoading: boolean;
  error: null | { [key: string]: string };
}

export interface CreatePurchase extends BaseOption {
  studentId: number;
  lectureId: number;
  total_price: number;
  payment_assetUrl: string;
}

export interface UpdatePurchase extends BaseOption {
  id: number;
  payment_status: PaymentStatus;
}

export interface DeletePurchase extends BaseOption {
  id: number;
}

export enum PaymentStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
}

export const purchaseData = {
  studentId: undefined,
  lectureId: undefined,
  student: studentData,
  lecture: lectureData,
  payment_assetUrl: "",
  payment_status: PaymentStatus.PENDING,
};
