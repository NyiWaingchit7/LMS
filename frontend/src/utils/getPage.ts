import { useSearchParams } from "react-router-dom";

export const usePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = (searchParams.get("page") as string) || 1;
  return { page };
};
