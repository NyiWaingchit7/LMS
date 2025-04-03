import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { Lesson, lessonData } from "@/types/lesson";
import { setLessonData, showLesson } from "@/store/slice/lessonSlice";

export const EditLesson = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lesson = useAppSelector((store) => store.lesson.data) as Lesson;

  useEffect(() => {
    dispatch(showLesson(id));
    // dispatch(createLesson());

    return () => {
      dispatch(setLessonData(lessonData));
    };
  }, [id]);
  return (
    <Layout title="Edit Lesson">
      <HeadLine header="Edit Lesson" />
      <Form lesson={lesson} />
    </Layout>
  );
};
