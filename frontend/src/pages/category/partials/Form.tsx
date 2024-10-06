import {
  Box,
  Button,
  Chip,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { useAppDispatch } from "../../../store/hooks";
import {
  handleCreateCategory,
  handleUpdateCategory,
} from "../../../store/slice/categorySlice";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "../../../component/UploadFile";
import { fileUpload } from "../../../utils/fileUpload";
import { FileUpload } from "../../../component/FileUpload";

interface Props {
  category?: Category;
}

const defaultForm = {
  name: "",
  assetUrl: "",
};

export const Form = ({ category }: Props) => {
  const [sumbitForm, setForm] = useState<Category>(defaultForm);
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/categories");
  };

  const handleSubmit = async () => {
    dispatch(
      handleCreateCategory({
        ...sumbitForm,
        assetUrl: imgUrl,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdateCategory({
        id: category?.id as number,
        ...sumbitForm,
        assetUrl: imgUrl,
        onSuccess: () => {
          alert("update success");
        },
      })
    );
  };
  useEffect(() => {
    if (category) {
      setForm(category);
      setImgUrl(category.assetUrl as string);
    }
  }, [category]);
  return (
    <Paper className="px-5 py-3 mt-5">
      <div className="mt-5">
        <InputLabel label="image" />

        <FileUpload setImgUrl={setImgUrl} editImg={sumbitForm.assetUrl} />
      </div>
      <div className="mt-5">
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
