import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePage } from "../../utils/getPage";
import { handleGetPage } from "../../store/slice/pageSlice";
import { SearchButton } from "../../component/SearchButton";

export const Page = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector((store) => store.page.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetPage({ page, searchKey }));
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
