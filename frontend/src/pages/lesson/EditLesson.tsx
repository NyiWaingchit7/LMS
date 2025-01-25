import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Lesson, lessonData } from "@/types/lesson";
import {
  handleGetLectureinLesson,
  handleShowLesson,
  setLessonData,
} from "@/store/slice/lessonSlice";

export const EditLesson = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lesson = useAppSelector((store) => store.lesson.data) as Lesson;
  const lectures = useAppSelector((store) => store.lesson.lectures);

  useEffect(() => {
    dispatch(handleShowLesson(id));
    dispatch(handleGetLectureinLesson());

    return () => {
      dispatch(setLessonData(lessonData));
    };
  }, [id]);
  if (!lesson) return null;
  return (
    <Layout title="Edit Lesson">
      <HeadLine header="Edit Lesson" />
      <Form lesson={lesson} lectures={lectures} />
    </Layout>
  );
};
