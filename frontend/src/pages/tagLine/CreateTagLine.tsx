import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

export const CreateTagLine = () => {
  return (
    <Layout title="Add TagLine">
      <HeadLine header="Add TagLine" />
      <Form />
    </Layout>
  );
};
