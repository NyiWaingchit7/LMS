import { useEffect, useState } from "react";
import {
  handleCreateLecture,
  handleUpdateLecture,
  setLectureError,
} from "../../../store/slice/lectureSlice";
import { Lecture } from "../../../types/lecture";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { Category } from "../../../types/category";
import { Error } from "../../../component/Error";
import toast from "react-hot-toast";
import { FileUpload } from "../../../component/FileUpload";

interface Props {
  lecture?: Lecture;
  categories: Category[];
}

const defaultForm = {
  title: "",
  description: "",
  price: undefined,
  discount_price: undefined,
  isPremium: false,
  assetUrl: "",
  categories: [],
};
const options = [
  {
    label: "True",
    key: true,
  },
  {
    label: "False",
    key: false,
  },
];
export const Form = ({ lecture, categories }: Props) => {
  const [sumbitForm, setForm] = useState<Lecture>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((store) => store.lecture.error);

  const onSuccess = () => {
    toast.success("Lecture is created successfully.");

    navigate("/lectures");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreateLecture({
        ...sumbitForm,
        assetUrl: imgUrl,
        categories: selectedIds,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdateLecture({
        id: lecture?.id as number,
        ...sumbitForm,
        categories: selectedIds,
        assetUrl: imgUrl,
        onSuccess: () => {
          toast.success("Lecture is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (lecture) {
      setForm(lecture);
      setSelectedIds(
        (lecture.categories as Category[]).map((d) => d.id) as number[]
      );
    }
    return () => {
      dispatch(setLectureError(null));
    };
  }, [lecture]);
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
      <div className="mt-5">
        <FormControl fullWidth>
          <InputLabel label="category" />
          <Select
            size="small"
            multiple
            value={selectedIds || []}
            onChange={(e) => {
              setSelectedIds(e.target.value as number[]);
            }}
            renderValue={(ids) => {
              return ids
                .map((i) => {
                  return categories.find((m) => m.id === i)?.name;
                })
                .join(", ");
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  width: 250,
                },
              },
            }}
          >
            {categories.map((item: Category) => (
              <MenuItem value={item.id} key={item.id}>
                <Checkbox checked={selectedIds.includes(item.id as number)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Error message={errors?.categories || ""} />
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
      <div className="mt-5">
        <FormControl fullWidth>
          <InputLabel label="is premium" />
          <Select
            id="is premium"
            size="small"
            value={String(sumbitForm.isPremium) || ""}
            onChange={(e) => {
              setForm({ ...sumbitForm, isPremium: e.target.value === "true" });
            }}
          >
            {options.map((d) => (
              <MenuItem key={String(d.key)} value={String(d.key)}>
                {d.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {sumbitForm.isPremium && (
        <div>
          <div className="mt-5">
            <InputLabel label="price" />
            <TextField
              id="price"
              type="number"
              size="small"
              fullWidth
              required
              autoComplete="off"
              value={sumbitForm.price ?? ""}
              onChange={(e) => {
                setForm({
                  ...sumbitForm,
                  price:
                    e.target.value === "" ? undefined : Number(e.target.value),
                });
              }}
            />
            <Error message={errors?.price || ""} />
          </div>
          <div className="mt-5">
            <InputLabel label="discount_price" />
            <TextField
              id="discount_price"
              type="number"
              size="small"
              fullWidth
              required
              autoComplete="off"
              value={sumbitForm.discount_price ?? ""}
              onChange={(e) =>
                setForm({
                  ...sumbitForm,
                  discount_price:
                    e.target.value === "" ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      )}
      <div className="mt-5">
        <InputLabel label="image" />
        <FileUpload setImgUrl={setImgUrl} editImg={sumbitForm.assetUrl} />
        <Error message={errors?.assetUrl || ""} />
      </div>

      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/lectures");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            lecture ? handleUpdate() : handleSubmit();
          }}
        >
          {lecture ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
