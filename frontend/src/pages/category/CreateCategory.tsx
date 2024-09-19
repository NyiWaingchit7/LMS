import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

export const CreateCategory = () => {
  return (
    <Layout>
      <HeadLine header="Add Category" />
      <Form />
    </Layout>
  );
};
