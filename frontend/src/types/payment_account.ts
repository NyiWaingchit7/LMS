import { BaseOption } from "./auth";
import { PaymentBank, paymentBankData } from "./payment_bank";

export interface PaymentAccount {
  id?: number;
  name: string;
  phone_number: string;
  payment_bank_id?: number;
  payment_bank: PaymentBank;
}

export interface PaymentAccountSlice {
  items: PaymentAccount[];
  data: PaymentAccount;
  isLoading: boolean;
  error: Error | null;
}

export interface CreatePaymentAccount extends BaseOption {
  name: string;
  phone_number: string;
  payment_bank_id: number;
}

export interface UpdatePaymentAccount extends BaseOption {
  id: number;
  name: string;
  phone_number: string;
  payment_bank_id: number;
}

export interface DeletePaymentAccount extends BaseOption {
  id: number;
}

export const payment_accountData = {
  name: "",
  phone_number: "",
  payment_bank_id: undefined,
  payment_bank: paymentBankData,
};
