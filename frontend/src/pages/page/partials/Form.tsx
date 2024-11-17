import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { Error } from "../../../component/Error";
import toast from "react-hot-toast";
import { Page } from "../../../types/page";
import {
  handleCreatePage,
  handleUpdatePage,
  setPageError,
} from "../../../store/slice/pageSlice";
import { Editor } from "../../../component/Editor";

interface Props {
  page?: Page;
}

const defaultForm = {
  title: "",
  content: "",
};

export const Form = ({ page }: Props) => {
  const [sumbitForm, setForm] = useState<Page>(defaultForm);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((store) => store.page.error);
  const [content, setContent] = useState("");

  const onSuccess = () => {
    toast.success("Page is created successfully.");

    navigate("/pages");
  };

  const handleSubmit = () => {
    dispatch(handleCreatePage({ ...sumbitForm, content, onSuccess }));
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdatePage({
        id: page?.id as number,
        ...sumbitForm,
        content,
        onSuccess: () => {
          toast.success("Page is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (page) {
      setForm(page);
    }
    return () => {
      dispatch(setPageError(null));
    };
  }, [page]);
  return (
    <Paper className="px-5 py-3 mt-5">
      <div>
        <InputLabel label="title" />
        <TextField
          id="title"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.title}
          onChange={(e) => setForm({ ...sumbitForm, title: e.target.value })}
        />
        <Error message={errors?.title || ""} />
      </div>
      <div>
        <InputLabel label="content" />
        <Editor
          setContent={setContent}
          content={content || sumbitForm.content}
        />
        <Error message={errors?.content || ""} />
      </div>

      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/pages");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            page ? handleUpdate() : handleSubmit();
          }}
        >
          {page ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
