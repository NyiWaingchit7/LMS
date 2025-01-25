import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  handleShowPaymentBank,
  setPaymentBankData,
} from "@/store/slice/payment_bankSlice";
import { PaymentBank, paymentBankData } from "@/types/payment_bank";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "./partials/Form";

export const EditPaymentBank = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const paymentBank = useAppSelector(
    (store) => store.paymentBank.data
  ) as PaymentBank;

  useEffect(() => {
    dispatch(handleShowPaymentBank(id));
    return () => {
      dispatch(setPaymentBankData(paymentBankData));
    };
  }, [id]);

  return (
    <Layout title="Edit Payment Bank">
      <HeadLine header="Edit Payment Bank" />
      <Form paymentBank={paymentBank} />
    </Layout>
  );
};
