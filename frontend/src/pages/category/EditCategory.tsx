import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setCategoryData, showCategory } from "@/store/slice/categorySlice";
import { categoryData } from "@/types/category";

export const EditCategory = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((store) => store.category);

  useEffect(() => {
    dispatch(showCategory(id));
    return () => {
      dispatch(setCategoryData(categoryData));
    };
  }, [id]);

  return (
    <Layout title="Edit Category">
      <HeadLine header="Edit Category" />
      <Form category={data} />
    </Layout>
  );
};
