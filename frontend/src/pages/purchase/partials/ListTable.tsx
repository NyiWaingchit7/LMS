import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableAction } from "../../../component/TableAction";
import { useAppDispatch } from "../../../store/hooks";

import { Image } from "../../../component/Image";
import {
  handleDeletPaymentBank,
  handleGetPaymentBank,
} from "../../../store/slice/payment_bankSlice";
import { PaymentStatus, Purchase } from "../../../types/purchase";
import { getChipColor } from "../../../utils/statusColor";

interface Props {
  data: Purchase[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(
      handleDeletPaymentBank({
        id,
        onSuccess: () => {
          dispatch(handleGetPaymentBank());
        },
      })
    );
  };

  return (
    <TableContainer component={Paper} className="mt-5 capitalize">
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Payment Screenshot</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Lecture</TableCell>
            <TableCell>Payment Status</TableCell>
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
                  {row.payment_assetUrl && <Image src={row.payment_assetUrl} />}
                </TableCell>
                <TableCell>{row.student?.name || "-"}</TableCell>
                <TableCell>{row.lecture?.title || "-"}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={String(row.payment_status)}
                    color={getChipColor(row.payment_status)}
                  />
                </TableCell>
                <TableCell>
                  <TableAction
                    id={row.id as number}
                    path="purchases"
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
  );
};
