import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const usePage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchKey = searchParams.get("searchKey") || "";
  return useMemo(() => {
    return {
      page,
      searchKey,
    };
  }, [page, searchKey]);
};
