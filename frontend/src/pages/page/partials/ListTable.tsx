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

import {
  handleDeleteLecture,
  handleGetLecture,
  setLectureLink,
} from "../../../store/slice/lectureSlice";
import toast from "react-hot-toast";

import { useEffect } from "react";
import { Pagination } from "../../../component/Pagination";
import { usePage } from "../../../utils/getPage";
import { Page } from "../../../types/page";
import {
  handleDeletePage,
  handleGetPage,
} from "../../../store/slice/pageSlice";

interface Props {
  data: Page[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { page } = usePage();

  const links = useAppSelector((store) => store.page.links);

  const handleDelete = (id: number) => {
    dispatch(
      handleDeletePage({
        id,
        onSuccess: () => {
          toast.success("Page is deleted successfully.");

          dispatch(handleGetPage(page));
        },
      })
    );
  };
  useEffect(() => {
    dispatch(setLectureLink([]));
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
              {/* <TableCell>Image</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
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
                  <TableCell
                    dangerouslySetInnerHTML={{ __html: row.content }}
                  ></TableCell>

                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      path="pages"
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
