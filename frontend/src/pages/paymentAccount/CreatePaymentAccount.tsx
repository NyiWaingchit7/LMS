import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetCreateAccount } from "../../store/slice/payment_accountSlice";

export const CreatePaymentAccount = () => {
  const paymentBanks = useAppSelector((store) => store.paymentAccount.banks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetCreateAccount());
  }, []);
  return (
    <Layout title="Add Paymet Account">
      <HeadLine header="Add Paymet Account" />
      <Form paymentBanks={paymentBanks} />
    </Layout>
  );
};
