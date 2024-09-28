import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

export const CreatePaymentBank = () => {
  return (
    <Layout title="Add Payment Bank">
      <HeadLine header="Add Payment Bank" />
      <Form />
    </Layout>
  );
};
