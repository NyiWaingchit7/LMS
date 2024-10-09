import {
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
import toast from "react-hot-toast";

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
          toast.success("Category is deleted successfully");
          dispatch(handleGetCategory());
        },
      })
    );
  };
  return (
    <TableContainer component={Paper} className="mt-5 capitalize">
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
                  {row.assetUrl && <Image src={row.assetUrl} />}
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
