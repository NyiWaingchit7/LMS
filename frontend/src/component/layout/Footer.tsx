import moment from "moment";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="w-full bg-white py-3 flex justify-center">
      <div>©LMS {moment().format("Y")}. All Rights Reserved. Created by</div>
      <Link
        to={"https://github.com/NyiWaingchit7"}
        className=" inline ms-2 hover:text-primary hover:underline underline-offset-2"
      >
        Nyi waing chit
      </Link>
    </div>
  );
};
