import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  handleShowCategory,
  setCategoryData,
} from "@/store/slice/categorySlice";
import { Category, categoryData } from "@/types/category";

export const EditCategory = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const category = useAppSelector((store) => store.category.data) as Category;

  useEffect(() => {
    dispatch(handleShowCategory(id));
    return () => {
      dispatch(setCategoryData(categoryData));
    };
  }, [id]);

  return (
    <Layout title="Edit Category">
      <HeadLine header="Edit Category" />
      <Form category={category} />
    </Layout>
  );
};
