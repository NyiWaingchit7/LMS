import { useEffect, useState } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";

import { Student } from "../../types/student";
import { Lecture } from "../../types/lecture";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";

export const CreatePurchase = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lectures, setLectures] = useState<Lecture[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUrl}/create-purchase`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      setStudents(data.student);
      setLectures(data.lecture);
    };

    fetchData();
    return () => {
      setStudents([]);
      setLectures([]);
    };
  }, []);
  return (
    <Layout title="Add Purchase">
      <HeadLine header="Add Purchase" />
      <Form lectures={lectures} students={students} />
    </Layout>
  );
};
