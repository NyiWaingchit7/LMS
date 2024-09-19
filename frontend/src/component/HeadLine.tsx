import { Link } from "react-router-dom";

interface Props {
  header: string;
}
export const HeadLine = ({ header }: Props) => {
  return (
    <div className="flex justify-between items-center my-5">
      <h3 className="text-3xl font-semibold">{header}</h3>
      <div className="flex items-center gap-2 font-semibold">
        <Link to={"/"} className="">
          Home /
        </Link>
        <div>{header}</div>
      </div>
    </div>
  );
};
