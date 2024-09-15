import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { SideBar } from "./Sidebar";
interface Prop {
  children: ReactNode;
}

export const Layout = ({ children }: Prop) => {
  return (
    <div className="relative flex">
      <SideBar />
      <div className="relative flex flex-1 flex-col ">
        <TopBar />
        <div className="min-h-screen -z-[9999] relative mx-auto overflow-y-auto p-4 md:p-6 xl:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};
