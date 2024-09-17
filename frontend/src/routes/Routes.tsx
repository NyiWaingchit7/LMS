import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { Layout } from "../component/layout/Layout";
import { LogIn } from "../component/Login";
import { PrivateRoutes } from "./PrivateRoutes";

export const Router = () => {
  const show = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" Component={App} />
        </Route>
        <Route path="/login" Component={LogIn} />
      </Routes>
    </BrowserRouter>
  );
};
