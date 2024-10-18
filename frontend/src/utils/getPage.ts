import { useSearchParams } from "react-router-dom";

export const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const searchKey = searchParams.get("searchKey") || "";
  return { page, searchKey };
};
