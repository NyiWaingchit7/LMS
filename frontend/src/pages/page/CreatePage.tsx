import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

export const CreatePage = () => {
  return (
    <Layout title="Add Page">
      <HeadLine header="Add Page" />
      <Form />
    </Layout>
  );
};
