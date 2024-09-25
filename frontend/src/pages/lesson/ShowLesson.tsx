import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handleShowLesson, setLessonData } from "../../store/slice/lessonSlice";
import { Lesson, lessonData } from "../../types/lesson";
import { handleGetLecture } from "../../store/slice/lectureSlice";
import { Image } from "../../component/Image";

export const ShowLesson = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const lesson = useAppSelector((store) => store.lesson.data) as Lesson;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowLesson(id));
    dispatch(handleGetLecture());
    return () => {
      dispatch(setLessonData(lessonData));
    };
  }, [id]);
  if (!lesson) return null;
  return (
    <Layout title="Lesson Detail">
      <HeadLine header="Lesson Detail" />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Lesson Detail</h3>
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
                {lesson?.title || "-"}
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
                {lesson?.description || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Content
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {lesson?.content || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 " scope="col">
                Lecture
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {lesson?.lecture.title || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                <Image src={lesson?.assetImage || "../test.jpg"} />
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
              navigate("/lessons");
            }}
          >
            Back
          </Button>
        </div>
      </Paper>
    </Layout>
  );
};
