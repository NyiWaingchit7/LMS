import { Link } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { ListTable } from "./partials/ListTable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { handleGetPaymentAccount } from "../../store/slice/payment_accountSlice";
import { usePage } from "../../utils/getPage";

export const PaymentAccount = () => {
  const dispatch = useAppDispatch();
  const paymentAccounts = useAppSelector((store) => store.paymentAccount.items);
  const { page } = usePage();

  useEffect(() => {
    dispatch(handleGetPaymentAccount(page));
  }, [page]);
  return (
    <Layout title="Payment Accounts">
      <HeadLine header="Payment Accounts" />
      <div>
        <div className="flex justify-end">
          <Link to={"/payment-accounts/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={paymentAccounts} />
      </div>
    </Layout>
  );
};
