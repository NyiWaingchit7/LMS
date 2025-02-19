export const Test = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="bg-yellow-200 h-screen overflow-y-hidden sideBar w-[500px] ">
        <div className="sidebarimg h-[100px] bg-green-300"></div>
        <div className="sidebarmenu   bg-slate-400 h-screen  flex flex-col overflow-y-auto duration-300 ease-linear">
          <div className="min-h-[130vh] bg-orange-500"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto relative">
        <div className="topBar h-20 bg-red-300 sticky top-0"></div>
        <div className="body bg-blue-400 h-[200vh]"></div>
      </div>
    </div>
  );
};
