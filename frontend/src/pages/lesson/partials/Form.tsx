import { useEffect, useState } from "react";
import { Lecture, lectureData } from "../../../types/lecture";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { Lesson } from "../../../types/lesson";
import {
  handleCreateLesson,
  handleUpdateLesson,
} from "../../../store/slice/lessonSlice";
import { FileUpload } from "../../../component/FileUpload";
import { Editor } from "../../../component/Editor";

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
  const [sumbitForm, setForm] = useState<Lesson>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number>();
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/lessons");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreateLesson({
        ...sumbitForm,
        lectureId: selectedIds as number,
        content,
        assetImage: imgUrl,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdateLesson({
        id: lesson?.id as number,
        ...sumbitForm,
        content,
        assetImage: imgUrl,
        lectureId: selectedIds as number,
        onSuccess: () => {
          alert("update success");
        },
      })
    );
  };
  useEffect(() => {
    if (lesson) {
      setForm(lesson);
      setSelectedIds(lesson.lectureId as number);
      setContent(lesson.content);
    }
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
          value={sumbitForm.title}
          onChange={(e) => setForm({ ...sumbitForm, title: e.target.value })}
        />
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
      </div>
      <div className="mt-5">
        <InputLabel label="content" />
        <Editor
          setContent={setContent}
          content={content || sumbitForm.content}
        />
        {/* <TextField
          id="content"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.content}
          onChange={(e) => {
            setForm({
              ...sumbitForm,
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
        </FormControl>
      </div>
      <div className="mt-5">
        <InputLabel label="image" />
        <FileUpload setImgUrl={setImgUrl} editImg={sumbitForm.assetImage} />
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
            lesson ? handleUpdate() : handleSubmit();
          }}
        >
          {lesson ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
