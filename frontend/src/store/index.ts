import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import categoryReducer from "./slice/categorySlice";
import lectureReducer from "./slice/lectureSlice";
import lessonReducer from "./slice/lessonSlice";
import studentReducer from "./slice/studentSlice";
import paymentBankReducer from "./slice/payment_bankSlice";
import paymentAccountReducer from "./slice/payment_accountSlice";
import purchaseReducer from "./slice/purchaseSlice";
import pageReducer from "./slice/pageSlice";
import homeReducer from "./slice/homeSlice";
import settingReducer from "./slice/settingSlice";
import tagLineReducer from "./slice/taglinSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    lecture: lectureReducer,
    lesson: lessonReducer,
    student: studentReducer,
    paymentBank: paymentBankReducer,
    paymentAccount: paymentAccountReducer,
    purchase: purchaseReducer,
    page: pageReducer,
    home: homeReducer,
    setting: settingReducer,
    tagLine: tagLineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
