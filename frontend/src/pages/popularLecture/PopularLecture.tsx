import { useEffect } from "react";
import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { SearchButton } from "@/component/SearchButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePage } from "@/utils/getPage";
import { ListTable } from "./partials/ListTable";
import { getPopularLecture } from "@/store/slice/popular_lectureSlice";

export const PopularLecture = () => {
  const dispatch = useAppDispatch();
  const lectures = useAppSelector((store) => store.popularLecture.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(getPopularLecture({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Poppular Lectures">
      <HeadLine header="Popular Lectures" />
      <div>
        <SearchButton path="popular-lectures" />

        <ListTable data={lectures} />
      </div>
    </Layout>
  );
};
