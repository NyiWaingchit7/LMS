import { useParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

import { Page, pageData } from "../../types/page";
import { handleShowPage, setPageData } from "../../store/slice/pageSlice";

export const EditPage = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const page = useAppSelector((store) => store.page.data) as Page;

  useEffect(() => {
    dispatch(handleShowPage(id));
    return () => {
      dispatch(setPageData(pageData));
    };
  }, [id]);

  return (
    <Layout title="Edit Page">
      <HeadLine header="Edit Page" />
      <Form page={page} />
    </Layout>
  );
};
