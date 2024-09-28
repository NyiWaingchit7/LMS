import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { Student, studentData } from "../../types/student";
import {
  handleShowStudent,
  setStudentData,
} from "../../store/slice/studentSlice";

export const EditStudent = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const student = useAppSelector((store) => store.student.data) as Student;

  useEffect(() => {
    dispatch(handleShowStudent(id));
    return () => {
      dispatch(setStudentData(studentData));
    };
  }, [id]);

  return (
    <Layout title="Edit Student">
      <HeadLine header="Edit Student" />
      <Form student={student} />
    </Layout>
  );
};
