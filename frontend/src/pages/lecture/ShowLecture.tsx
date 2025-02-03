import { Button, Chip, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Lecture, lectureData } from "@/types/lecture";
import { setLectureData, showLecture } from "@/store/slice/lectureSlice";
import { DetailButton } from "@/component/DetailButton";

export const ShowLecture = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lecture = useAppSelector((store) => store.lecture.data) as Lecture;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showLecture(id));
    return () => {
      dispatch(setLectureData(lectureData));
    };
  }, [dispatch, id]);
  return (
    <Layout title="Lecture Details">
      <HeadLine header="Lecture Details" />
      <DetailButton path="lectures" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Lecture Details</h3>
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
                  size="small"
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
                    <Chip
                      label={d.name}
                      key={d.id}
                      color="warning"
                      size="small"
                    />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
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
    </Layout>
  );
};
