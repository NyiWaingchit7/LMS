import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

import { PopularLecture } from "@/types/popular_lecture";
import {
  getlCreateLectures,
  handleShowPoppularLecture,
  setPopularLectureData,
} from "@/store/slice/popular_lectureSlice";

export const EditPopuarLecture = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lecture = useAppSelector(
    (store) => store.popularLecture.popularLecture
  ) as PopularLecture;
  const lectures = useAppSelector((store) => store.popularLecture.lectures);

  useEffect(() => {
    dispatch(handleShowPoppularLecture(id));
    dispatch(getlCreateLectures());
    return () => {
      dispatch(setPopularLectureData(null));
    };
  }, [id]);
  if (!lecture) return null;
  return (
    <Layout title="Edit Popuar Lecture">
      <HeadLine header="Edit Popular Lecture" />
      <Form lecture={lecture} lectures={lectures} />
    </Layout>
  );
};
