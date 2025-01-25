import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetCategory } from "@/store/slice/categorySlice";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";

export const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.category.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    console.log(page, searchKey);

    dispatch(handleGetCategory({ page, searchKey }));
  }, [page, searchKey]);

  return (
    <Layout title="Categories">
      <HeadLine header="Categories" />
      <div>
        <SearchButton path="categories" />
        <ListTable data={categories} />
      </div>
    </Layout>
  );
};
