import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetCategory } from "../../store/slice/categorySlice";
import { usePage } from "../../utils/getPage";
import { SearchButton } from "../../component/SearchButton";

export const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.category.items);
  const { page } = usePage();
  const [searchKey, setSearchKey] = useState<string>("");

  useEffect(() => {
    dispatch(handleGetCategory({ page }));
  }, [page]);

  const handlegetFunction = () => {
    dispatch(handleGetCategory({ page, searchKey }));
  };
  return (
    <Layout title="Categories">
      <HeadLine header="Categories" />
      <div>
        <SearchButton
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          path="categories"
          getFunction={handlegetFunction}
        />
        <ListTable data={categories} />
      </div>
    </Layout>
  );
};
