import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Category } from "../../../types/category";
import { TableAction } from "../../../component/TableAction";
import { useAppDispatch } from "../../../store/hooks";
import {
  handleDeletCategory,
  handleGetCategory,
} from "../../../store/slice/categorySlice";
import { Image } from "../../../component/Image";

interface Props {
  data: Category[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(
      handleDeletCategory({
        id,
        onSuccess: () => {
          dispatch(handleGetCategory());
        },
      })
    );
  };
  return (
    <TableContainer component={Paper} className="mt-5">
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
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
                  <Image src={row.assetUrl || "./test.jpg"} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <TableAction
                    id={row.id as number}
                    path="categories"
                    handleDelete={() => {
                      handleDelete(row.id as number);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell sx={{ textAlign: "center", width: "100%" }}>
              No data found
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
