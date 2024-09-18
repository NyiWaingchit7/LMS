import { Layout } from "./component/layout/Layout";

const App = () => {
  return (
    <Layout>
      <div>
        <div className="relative">
          <div className="bg-primary text-start text-5xl text-red-300">
            hello
          </div>
        </div>
        <div className="min-h-screen">hi</div>
      </div>
    </Layout>
  );
};
export default App;
