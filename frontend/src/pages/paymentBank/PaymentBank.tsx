import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";
import { getPaymentBank } from "@/store/slice/payment_bankSlice";

export const PaymentBank = () => {
  const dispatch = useAppDispatch();
  const paymentBanks = useAppSelector((store) => store.paymentBank.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(getPaymentBank({ page, searchKey }));
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
