import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { SearchButton } from "@/component/SearchButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetPurchase } from "@/store/slice/purchaseSlice";
import { usePage } from "@/utils/getPage";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";

export const Purchase = () => {
  const dispatch = useAppDispatch();
  const purchases = useAppSelector((store) => store.purchase.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetPurchase({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Purchases">
      <HeadLine header="Purchases" />
      <div>
        <SearchButton path="purchases" />

        <ListTable data={purchases} />
      </div>
    </Layout>
  );
};
