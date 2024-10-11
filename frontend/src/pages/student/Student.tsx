import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetStudent } from "../../store/slice/studentSlice";

export const Students = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((store) => store.student.items);
  const [searchParams, setSerachParams] = useSearchParams();
  const page = (searchParams.get("page") as string) || 1;
  useEffect(() => {
    dispatch(handleGetStudent(page));
  }, [page]);
  return (
    <Layout title="Students">
      <HeadLine header="Students" />
      <div>
        <div className="flex justify-end">
          <Link to={"/students/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={students} />
      </div>
    </Layout>
  );
};
