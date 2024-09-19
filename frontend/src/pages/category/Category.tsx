import { Link } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";
import { HeadLine } from "../../component/HeadLine";

export const Category = () => {
  return (
    <Layout>
      <HeadLine header="Categories" />
      <div>
        <div className="flex justify-end">
          <Link to={"/category-create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
