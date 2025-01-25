import { useEffect } from "react";
import { Form } from "./partials/Form";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { handleGetLectureinLesson } from "@/store/slice/lessonSlice";

export const CreateLesson = () => {
  const lectures = useAppSelector((store) => store.lesson.lectures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetLectureinLesson());
  }, []);
  return (
    <Layout title="Add Lesson">
      <HeadLine header="Add Lesson" />
      <Form lectures={lectures} />
    </Layout>
  );
};
