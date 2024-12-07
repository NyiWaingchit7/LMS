import { useEffect } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { handlGetCreatePurchase } from "../../store/slice/purchaseSlice";

export const CreatePurchase = () => {
  const students = useAppSelector((store) => store.purchase.students);
  const lectures = useAppSelector((store) => store.purchase.lectures);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(handlGetCreatePurchase());
  }, []);
  return (
    <Layout title="Add Purchase">
      <HeadLine header="Add Purchase" />
      <Form lectures={lectures} students={students} />
    </Layout>
  );
};
