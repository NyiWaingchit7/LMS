import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategoryData, showCategory } from "@/store/slice/categorySlice";
import { Image } from "@/component/Image";
import { categoryData } from "@/types/category";
import { DetailButton } from "@/component/DetailButton";

export const ShowCategory = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((store) => store.category);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showCategory(id));
    return () => {
      dispatch(setCategoryData(categoryData));
    };
  }, [id]);

  return (
    <Layout title="Category Details">
      <HeadLine header="Category Details" />
      <DetailButton path="categories" id={id} />
      <Paper className="px-5 py-5">
        <h3 className="font-bold my-3">Category Details</h3>
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
                {data?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                {data?.assetUrl && <Image src={data?.assetUrl || ""} />}
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
            navigate("/categories");
          }}
        >
          Back
        </Button>
      </div>
    </Layout>
  );
};
