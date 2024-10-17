import { Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Props {
  links: any[];
}
export const Pagination = ({ links }: Props) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const query = (searchParam.get("page") as string) || 1;
  const page = Number(query);
  const prev = page > 1 ? page - 1 : null;
  const next = page < links.length ? page + 1 : null;

  return (
    <div className="flex gap-2 mt-5">
      <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          fontWeight: "600",
          fontSize: "14px",
        }}
        size="small"
      >
        Prev
        <Link to={`?page=${prev}`} />
      </Button>
      {links.map((d, i) => (
        <Link
          to={`?page=${d.label}`}
          key={i}
          className={`${
            d.active ? "bg-black text-white" : ""
          } px-4 py-2 rounded-md transition-all ease-in duration-500`}
        >
          {d.label}
        </Link>
      ))}
      <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          fontWeight: "600",
          fontSize: "14px",
        }}
        size="small"
      >
        Next
        <Link to={`?page=${next}`} />
      </Button>
    </div>
  );
};
