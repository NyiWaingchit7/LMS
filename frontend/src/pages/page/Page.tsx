import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";
import { getPage } from "@/store/slice/pageSlice";

export const Page = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector((store) => store.page.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(getPage({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Pages">
      <HeadLine header="Pages" />
      <div>
        <SearchButton path="pages" />

        <ListTable data={pages} />
      </div>
    </Layout>
  );
};
