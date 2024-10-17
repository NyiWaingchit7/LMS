import { useEffect, useState } from "react";
import { HeadLine } from "../../component/HeadLine";
import { Layout } from "../../component/layout/Layout";
import { Form } from "./partials/Form";
import { Lecture } from "../../types/lecture";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";

export const CreateLesson = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${config.apiUrl}/get-lectures`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      setLectures(data.data);
    };
    fetchData();
    return () => {
      setLectures([]);
    };
  }, []);
  return (
    <Layout title="Add Lesson">
      <HeadLine header="Add Lesson" />
      <Form lectures={lectures} />
    </Layout>
  );
};
