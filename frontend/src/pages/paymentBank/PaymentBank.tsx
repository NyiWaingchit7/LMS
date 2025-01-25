import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetPaymentBank } from "@/store/slice/payment_bankSlice";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";

export const PaymentBank = () => {
  const dispatch = useAppDispatch();
  const paymentBanks = useAppSelector((store) => store.paymentBank.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetPaymentBank({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Payment Banks">
      <HeadLine header="Payment Banks" />
      <div>
        <SearchButton path="payment-banks" />

        <ListTable data={paymentBanks} />
      </div>
    </Layout>
  );
};
