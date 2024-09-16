import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { Layout } from "../component/layout/Layout";
import { LogIn } from "../component/Login";

export const Router = () => {
  const show = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={LogIn} />
      </Routes>
      {show && (
        <Layout>
          <Routes>
            <Route path="/" Component={App} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
};
