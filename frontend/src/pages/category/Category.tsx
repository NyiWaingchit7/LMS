import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";
import { getCategory } from "@/store/slice/categorySlice";

export const Category = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((store) => store.category);
  const { page, searchKey } = usePage();

  useEffect(() => {
    console.log(page, searchKey);

    dispatch(getCategory({ page, searchKey }));
  }, [page, searchKey]);

  return (
    <Layout title="Categories">
      <HeadLine header="Categories" />
      <div>
        <SearchButton path="categories" />
        <ListTable data={items} />
      </div>
    </Layout>
  );
};
