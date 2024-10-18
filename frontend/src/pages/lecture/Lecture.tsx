import { Link } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { handleGetLecture } from "../../store/slice/lectureSlice";
import { usePage } from "../../utils/getPage";
import { SearchButton } from "../../component/SearchButton";

export const Lecture = () => {
  const dispatch = useAppDispatch();
  const lectures = useAppSelector((store) => store.lecture.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetLecture({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Lectures">
      <HeadLine header="Lectures" />
      <div>
        <SearchButton path="lectures" />

        <ListTable data={lectures} />
      </div>
    </Layout>
  );
};
