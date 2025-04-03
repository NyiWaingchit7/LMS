import { Form } from "./partials/Form";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";

export const CreatePopularLecture = () => {
  return (
    <Layout title="Add Popular Lecture">
      <HeadLine header="Add Popular Lecture" />
      <Form />
    </Layout>
  );
};
