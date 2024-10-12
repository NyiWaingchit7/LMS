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
import { Student } from "../../../types/student";
import toast from "react-hot-toast";
import {
  handleDeletStudent,
  handleGetStudent,
  setStudentLink,
} from "../../../store/slice/studentSlice";
import { useEffect } from "react";
import { Pagination } from "../../../component/Pagination";
import { usePage } from "../../../utils/getPage";

interface Props {
  data: Student[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { page } = usePage();

  const links = useAppSelector((store) => store.student.links);
  const handleDelete = (id: number) => {
    dispatch(
      handleDeletStudent({
        id,
        onSuccess: () => {
          toast.success("Student is deleted successfully");
          dispatch(handleGetStudent(page));
        },
      })
    );
  };
  useEffect(() => {
    return () => {
      setStudentLink([]);
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
              <TableCell>Email</TableCell>
              <TableCell>phone</TableCell>
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
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      path="students"
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
