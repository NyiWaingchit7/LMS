import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { ListTable } from "./partials/ListTable";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { usePage } from "../../utils/getPage";
import { SearchButton } from "../../component/SearchButton";
import { handleGetTagLine } from "../../store/slice/taglinSlice";

export const TagLine = () => {
  const dispatch = useAppDispatch();
  const tagLines = useAppSelector((store) => store.tagLine.items);
  const { page, searchKey } = usePage();

  useEffect(() => {
    console.log(page, searchKey);

    dispatch(handleGetTagLine({ page, searchKey }));
  }, [page, searchKey]);

  return (
    <Layout title="TagLines">
      <HeadLine header="TagLines" />
      <div>
        <SearchButton path="tag-lines" />
        <ListTable data={tagLines} />
      </div>
    </Layout>
  );
};
