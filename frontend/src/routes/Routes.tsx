import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { LogIn } from "../component/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { Category } from "../pages/category/Category";
import { CreateCategory } from "../pages/category/CreateCategory";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" Component={App} />
          <Route path="/category" Component={Category} />
          <Route path="/category-create" Component={CreateCategory} />
        </Route>
        <Route path="/login" Component={LogIn} />
      </Routes>
    </BrowserRouter>
  );
};
