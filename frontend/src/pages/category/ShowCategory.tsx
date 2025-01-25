import { Button, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { HeadLine } from "@/component/HeadLine";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  handleShowCategory,
  setCategoryData,
} from "@/store/slice/categorySlice";
import { Image } from "@/component/Image";
import { Category, categoryData } from "@/types/category";
import { DetailButton } from "@/component/DetailButton";

export const ShowCategory = () => {
  const id = Number(useParams().id);
  const dispatch = useAppDispatch();
  const category = useAppSelector((store) => store.category.data) as Category;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleShowCategory(id));
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
                {category?.name || "-"}
              </td>
            </tr>
            <tr>
              <th className="px-2 py-3 ">Image</th>
              <td className="px-2 py-3 ">-</td>
              <td className="px-2 py-3 ">
                {category?.assetUrl && (
                  <Image src={category?.assetUrl || "./../test.jpg"} />
                )}
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
