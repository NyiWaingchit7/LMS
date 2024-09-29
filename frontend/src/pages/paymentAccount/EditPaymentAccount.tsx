import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import {
  payment_accountData,
  PaymentAccount,
} from "../../types/payment_account";
import {
  handleShowPaymentAccount,
  setPaymentAccountData,
} from "../../store/slice/payment_accountSlice";
import { handleGetPaymentBank } from "../../store/slice/payment_bankSlice";

export const EditPaymentAccount = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const paymentAccount = useAppSelector(
    (store) => store.paymentAccount.data
  ) as PaymentAccount;
  const paymentBanks = useAppSelector((store) => store.paymentBank.items);

  useEffect(() => {
    dispatch(handleShowPaymentAccount(id));
    dispatch(handleGetPaymentBank());

    return () => {
      dispatch(setPaymentAccountData(payment_accountData));
    };
  }, [id]);
  if (!paymentAccount) return null;
  return (
    <Layout title="Edit Payment Account">
      <HeadLine header="Edit Payment Account" />
      <Form paymentAccount={paymentAccount} paymentBanks={paymentBanks} />
    </Layout>
  );
};
