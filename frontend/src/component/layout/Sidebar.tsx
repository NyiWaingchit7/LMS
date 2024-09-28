import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
export const SideBar = () => {
  const location = useLocation();
  return (
    <aside className="z-30 flex h-screen w-60 flex-col overflow-y-hidden bg-white duration-300 ease-linear ">
      <div className="flex items-center justify-between gap-2 px-6 pt-2 pb-0">
        <a href="/">
          <img src="./../logo.png" className="w-1/2 m-auto" alt="" />
        </a>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">
          <div>
            <ul className="mb-4 flex flex-col gap-1.5">
              {sidebrItems.map((d, index) => (
                <Link to={`/${d.path}`} key={d.name}>
                  <div
                    className={`text-[15px] flex items-center gap-2 px-2 rounded-lg
            hover:bg-primary hover:text-whiten transition-all ease-in-out duration-300 py-2
            ${
              location.pathname.includes(`/${d.path}`)
                ? "bg-primary text-whiten"
                : ""
            }`}
                  >
                    {d.icon}

                    {d.name}
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export const sidebrItems = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "#",
  },
  {
    name: "Purchase",
    icon: <ShoppingBasketIcon />,
    path: "#",
  },
  {
    name: "Category",
    icon: <CategoryIcon />,
    path: "categories",
  },
  {
    name: "Lectures",
    icon: <SchoolIcon />,
    path: "lectures",
  },
  {
    name: "Lessons",
    icon: <PlayLessonIcon />,
    path: "lessons",
  },
  {
    name: "Students",
    icon: <SupervisedUserCircleIcon />,
    path: "students",
  },
  {
    name: "Payment Banks",
    icon: <AccountBalanceWalletIcon />,
    path: "payment-banks",
  },
  {
    name: "Payment Account",
    icon: <MonetizationOnIcon />,
    path: "#",
  },
];
