import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Image } from "../../component/Image";
import { PaymentBank, paymentBankData } from "../../types/payment_bank";
import {
  handleShowPaymentBank,
  setPaymentBankData,
} from "../../store/slice/payment_bankSlice";

export const ShowPaymentBank = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const paymentBank = useAppSelector(
    (store) => store.paymentBank.data
  ) as PaymentBank;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowPaymentBank(id));
    return () => {
      dispatch(setPaymentBankData(paymentBankData));
    };
  }, [id]);

  return (
    <Layout title="Payment Bank Details">
      <HeadLine header="Payment Bank Details" />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Payment Bank Details</h3>
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
                {paymentBank?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                <Image src={paymentBank?.assetUrl || "./../test.jpg"} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              navigate("/payment-banks");
            }}
          >
            Back
          </Button>
        </div>
      </Paper>
    </Layout>
  );
};
