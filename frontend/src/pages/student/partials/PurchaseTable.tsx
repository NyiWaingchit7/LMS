import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Table,
} from "@mui/material";
import { TableAction } from "../../../component/TableAction";
import { getChipColor } from "../../../utils/statusColor";
import { Purchase } from "../../../types/purchase";
import { Image } from "../../../component/Image";
import { useNavigate } from "react-router-dom";
interface Props {
  data: Purchase[];
}
export const PurchaseTable = ({ data }: Props) => {
  const router = useNavigate();
  console.log(data);

  return (
    <div>
      <TableContainer component={Paper} className="capitalize">
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
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
            {data?.length > 0 ? (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {row.payment_assetUrl && (
                      <Image src={row.payment_assetUrl} />
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      ":hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      router(`/students/${row.id}`);
                    }}
                  >
                    {row.student?.name || "-"}
                  </TableCell>
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
                      edit={false}
                      deleted={false}
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
    </div>
  );
};
