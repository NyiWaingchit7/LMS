import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DetailButton } from "@/component/DetailButton";
import { Page, pageData } from "@/types/page";
import { setPageData, showPage } from "@/store/slice/pageSlice";

export const ShowPage = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const page = useAppSelector((store) => store.page.data) as Page;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showPage(id));
    return () => {
      dispatch(setPageData(pageData));
    };
  }, [id]);

  return (
    <Layout title="Page Details">
      <HeadLine header="Page Details" />
      <DetailButton path="pages" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Page Details</h3>
        <table className="w-full text-left capitalize">
          <tbody>
            <tr>
              <th className="px-2 py-3 " scope="col">
                title
              </th>
              <td className="px-2 py-3 " scope="col">
                -
              </td>
              <td className="px-2 py-3 " scope="col">
                {page?.title || "-"}
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
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: page?.content }}
                ></div>
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
            navigate("/pages");
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};
