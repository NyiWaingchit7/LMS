import { BaseOption } from "./auth";

export interface PaymentBank {
  id?: number;
  name: string;
  assetUrl?: string;
}

export interface PaymentBankSlice {
  items: PaymentBank[];
  links: any[];
  data: PaymentBank;
  isLoading: boolean;
  error: null | { [key: string]: string };
}

export interface CreatePaymentBank extends BaseOption {
  name: string;
  assetUrl?: string;
}

export interface UpdatePaymentBank extends BaseOption {
  id: number;
  name: string;
  assetUrl?: string;
}

export interface DeletePaymentBank extends BaseOption {
  id: number;
}

export const paymentBankData = {
  id: undefined,
  name: "",
  assetUrl: "",
};
