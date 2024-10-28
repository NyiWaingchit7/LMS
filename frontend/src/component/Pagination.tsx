import { Link, useSearchParams } from "react-router-dom";

interface Props {
  links: any[];
}
export const Pagination = ({ links }: Props) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const query = (searchParam.get("page") as string) || 1;
  const page = Number(query);

  return (
    <div className="flex gap-2 mt-5">
      {/* <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          fontWeight: "600",
          fontSize: "14px",
        }}
        size="small"
        disabled={!prev}
      >
        <Link to={`?page=${prev}`}>Prev</Link>
      </Button> */}
      {links.map((d, i) => (
        <Link
          to={d.url}
          key={i}
          className={`${
            d.active ? "bg-black text-white" : ""
          } px-4 py-2 rounded-md transition-all ease-in duration-500 capitalize`}
        >
          {d.label}
        </Link>
      ))}
      {/* <Button
        sx={{
          color: "black",
          textTransform: "capitalize",
          fontWeight: "600",
          fontSize: "14px",
        }}
        size="small"
        disabled={!next}
      >
        <Link to={`?page=${next}`}>Next</Link>
      </Button> */}
    </div>
  );
};
