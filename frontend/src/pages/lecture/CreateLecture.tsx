import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Form } from "./partials/Form";
import { handleGetCategory } from "../../store/slice/categorySlice";

export const CreateLecture = () => {
  const categories = useAppSelector((store) => store.category.items);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleGetCategory());
  }, []);
  return (
    <Layout title="Add Lecture">
      <HeadLine header="Add Lecture" />
      <Form categories={categories} />
    </Layout>
  );
};
