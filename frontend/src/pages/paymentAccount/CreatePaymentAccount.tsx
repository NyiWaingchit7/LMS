import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Form } from "./partials/Form";
import { PaymentBank } from "../../types/payment_bank";
import { handleGetPaymentBank } from "../../store/slice/payment_bankSlice";

export const CreatePaymentAccount = () => {
  const paymentBanks = useAppSelector(
    (store) => store.paymentBank.items
  ) as PaymentBank[];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetPaymentBank());
  }, []);
  return (
    <Layout title="Add Paymet Account">
      <HeadLine header="Add Paymet Account" />
      <Form paymentBanks={paymentBanks} />
    </Layout>
  );
};
