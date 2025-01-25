import { HeadLine } from "@/component/HeadLine";
import { Layout } from "@/component/layout/Layout";
import { SearchButton } from "@/component/SearchButton";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetPaymentAccount } from "@/store/slice/payment_accountSlice";
import { usePage } from "@/utils/getPage";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";

export const PaymentAccount = () => {
  const dispatch = useAppDispatch();
  const paymentAccounts = useAppSelector((store) => store.paymentAccount.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    dispatch(handleGetPaymentAccount({ page, searchKey }));
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
