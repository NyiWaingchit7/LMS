import { Link } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePage } from "../../utils/getPage";
import { handleGetPage } from "../../store/slice/pageSlice";

export const Page = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector((store) => store.page.items);
  const { page } = usePage();

  useEffect(() => {
    dispatch(handleGetPage(page));
  }, [page]);
  return (
    <Layout title="Pages">
      <HeadLine header="Pages" />
      <div>
        <div className="flex justify-end">
          <Link to={"/pages/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={pages} />
      </div>
    </Layout>
  );
};
