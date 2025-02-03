import { useEffect } from "react";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Form } from "./partials/Form";
import { createLecture } from "@/store/slice/lectureSlice";

export const CreateLecture = () => {
  const categories = useAppSelector((store) => store.lecture.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createLecture());
  }, []);
  return (
    <Layout title="Add Lecture">
      <HeadLine header="Add Lecture" />
      <Form categories={categories} />
    </Layout>
  );
};
