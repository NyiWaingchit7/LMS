import { useEffect } from "react";
import { Layout } from "./component/layout/Layout";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getHomeChart } from "./store/slice/homeSlice";
import { HomeData } from "./types/home";

const App = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.home.homeData) as HomeData;

  useEffect(() => {
    dispatch(getHomeChart());
  }, []);
  return (
    <Layout title="Home">
      <div>
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white py-5 px-5 rounded-md shadow-md">
            <p className="text-lg font-bold">Total Lectures</p>
            <h4 className="text-xl font-bold mt-5"> {data?.totalLecture} </h4>
          </div>
          <div className="bg-white py-5 px-5 rounded-md shadow-md">
            <p className="text-lg font-bold">Total Lessons</p>
            <h4 className="text-xl font-bold mt-5"> {data?.totalLesson} </h4>
          </div>
          <div className="bg-white py-5 px-5 rounded-md shadow-md">
            <p className="text-lg font-bold">Total Students</p>
            <h4 className="text-xl font-bold mt-5"> {data?.totalStudent} </h4>
          </div>
          <div className="bg-white py-5 px-5 rounded-md shadow-md">
            <p className="text-lg font-bold">Total Purchases</p>
            <h4 className="text-xl font-bold mt-5"> {data?.totalPurchase} </h4>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="bg-white rounded-md shadow-md px-3 py-3">
            <h3 className="text-lg font-bold">Top Customers</h3>
            <table className="w-full text-left mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-right">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data?.topCustomer?.map((customer, index) => (
                  <tr key={index}>
                    <td className="py-3 "> {customer?.student?.name} </td>
                    <td className="py-3 text-right">
                      {" "}
                      {customer?.totalPurchasePrice} MMK{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-md shadow-md px-3 py-3">
            <h3 className="text-lg font-bold">Top Lecture</h3>
            <table className="w-full text-left mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-right">Total Purchase</th>
                </tr>
              </thead>
              <tbody>
                {data?.topLecture?.map((data, index) => (
                  <tr key={index}>
                    <td className="py-3 "> {data?.lecture?.title} </td>
                    <td className="py-3 text-right">{data?.purchaseCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};
export default App;
