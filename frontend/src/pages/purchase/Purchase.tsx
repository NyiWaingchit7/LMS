import { Link, useSearchParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetPurchase } from "../../store/slice/purchaseSlice";

export const Purchase = () => {
  const dispatch = useAppDispatch();
  const purchases = useAppSelector((store) => store.purchase.items);
  const [searchParams, setSerachParams] = useSearchParams();
  const page = (searchParams.get("page") as string) || 1;
  useEffect(() => {
    dispatch(handleGetPurchase(page));
  }, [page]);
  return (
    <Layout title="Purchases">
      <HeadLine header="Purchases" />
      <div>
        <div className="flex justify-end">
          <Link to={"/purchases/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={purchases} />
      </div>
    </Layout>
  );
};
