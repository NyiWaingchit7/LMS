import { useEffect } from "react";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Form } from "./partials/Form";
import { getlCreateLectures } from "@/store/slice/popular_lectureSlice";

export const CreatePopularLecture = () => {
  const lectures = useAppSelector((store) => store.popularLecture.lectures);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getlCreateLectures());
  }, []);
  return (
    <Layout title="Add Popular Lecture">
      <HeadLine header="Add Popular Lecture" />
      <Form lectures={lectures} />
    </Layout>
  );
};
