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
import { ShowStudent } from "../pages/student/ShowStudent";
import { CreateStudent } from "../pages/student/CreateStudent";
import { EditStudent } from "../pages/student/EditStudent";
import { PaymentBank } from "../pages/paymentBank/PaymentBank";
import { ShowPaymentBank } from "../pages/paymentBank/ShowPaymentBank";
import { CreatePaymentBank } from "../pages/paymentBank/CreatePaymentBank";
import { EditPaymentBank } from "../pages/paymentBank/EditPaymentBank";
import { PaymentAccount } from "../pages/paymentAccount/PaymentAccount";
import { ShowPaymentAccount } from "../pages/paymentAccount/ShowPaymentAccount";
import { CreatePaymentAccount } from "../pages/paymentAccount/CreatePaymentAccount";
import { EditPaymentAccount } from "../pages/paymentAccount/EditPaymentAccount";
import { Purchase } from "../pages/purchase/Purchase";
import { ShowPurchase } from "../pages/purchase/ShowPurchase";
import { CreatePurchase } from "../pages/purchase/CreatePurchase";
import { Students } from "../pages/student/Student";
import { Toaster } from "react-hot-toast";
import { Page } from "../pages/page/Page";
import { ShowPage } from "../pages/page/ShowPage";
import { CreatePage } from "../pages/page/CreatePage";
import { EditPage } from "../pages/page/EditPage";
import { SettingPage } from "../pages/setting/Setting";
import { TagLine } from "../pages/tagLine/TagLine";
import { ShowTagLine } from "../pages/tagLine/ShowTagLine";
import { CreateTagLine } from "../pages/tagLine/CreateTagLine";
import { EditTagLine } from "../pages/tagLine/EditTagLine";
import { PopularLecture } from "../pages/popularLecture/PopularLecture";
import { CreatePopularLecture } from "../pages/popularLecture/CreatePopularLecture";
import { EditPopuarLecture } from "../pages/popularLecture/EditPopularLecture";

export const Router = () => {
  return (
    <BrowserRouter>
      <Toaster position={"top-right"} toastOptions={{ duration: 3000 }} />
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
          <Route path="/students" Component={Students} />
          <Route path="/students/:id" Component={ShowStudent} />
          <Route path="/students/create" Component={CreateStudent} />
          <Route path="/students/:id/edit" Component={EditStudent} />
          <Route path="/payment-banks" Component={PaymentBank} />
          <Route path="/popular-lectures" Component={PopularLecture} />
          <Route
            path="/popular-lectures/create"
            Component={CreatePopularLecture}
          />
          <Route
            path="/popular-lectures/:id/edit"
            Component={EditPopuarLecture}
          />
          <Route path="/payment-banks/:id" Component={ShowPaymentBank} />
          <Route path="/payment-banks/create" Component={CreatePaymentBank} />
          <Route path="/payment-banks/:id/edit" Component={EditPaymentBank} />
          <Route path="/payment-accounts" Component={PaymentAccount} />
          <Route path="/payment-accounts/:id" Component={ShowPaymentAccount} />
          <Route
            path="/payment-accounts/create"
            Component={CreatePaymentAccount}
          />
          <Route
            path="/payment-accounts/:id/edit"
            Component={EditPaymentAccount}
          />
          <Route path="/purchases" Component={Purchase} />
          <Route path="/purchases/:id" Component={ShowPurchase} />
          <Route path="/purchases/create" Component={CreatePurchase} />
          <Route path="/pages" Component={Page} />
          <Route path="/pages/:id" Component={ShowPage} />
          <Route path="/pages/create" Component={CreatePage} />
          <Route path="/pages/:id/edit" Component={EditPage} />
          <Route path="/settings" Component={SettingPage} />
          <Route path="/tag-lines" Component={TagLine} />
          <Route path="/tag-lines/:id" Component={ShowTagLine} />
          <Route path="/tag-lines/create" Component={CreateTagLine} />
          <Route path="/tag-lines/:id/edit" Component={EditTagLine} />
        </Route>
        <Route path="/login" Component={LogIn} />
      </Routes>
    </BrowserRouter>
  );
};
