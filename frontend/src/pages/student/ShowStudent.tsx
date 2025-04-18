import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Image } from "@/component/Image";
import { Student, studentData } from "@/types/student";
import { setStudent, showStudent } from "@/store/slice/studentSlice";
import { DetailButton } from "@/component/DetailButton";
import { PurchaseTable } from "./partials/PurchaseTable";
import { Purchase } from "@/types/purchase";

export const ShowStudent = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const student = useAppSelector((store) => store.student.data) as Student;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showStudent(id));
    return () => {
      dispatch(setStudent(studentData));
    };
  }, [id]);

  return (
    <Layout title="Student Details">
      <HeadLine header="Student Details" />
      <DetailButton path="students" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Student Details</h3>
        <table className="w-full text-left capitalize">
          <tbody>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Name
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {student?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Email
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {student?.email || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Phone
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {student?.phone || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                <Image src={student?.assetUrl || ""} />
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
      <div className="mt-5">
        <PurchaseTable data={student.purchase as Purchase[]} />
      </div>
      <div className="mt-5">
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            navigate("/students");
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};
