import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { useAppDispatch } from "../../../store/hooks";
import {
  handleCreateCategory,
  handleGetCategory,
  handleUpdateCategory,
} from "../../../store/slice/categorySlice";
import { useNavigate } from "react-router-dom";

interface Props {
  category?: Category;
}

const defaultForm = {
  name: "",
  assetUrl: "",
};

export const Form = ({ category }: Props) => {
  const [sumbitForm, setForm] = useState<Category>(defaultForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    dispatch(handleGetCategory());
    navigate("/categories");
  };

  const handleSubmit = () => {
    dispatch(handleCreateCategory({ ...sumbitForm, onSuccess }));
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdateCategory({
        id: category?.id as number,
        ...sumbitForm,
        onSuccess: () => {
          alert("update success");
        },
      })
    );
  };
  useEffect(() => {
    if (category) {
      setForm(category);
    }
  }, [category]);
  return (
    <Paper className="px-5 py-3 mt-5">
      <div>
        <InputLabel label="name" />
        <TextField
          id="name"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.name}
          onChange={(e) => setForm({ ...sumbitForm, name: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/categories");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            category ? handleUpdate() : handleSubmit();
          }}
        >
          {category ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
