import { Link } from "react-router-dom";

interface Props {
  links: any[];
}
export const Pagination = ({ links }: Props) => {
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
      {links?.length > 3 &&
        links.map((d, i) => (
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
