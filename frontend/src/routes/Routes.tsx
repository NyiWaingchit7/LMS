import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { LogIn } from "../component/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { Category } from "../pages/category/Category";
import { CreateCategory } from "../pages/category/CreateCategory";
import { EditCategory } from "../pages/category/EditCategory";
import { ShowCategory } from "../pages/category/ShowCategory";
import { Lecture } from "../pages/lecture/Lecture";
import { CreateLecture } from "../pages/lecture/CreateLecture";
import { EditLecture } from "../pages/lecture/EditLecture";
import { ShowLecture } from "../pages/lecture/ShowLecture";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" Component={App} />
          <Route path="/categories" Component={Category} />
          <Route path="/categories/:id" Component={ShowCategory} />
          <Route path="/categories/create" Component={CreateCategory} />
          <Route path="/categories/:id/edit" Component={EditCategory} />
          <Route path="/lectures" Component={Lecture} />
          <Route path="/lectures/:id" Component={ShowLecture} />
          <Route path="/lectures/create" Component={CreateLecture} />
          <Route path="/lectures/:id/edit" Component={EditLecture} />
        </Route>
        <Route path="/login" Component={LogIn} />
      </Routes>
    </BrowserRouter>
  );
};
