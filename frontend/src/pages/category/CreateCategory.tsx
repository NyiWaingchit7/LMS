import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./Partials/Form";

export const CreateCategory = () => {
  return (
    <Layout title="Add Category">
      <HeadLine header="Add Category" />
      <Form />
    </Layout>
  );
};
