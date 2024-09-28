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
import { Lesson } from "../pages/lesson/Lesson";
import { ShowLesson } from "../pages/lesson/ShowLesson";
import { CreateLesson } from "../pages/lesson/CreateLesson";
import { EditLesson } from "../pages/lesson/EditLesson";
import { Student } from "../pages/student/Student";
import { ShowStudent } from "../pages/student/ShowStudent";
import { CreateStudent } from "../pages/student/CreateStudent";
import { EditStudent } from "../pages/student/EditStudent";
import { PaymentBank } from "../pages/paymentBank/PaymentBank";
import { ShowPaymentBank } from "../pages/paymentBank/ShowPaymentBank";
import { CreatePaymentBank } from "../pages/paymentBank/CreatePaymentBank";
import { EditPaymentBank } from "../pages/paymentBank/EditPaymentBank";

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
          <Route path="/lessons" Component={Lesson} />
          <Route path="/lessons/:id" Component={ShowLesson} />
          <Route path="/lessons/create" Component={CreateLesson} />
          <Route path="/lessons/:id/edit" Component={EditLesson} />
          <Route path="/students" Component={Student} />
          <Route path="/students/:id" Component={ShowStudent} />
          <Route path="/students/create" Component={CreateStudent} />
          <Route path="/students/:id/edit" Component={EditStudent} />
          <Route path="/payment-banks" Component={PaymentBank} />
          <Route path="/payment-banks/:id" Component={ShowPaymentBank} />
          <Route path="/payment-banks/create" Component={CreatePaymentBank} />
          <Route path="/payment-banks/:id/edit" Component={EditPaymentBank} />
        </Route>
        <Route path="/login" Component={LogIn} />
      </Routes>
    </BrowserRouter>
  );
};
