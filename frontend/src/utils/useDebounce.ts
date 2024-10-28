import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePage } from "./getPage";
// interface Props {
//   searchKey: string;
//   delay: number;
//   getFunction: () => void;
// }
const useDebounce = (searchKey: string, path: string) => {
  const [debounceValue, setDebounceValue] = useState("");
  const { page } = usePage();

  const navigate = useNavigate();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchKey);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchKey]);
  useEffect(() => {
    navigate(`/${path}?page=${page}&searchKey=${debounceValue}`);
  }, [debounceValue]);
  return debounceValue as string;
};

export default useDebounce;
