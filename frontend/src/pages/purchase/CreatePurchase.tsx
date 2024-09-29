import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Form } from "./partials/Form";
import { handleGetStudent } from "../../store/slice/studentSlice";
import { handleGetLecture } from "../../store/slice/lectureSlice";

export const CreatePurchase = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((store) => store.student.items);
  const lectures = useAppSelector((store) => store.lecture.items);
  useEffect(() => {
    dispatch(handleGetStudent());
    dispatch(handleGetLecture());
  }, []);
  return (
    <Layout title="Add Purchase">
      <HeadLine header="Add Purchase" />
      <Form lectures={lectures} students={students} />
    </Layout>
  );
};
