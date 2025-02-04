import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  createLecture,
  setLectureData,
  showLecture,
} from "@/store/slice/lectureSlice";
import { Lecture, lectureData } from "@/types/lecture";

export const EditLecture = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lecture = useAppSelector((store) => store.lecture.data) as Lecture;
  const categories = useAppSelector((store) => store.lecture.categories);

  useEffect(() => {
    dispatch(showLecture(id));
    dispatch(createLecture());
    return () => {
      dispatch(setLectureData(lectureData));
    };
  }, [id]);
  if (!lecture) return null;
  return (
    <Layout title="Edit Lecture">
      <HeadLine header="Edit Lecture" />
      <Form lecture={lecture} categories={categories} />
    </Layout>
  );
};
