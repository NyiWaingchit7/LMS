import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { PaymentBank, paymentBankData } from "../../types/payment_bank";
import {
  handleShowPaymentBank,
  setPaymentBankData,
} from "../../store/slice/payment_bankSlice";

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
