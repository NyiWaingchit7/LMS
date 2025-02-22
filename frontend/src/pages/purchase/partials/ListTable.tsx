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
import { TableAction } from "@/component/TableAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Image } from "@/component/Image";

import { Purchase } from "@/types/purchase";
import { getChipColor } from "@/utils/statusColor";
import toast from "react-hot-toast";
import {
  deletPurchase,
  getPurchase,
  setPurchaseLink,
} from "@/store/slice/purchaseSlice";

import { useEffect } from "react";
import { Pagination } from "@/component/Pagination";
import { usePage } from "@/utils/getPage";
import { useNavigate } from "react-router-dom";

interface Props {
  data: Purchase[];
  homeTable?: boolean;
}
export const ListTable = ({ data, homeTable = true }: Props) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { page } = usePage();

  const links = useAppSelector((store) => store.purchase.links);
  const handleDelete = (id: number) => {
    dispatch(
      deletPurchase({
        id,
        onSuccess: () => {
          toast.success("Purchase is deleted successfully.");
          dispatch(getPurchase({ page }));
        },
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setPurchaseLink([]));
    };
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className="mt-5 capitalize">
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Screenshot</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Lecture</TableCell>
              <TableCell>Total Price</TableCell>
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
                      router(`/students/${row.studentId}`);
                    }}
                  >
                    {row.student?.name || "-"}
                  </TableCell>
                  <TableCell>{row.lecture?.title || "-"}</TableCell>
                  <TableCell>
                    {row.lecture?.discount_price || row.lecture?.price} MMK
                  </TableCell>
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
                      deleted={homeTable}
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
                  colSpan={6}
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
