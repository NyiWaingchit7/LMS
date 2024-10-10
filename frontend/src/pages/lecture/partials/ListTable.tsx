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
import { Lecture } from "../../../types/lecture";
import {
  handleDeleteLecture,
  handleGetLecture,
} from "../../../store/slice/lectureSlice";
import toast from "react-hot-toast";

interface Props {
  data: Lecture[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(
      handleDeleteLecture({
        id,
        onSuccess: () => {
          toast.success("Lecture is deleted successfully.");

          dispatch(handleGetLecture());
        },
      })
    );
  };
  return (
    <TableContainer component={Paper} className="mt-5 capitalize">
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {/* <TableCell>Image</TableCell> */}
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Is Premium</TableCell>
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
                {/* <TableCell>
                  <Image src={row.assetUrl || "./test.jpg"} />
                </TableCell> */}
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  {row.discount_price ? (
                    <div>
                      <p className="block">{row.discount_price}MMK</p>
                      <p className=" line-through text-xs pl-1">
                        {row.price}MMk
                      </p>
                    </div>
                  ) : (
                    <p>{row.price}MMk</p>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={String(row.isPremium)}
                    color={row.isPremium ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <TableAction
                    id={row.id as number}
                    path="lectures"
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
