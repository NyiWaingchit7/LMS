import { Link } from "react-router-dom";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Button } from "@mui/material";

export const Lecture = () => {
  return (
    <Layout title="Lectures">
      <HeadLine header="Lectures" />
      <div>
        <div className="flex justify-end">
          <Link to={"/lectures/create"}>
            <Button variant="contained">Create</Button>
          </Link>
        </div>
        {/* <ListTable data={categories} /> */}
      </div>
    </Layout>
  );
};
