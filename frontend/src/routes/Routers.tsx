import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { Layout } from "../component/layout/Layout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" Component={App} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
