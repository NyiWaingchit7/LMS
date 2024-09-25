import { Link } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { handleGetLesson } from "../../store/slice/lessonSlice";

export const Lesson = () => {
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((store) => store.lesson.items);
  useEffect(() => {
    dispatch(handleGetLesson());
  }, []);
  return (
    <Layout title="Lesson">
      <HeadLine header="Lesson" />
      <div>
        <div className="flex justify-end">
          <Link to={"/lessons/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={lessons} />
      </div>
    </Layout>
  );
};
