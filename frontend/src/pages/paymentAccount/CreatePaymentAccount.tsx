import { useEffect, useState } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { PaymentBank } from "../../types/payment_bank";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";

export const CreatePaymentAccount = () => {
  const [paymentBanks, setPaymentBanks] = useState<PaymentBank[]>([]);
  useEffect(() => {
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
    };
  }, []);
  return (
    <Layout title="Add Paymet Account">
      <HeadLine header="Add Paymet Account" />
      <Form paymentBanks={paymentBanks} />
    </Layout>
  );
};
