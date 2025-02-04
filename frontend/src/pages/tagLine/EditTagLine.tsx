import { useParams } from "react-router-dom";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { Form } from "./partials/Form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { setTagLineData, showTagLine } from "@/store/slice/taglinSlice";
import { TagLine, tagLineData } from "@/types/tagline";

export const EditTagLine = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const tagLine = useAppSelector((store) => store.tagLine.data) as TagLine;

  useEffect(() => {
    dispatch(showTagLine(id));
    return () => {
      dispatch(setTagLineData(tagLineData));
    };
  }, [id]);

  return (
    <Layout title="Edit TagLine">
      <HeadLine header="Edit TagLine" />
      <Form tagLine={tagLine} />
    </Layout>
  );
};
