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

interface Props {
  data: Category[];
}
export const ListTable = ({ data }: Props) => {
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
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <img src="./logo.png" className="w-20" alt="" />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <TableAction
                  id={row.id as number}
                  path="category"
                  handleDelete={() => console.log(row.id)}
                />
              </TableCell>{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
