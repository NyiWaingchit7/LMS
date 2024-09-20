import { Button, TextField } from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { useAppDispatch } from "../../../store/hooks";
import {
  handleCreateCategory,
  handleGetCategory,
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
    navigate("/category");
  };

  const handleSubmit = () => {
    dispatch(handleCreateCategory({ ...sumbitForm, onSuccess }));
  };
  useEffect(() => {
    if (category) {
      defaultForm.name = category.name || "";
      defaultForm.assetUrl = category.assetUrl || "";
    }
  }, [category]);
  return (
    <div className="px-5 py-3 bg-white rounded-lg shadow-lg mt-5">
      <div>
        <InputLabel label="name" />
        <TextField
          id="name"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          onChange={(e) => setForm({ ...sumbitForm, name: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/category");
          }}
        >
          Back
        </Button>
        <Button size="small" variant="contained" onClick={handleSubmit}>
          Sumbit
        </Button>
      </div>
    </div>
  );
};
