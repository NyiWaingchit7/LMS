import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
export const SideBar = () => {
  return (
    <aside className="fixed left-0 top-0 bg-white z-50 felx overflow-y-auto flex-col w-56 shadow-md">
      <img src="/logo.png" className="w-1/2 mt-10 mx-auto" alt="" />
      <div className="flex flex-col h-screen no-scrollbar overflow-y-auto gap-4 px-2 py-2">
        {sidebrItems.map((d, index) => (
          <Link to="/" key={index}>
            <div className="text-[15px] flex items-center gap-2 px-5 rounded-lg hover:bg-primary hover:text-whiten transition-all ease-in-out duration-300 py-2">
              {d.icon}

              {d.name}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export const sidebrItems = [
  {
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    name: "Purchase",
    icon: <ShoppingBasketIcon />,
  },
  {
    name: "Category",
    icon: <CategoryIcon />,
  },
  {
    name: "Lectures",
    icon: <SchoolIcon />,
  },
  {
    name: "Lessons",
    icon: <PlayLessonIcon />,
  },
  {
    name: "Students",
    icon: <SupervisedUserCircleIcon />,
  },
  {
    name: "Payment Banks",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    name: "Payment Account",
    icon: <MonetizationOnIcon />,
  },
];
