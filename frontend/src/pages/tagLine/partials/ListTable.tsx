import {
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

import toast from "react-hot-toast";
import { Pagination } from "@/component/Pagination";
import { useEffect } from "react";
import { usePage } from "@/utils/getPage";
import { TagLine } from "@/types/tagline";
import { deletTagLine, getTagLine, setLinks } from "@/store/slice/taglinSlice";

interface Props {
  data: TagLine[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const links = useAppSelector((store) => store.tagLine.links);
  const { page, searchKey } = usePage();
  const handleDelete = (id: number) => {
    dispatch(
      deletTagLine({
        id,
        onSuccess: () => {
          toast.success("TagLine is deleted successfully");
          dispatch(getTagLine({ page, searchKey }));
        },
      })
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setLinks([]));
    };
  }, []);

  return (
    <div>
      <TableContainer component={Paper} className="mt-5 capitalize">
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
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
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      path="tag-lines"
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
