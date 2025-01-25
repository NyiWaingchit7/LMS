import { Image } from "@/component/Image";
import { Pagination } from "@/component/Pagination";
import { TableAction } from "@/component/TableAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  handleDeletPaymentBank,
  handleGetPaymentBank,
  setPaymentBankLink,
} from "@/store/slice/payment_bankSlice";
import { PaymentBank } from "@/types/payment_bank";
import { usePage } from "@/utils/getPage";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

          dispatch(handleGetPaymentBank({ page }));
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
