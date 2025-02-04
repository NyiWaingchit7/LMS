import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { usePage } from "@/utils/getPage";
import { SearchButton } from "@/component/SearchButton";
import { getPaymentAccount } from "@/store/slice/payment_accountSlice";

export const PaymentAccount = () => {
  const dispatch = useAppDispatch();
  const paymentAccounts = useAppSelector((store) => store.paymentAccount.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(getPaymentAccount({ page, searchKey }));
  }, [page, searchKey]);
  return (
    <Layout title="Payment Accounts">
      <HeadLine header="Payment Accounts" />
      <div>
        <SearchButton path="payment-accounts" />

        <ListTable data={paymentAccounts} />
      </div>
    </Layout>
  );
};
