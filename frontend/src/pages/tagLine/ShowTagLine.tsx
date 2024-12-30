import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { DetailButton } from "../../component/DetailButton";
import { TagLine, tagLineData } from "../../types/tagline";
import {
  handleShowTagLine,
  setTagLineData,
} from "../../store/slice/taglinSlice";

export const ShowTagLine = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const tagLine = useAppSelector((store) => store.tagLine.data) as TagLine;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowTagLine(id));
    return () => {
      dispatch(setTagLineData(tagLineData));
    };
  }, [id]);

  return (
    <Layout title="TagLine Details">
      <HeadLine header="TagLine Details" />
      <DetailButton path="tag-lines" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">TgLine Details</h3>
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
                {tagLine?.title || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 " scope="col">
                {tagLine?.description || "-"}
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
            navigate("/tag-lines");
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};
