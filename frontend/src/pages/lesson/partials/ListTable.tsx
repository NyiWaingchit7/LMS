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
import { useAppDispatch } from "../../../store/hooks";

import { Image } from "../../../component/Image";
import { Lesson } from "../../../types/lesson";
import {
  handleDeleteLesson,
  handleGetLesson,
} from "../../../store/slice/lessonSlice";

interface Props {
  data: Lesson[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(
      handleDeleteLesson({
        id,
        onSuccess: () => {
          dispatch(handleGetLesson());
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
            <TableCell>Title</TableCell>
            <TableCell>Lecture</TableCell>
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
                  {row.assetImage && <Image src={row.assetImage} />}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.lecture.title}</TableCell>

                <TableCell>
                  <TableAction
                    id={row.id as number}
                    path="lessons"
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
