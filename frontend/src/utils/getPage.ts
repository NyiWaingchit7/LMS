import { useSearchParams } from "react-router-dom";

export const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const query = searchParams.get("searchKey") || "";
  return { page, query };
};
