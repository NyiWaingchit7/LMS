import { useEffect } from "react";
import { Layout } from "./component/layout/Layout";
import { useAppDispatch } from "./store/hooks";
import { getHomeChart } from "./store/slice/authSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHomeChart());
  }, []);
  return (
    <Layout>
      <div>/</div>
    </Layout>
  );
};
export default App;
