import { Link } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetCategory } from "../../store/slice/categorySlice";
import { usePage } from "../../utils/getPage";

export const Category = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.category.items);
  const { page } = usePage();

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
