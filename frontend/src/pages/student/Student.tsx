import { Link } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetStudent } from "../../store/slice/studentSlice";
import { usePage } from "../../utils/getPage";
import { SearchButton } from "../../component/SearchButton";

export const Students = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((store) => store.student.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetStudent({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Students">
      <HeadLine header="Students" />
      <div>
        <SearchButton path="students" />
        <ListTable data={students} />
      </div>
    </Layout>
  );
};
