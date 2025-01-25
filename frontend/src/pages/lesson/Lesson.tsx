import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { handleGetLesson } from "@/store/slice/lessonSlice";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";

export const Lesson = () => {
  const dispatch = useAppDispatch();
  const lessons = useAppSelector((store) => store.lesson.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetLesson({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Lessons">
      <HeadLine header="Lessons" />
      <div>
        <SearchButton path="lessons" />

        <ListTable data={lessons} />
      </div>
    </Layout>
  );
};
