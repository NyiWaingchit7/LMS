import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { SideBar } from "./Sidebar";
interface Prop {
  children: ReactNode;
}

export const Layout = ({ children }: Prop) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <TopBar />
        <main className="min-h-full">
          <div className="min-h-full mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
            <slot className="min-h-full">{children}</slot>
          </div>
        </main>
      </div>
    </div>
  );
};
