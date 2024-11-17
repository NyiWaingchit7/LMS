import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import {
  payment_accountData,
  PaymentAccount,
} from "../../types/payment_account";
import {
  handleShowPaymentAccount,
  setPaymentAccountData,
} from "../../store/slice/payment_accountSlice";
import { PaymentBank } from "../../types/payment_bank";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";

export const EditPaymentAccount = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const paymentAccount = useAppSelector(
    (store) => store.paymentAccount.data
  ) as PaymentAccount;

  const [paymentBanks, setPaymentBanks] = useState<PaymentBank[]>([]);

  useEffect(() => {
    dispatch(handleShowPaymentAccount(id));

    const fetchData = async () => {
      const response = await fetch(`${config.apiUrl}/get-paymentbanks`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      setPaymentBanks(data.data);
    };
    fetchData();

    return () => {
      setPaymentBanks([]);
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
