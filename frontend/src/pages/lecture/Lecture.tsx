import { Link, useSearchParams } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { handleGetLecture } from "../../store/slice/lectureSlice";

export const Lecture = () => {
  const dispatch = useAppDispatch();
  const lectures = useAppSelector((store) => store.lecture.items);
  const [searchParam, setSearchParams] = useSearchParams();
  const page = searchParam.get("page") || 1;

  useEffect(() => {
    dispatch(handleGetLecture(page));
  }, [page]);
  return (
    <Layout title="Lectures">
      <HeadLine header="Lectures" />
      <div>
        <div className="flex justify-end">
          <Link to={"/lectures/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={lectures} />
      </div>
    </Layout>
  );
};
