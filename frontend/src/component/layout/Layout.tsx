import { ReactNode, useEffect } from "react";
import { TopBar } from "./TopBar";
import { SideBar } from "./Sidebar";
import { Helmet } from "react-helmet";
import { Footer } from "./Footer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSetting } from "../../store/slice/settingSlice";

interface Prop {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: Prop) => {
  const appName = useAppSelector((store) => store.setting.data?.app_name);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!appName) {
      dispatch(getSetting());
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>{`${title || ""} - ${appName || "LMS"}`}</title>
      </Helmet>

      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <TopBar />
          <main className="min-h-full">
            <div className="min-h-full mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
              <slot className="min-h-full">{children}</slot>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};
