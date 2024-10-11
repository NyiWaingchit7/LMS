import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableAction } from "../../../component/TableAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { Image } from "../../../component/Image";
import { PaymentAccount } from "../../../types/payment_account";
import {
  handleDeletePaymentAccount,
  handleGetPaymentAccount,
  setPaymentAccountLinks,
} from "../../../store/slice/payment_accountSlice";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../../component/Pagination";
import { useEffect } from "react";

interface Props {
  data: PaymentAccount[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  const page = (searchParam.get("page") as string) || 1;
  const links = useAppSelector((store) => store.paymentAccount.links);
  const handleDelete = (id: number) => {
    dispatch(
      handleDeletePaymentAccount({
        id,
        onSuccess: () => {
          toast.success("Payment account is deleted successfully.");
          dispatch(handleGetPaymentAccount(page));
        },
      })
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setPaymentAccountLinks([]));
    };
  }, []);
  return (
    <div>
      <TableContainer component={Paper} className="mt-5 capitalize">
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Payment Bank</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name || "-"}</TableCell>
                  <TableCell>{row.phone_number || "-"}</TableCell>
                  <TableCell>{row.payment_bank?.name || "-"}</TableCell>

                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      path="payment-accounts"
                      handleDelete={() => {
                        handleDelete(row.id as number);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination links={links} />
    </div>
  );
};
