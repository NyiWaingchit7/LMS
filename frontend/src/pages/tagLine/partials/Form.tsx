import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { Error } from "../../../component/Error";
import toast from "react-hot-toast";
import { TagLine } from "../../../types/tagline";
import {
  handleCreateTagLine,
  handleUpdateTagLine,
  setTagLineError,
} from "../../../store/slice/taglinSlice";

interface Props {
  tagLine?: TagLine;
}

const defaultForm = {
  title: "",
  description: "",
};

export const Form = ({ tagLine }: Props) => {
  const [sumbitForm, setForm] = useState<TagLine>(defaultForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((store) => store.tagLine.error);

  const onSuccess = () => {
    toast.success("TagLine created successfully");
    navigate("/tag-lines");
  };

  const handleSubmit = async () => {
    dispatch(
      handleCreateTagLine({
        ...sumbitForm,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdateTagLine({
        id: tagLine?.id as number,
        ...sumbitForm,
        onSuccess: () => {
          toast.success("TagLine is updated successfully");
        },
      })
    );
  };
  useEffect(() => {
    if (tagLine) {
      setForm(tagLine);
    }
    return () => {
      dispatch(setTagLineError(null));
    };
  }, [tagLine]);
  return (
    <Paper className="px-5 py-3 mt-5">
      <div className="mt-5">
        <InputLabel label="name" />
        <TextField
          id="name"
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
      <div className="mt-5">
        <InputLabel label="description" />
        <TextField
          id="description"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.description}
          onChange={(e) =>
            setForm({ ...sumbitForm, description: e.target.value })
          }
        />
        <Error message={errors?.description || ""} />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/tag-lines");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            tagLine ? handleUpdate() : handleSubmit();
          }}
        >
          {tagLine ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
