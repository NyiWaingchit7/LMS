import { CircularProgress } from "@mui/material";
import { Layout } from "./layout/Layout";

export const Loading = () => {
  return (
    <Layout>
      <CircularProgress />
    </Layout>
  );
};
