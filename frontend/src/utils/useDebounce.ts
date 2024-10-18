import { useEffect, useState } from "react";
// interface Props {
//   searchKey: string;
//   delay: number;
//   getFunction: () => void;
// }
const useDebounce = (
  searchKey: string,
  delay: number,
  getFunction: () => void
) => {
  const [debounceValue, setDebounceValue] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(searchKey);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchKey]);
  useEffect(() => {
    getFunction();
  }, [debounceValue]);
  return debounceValue as string;
};

export default useDebounce;
