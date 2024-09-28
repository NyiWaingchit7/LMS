import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

export const CreateStudent = () => {
  return (
    <Layout title="Add Student">
      <HeadLine header="Add Student" />
      <Form />
    </Layout>
  );
};
