import { Link } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleGetPaymentBank } from "../../store/slice/payment_bankSlice";
import { usePage } from "../../utils/getPage";

export const PaymentBank = () => {
  const dispatch = useAppDispatch();
  const paymentBanks = useAppSelector((store) => store.paymentBank.items);
  const { page } = usePage();

  useEffect(() => {
    dispatch(handleGetPaymentBank(page));
  }, [page]);
  return (
    <Layout title="Payment Banks">
      <HeadLine header="Payment Banks" />
      <div>
        <div className="flex justify-end">
          <Link to={"/payment-banks/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        <ListTable data={paymentBanks} />
      </div>
    </Layout>
  );
};
