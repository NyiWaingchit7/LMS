import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Form } from "./partials/Form";
import { Lecture } from "../../types/lecture";
import { handleGetLecture } from "../../store/slice/lectureSlice";

export const CreateLesson = () => {
  const lectures = useAppSelector((store) => store.lecture.items) as Lecture[];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetLecture());
  }, []);
  return (
    <Layout title="Add Lesson">
      <HeadLine header="Add Lesson" />
      <Form lectures={lectures} />
    </Layout>
  );
};
