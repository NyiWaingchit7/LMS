import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Pagination } from "@/component/Pagination";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TableAction } from "@/component/TableAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deletePopularLecture,
  getPopularLecture,
  setPopularLectureLink,
} from "@/store/slice/popular_lectureSlice";
import { PopularLecture } from "@/types/popular_lecture";
import { usePage } from "@/utils/getPage";

interface Props {
  data: PopularLecture[];
}
export const ListTable = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const { page } = usePage();

  const links = useAppSelector((store) => store.lecture.links);

  const handleDelete = (id: number) => {
    dispatch(
      deletePopularLecture({
        id,
        onSuccess: () => {
          toast.success("Lecture is deleted successfully.");

          dispatch(getPopularLecture({ page }));
        },
      })
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setPopularLectureLink([]));
    };
  }, []);
  return (
    <div>
      <TableContainer component={Paper} className="mt-5 capitalize">
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Image</TableCell> */}
              <TableCell>Title</TableCell>
              <TableCell>Lecture</TableCell>
              <TableCell>Actions</TableCell>
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
                  <TableCell>{row.lecture.title}</TableCell>

                  <TableCell>
                    <TableAction
                      id={row.id as number}
                      show={false}
                      path="popular-lectures"
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
