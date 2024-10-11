import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetCategory } from "../../store/slice/categorySlice";

export const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.category.items);
  const [searchParam, setSearchParam] = useSearchParams();
  const page = (searchParam.get("page") as string) || 1;

  useEffect(() => {
    dispatch(handleGetCategory(page));
  }, [page]);
  return (
    <Layout title="Categories">
      <HeadLine header="Categories" />
      <div>
        <div className="flex justify-end">
          <Link to={"/categories/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={categories} />
      </div>
    </Layout>
  );
};
