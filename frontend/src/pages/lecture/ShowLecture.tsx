import { Button, Chip, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Image } from "../../component/Image";
import { Lecture } from "../../types/lecture";
import { handleShowLecture } from "../../store/slice/lectureSlice";

export const ShowLecture = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lecture = useAppSelector((store) => store.lecture.data) as Lecture;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowLecture(id));
  }, [id]);
  if (!lecture) return null;
  return (
    <Layout title="Lecture Detail">
      <HeadLine header="Lecture Detail" />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Lecture Detail</h3>
        <table className="w-full text-left capitalize">
          <tbody>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Title
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {lecture?.title || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Description
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {lecture?.description || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Price
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {lecture.discount_price ? (
                  <div>
                    <p className="block">{lecture.discount_price}MMK</p>
                    <p className=" line-through text-xs pl-1">
                      {lecture.price}MMk
                    </p>
                  </div>
                ) : (
                  <p>{lecture.price}MMk</p>
                )}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Is Premium
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                <Chip
                  label={String(lecture.isPremium)}
                  color={lecture.isPremium ? "success" : "error"}
                />
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Categories
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                <div className="flex items-center gap-2">
                  {lecture.categories.map((d) => (
                    <Chip label={d.name} color="warning" />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              navigate("/lectures");
            }}
          >
            Back
          </Button>
        </div>
      </Paper>
    </Layout>
  );
};
