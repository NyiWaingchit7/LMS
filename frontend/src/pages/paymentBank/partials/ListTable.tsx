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
import { PaymentBank } from "../../../types/payment_bank";
import {
  handleDeletPaymentBank,
  handleGetPaymentBank,
  setPaymentBankLink,
} from "../../../store/slice/payment_bankSlice";
import toast from "react-hot-toast";
import { Pagination } from "../../../component/Pagination";
import { useEffect } from "react";
import { usePage } from "../../../utils/getPage";

interface Props {
  data: PaymentBank[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const links = useAppSelector((store) => store.paymentBank.links);
  const { page } = usePage();

  const handleDelete = (id: number) => {
    dispatch(
      handleDeletPaymentBank({
        id,
        onSuccess: () => {
          toast.success("Payment Bank is deleted successfully.");

          dispatch(handleGetPaymentBank(page));
        },
      })
    );
  };
  useEffect(() => {
    return () => {
      setPaymentBankLink([]);
    };
  }, []);
  return (
    <div>
      <TableContainer component={Paper} className="mt-5 capitalize">
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
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
                  <TableCell>
                    {row.assetUrl && <Image src={row.assetUrl} />}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      path="payment-banks"
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
