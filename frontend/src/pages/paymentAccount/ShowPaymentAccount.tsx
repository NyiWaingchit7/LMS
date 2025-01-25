import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { payment_accountData, PaymentAccount } from "@/types/payment_account";
import {
  handleShowPaymentAccount,
  setPaymentAccountData,
} from "@/store/slice/payment_accountSlice";
import { DetailButton } from "@/component/DetailButton";

export const ShowPaymentAccount = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const paymentAccount = useAppSelector(
    (store) => store.paymentAccount.data
  ) as PaymentAccount;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowPaymentAccount(id));
    return () => {
      dispatch(setPaymentAccountData(payment_accountData));
    };
  }, [id]);
  return (
    <Layout title="Payment Account Details">
      <HeadLine header="Payment Account Details" />
      <DetailButton path="payment-accounts" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Payment Account Details</h3>
        <table className="w-full text-left capitalize">
          <tbody>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Name
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {paymentAccount?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Phone Number
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {paymentAccount?.phone_number || "-"}
              </td>
            </tr>

            <tr>
              <th className="px-2 py-3 " scope="col">
                Lecture
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {paymentAccount?.payment_bank.name || "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
      <div className="mt-5">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            navigate("/payment-accounts");
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};
