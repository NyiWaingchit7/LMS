import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { handleGetLecture } from "../../store/slice/lectureSlice";
import { Lesson, lessonData } from "../../types/lesson";
import { handleShowLesson, setLessonData } from "../../store/slice/lessonSlice";
import { Lecture } from "../../types/lecture";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";

export const EditLesson = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lesson = useAppSelector((store) => store.lesson.data) as Lesson;
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    dispatch(handleShowLesson(id));

    const fetchData = async () => {
      const response = await fetch(`${config.apiUrl}/get-lectures`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      setLectures(data.data);
    };
    fetchData();

    return () => {
      setLectures([]);
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
