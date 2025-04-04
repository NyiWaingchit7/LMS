import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";
import { getPurchase } from "@/store/slice/purchaseSlice";

export const Purchase = () => {
  const dispatch = useAppDispatch();
  const purchases = useAppSelector((store) => store.purchase.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(getPurchase({ page, searchKey }));
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
