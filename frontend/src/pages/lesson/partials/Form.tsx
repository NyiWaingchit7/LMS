import { useEffect, useState } from "react";
import { Lecture, lectureData } from "@/types/lecture";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { InputLabel } from "@/component/InputLabel";
import { Lesson } from "@/types/lesson";
import {
  setLessonError,
  storeLesson,
  updateLesson,
} from "@/store/slice/lessonSlice";
import { FileUpload } from "@/component/FileUpload";
import { Editor } from "@/component/Editor";
import { Error } from "@/component/Error";
import toast from "react-hot-toast";

interface Props {
  lesson?: Lesson;
  lectures: Lecture[];
}

const defaultForm = {
  id: undefined,
  title: "",
  description: "",
  content: "",
  assetImage: "",
  assetVideo: "",
  lecture: lectureData,
};

export const Form = ({ lectures, lesson }: Props) => {
  const [submitForm, setForm] = useState<Lesson>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const errors = useAppSelector((store) => store.lesson.error);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(submitForm);

  const onSuccess = () => {
    toast.success("Lesson is created successfully.");
    navigate("/lessons");
  };

  const handlesubmitForm = () => {
    dispatch(
      storeLesson({
        ...submitForm,
        lectureId: selectedIds as number,
        assetImage: imgUrl,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      updateLesson({
        id: lesson?.id as number,
        ...submitForm,
        assetImage: imgUrl,
        lectureId: selectedIds as number,
        onSuccess: () => {
          toast.success("Lesson is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (lesson) {
      setForm(lesson);
      setSelectedIds(lesson.lectureId as number);
    }
    return () => {
      dispatch(setLessonError(null));
    };
  }, [lesson]);
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
          value={submitForm.title}
          onChange={(e) => setForm({ ...submitForm, title: e.target.value })}
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
          value={submitForm.description}
          onChange={(e) =>
            setForm({ ...submitForm, description: e.target.value })
          }
        />
        <Error message={errors?.description || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="content" />
        <Editor
          content={submitForm.content || ""}
          onChange={(value: string) => {
            setForm((prev) => ({ ...prev, content: value }));
          }}
        />
        {/* <TextField
          id="content"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={submitForm.content}
          onChange={(e) => {
            setForm({
              ...submitForm,
              content: e.target.value,
            });
          }}
        /> */}
      </div>

      <div className="mt-5">
        <FormControl fullWidth>
          <InputLabel label="lectures" />
          <Select
            id="lectures"
            size="small"
            value={selectedIds || ""}
            onChange={(e) => {
              setSelectedIds(e.target.value as number);
            }}
          >
            {lectures.map((d: Lecture) => (
              <MenuItem key={d.id} value={d.id}>
                {d.title}
              </MenuItem>
            ))}
          </Select>
          {/* <Autocomplete
            id="lectures"
            disableClearable
            options={lectures}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.title || ""
            }
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            value={lectures.find((lecture) => lecture.id === selectedIds)}
            onChange={(event, value) => {
              setSelectedIds(value?.id || null);
              console.log(event);
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.title}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Lectures"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          /> */}
        </FormControl>
        <Error message={errors?.lectureId || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="image" />
        <FileUpload setImgUrl={setImgUrl} editImg={submitForm.assetImage} />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/lessons");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            lesson ? handleUpdate() : handlesubmitForm();
          }}
        >
          {lesson ? "Update" : "submitForm"}
        </Button>
      </div>
    </Paper>
  );
};
