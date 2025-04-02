import { fetchFunction } from "@/utils/useFetchFunction";
import { Skeleton, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Lecture } from "@/types/lecture";

interface Props {
  id: string;
  setSelectedIds: (data?: any) => void;
  selectedIds: number | null;
}
export const LectureAutoComplete = ({
  id,
  setSelectedIds,
  selectedIds,
}: Props) => {
  const [items, setItems] = useState<Lecture[]>([]);
  const [show, setShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState("");
  const container = useRef<HTMLDivElement | null>(null);

  const fetchLecture = async (key: string) => {
    try {
      setLoading(true);
      const { data } = await fetchFunction({
        url: `lectures?searchKey=${key}`,
      });
      setItems(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = async () => {
    setShow(true);
    items.length === 0 && (await fetchLecture(searchKey));
  };
  const searchDebounce = useCallback(debounce(fetchLecture, 800), []);

  const handleClickOutside = (event: Event) => {
    if (
      container.current &&
      !container.current.contains(event.target as Node)
    ) {
      setShow(false);
      setItems([]);
    }
  };

  const handleOnchange = (key: string) => {
    setSearchKey(key);
    searchDebounce(key);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={container}>
      <TextField
        id={id}
        type="text"
        size="small"
        fullWidth
        required
        autoComplete="off"
        onChange={(e) => {
          handleOnchange(e.target.value);
        }}
        onFocus={handleFocus}
        value={searchKey}
      />
      {show && (
        <div className="bg-white h-[250px]  shadow-md rounded-md absolute z-50 w-full left-0  p-2 mt-2 border">
          {loading ? (
            <div>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    animation="wave"
                    key={index}
                    variant="rounded"
                    height={30}
                    className="mb-2"
                  />
                ))}
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="font-medium cursor-pointer hover:bg-black/5 p-3 rounded-md"
                onClick={() => {
                  setSelectedIds(item.id);
                  setSearchKey(item.title);
                  setShow(false);
                }}
              >
                {" "}
                {item.title}{" "}
              </div>
            ))
          ) : (
            <div className="p-3 text-center">No Lectures Founds</div>
          )}
        </div>
      )}
    </div>
  );
};
