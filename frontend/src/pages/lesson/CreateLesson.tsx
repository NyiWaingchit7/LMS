import { useEffect } from "react";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch } from "@/store/hooks";
import { createLesson } from "@/store/slice/lessonSlice";

export const CreateLesson = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createLesson());
  }, []);
  return (
    <Layout title="Add Lesson">
      <HeadLine header="Add Lesson" />
      <Form />
    </Layout>
  );
};
