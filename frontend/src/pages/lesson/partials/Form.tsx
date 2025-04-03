import { useEffect, useState } from "react";
import { lectureData } from "@/types/lecture";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Paper, TextField } from "@mui/material";
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
import { LectureAutoComplete } from "@/component/LectureAutocomplete";

interface Props {
  lesson?: Lesson;
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

export const Form = ({ lesson }: Props) => {
  const [submitForm, setForm] = useState<Lesson>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number | null>(null);
  const [videoUrl, setvideoUrl] = useState("");
  const errors = useAppSelector((store) => store.lesson.error);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Lesson is created successfully.");
    navigate("/lessons");
  };

  const handlesubmitForm = () => {
    dispatch(
      storeLesson({
        ...submitForm,
        lectureId: selectedIds as number,
        assetVideo: videoUrl,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      updateLesson({
        id: lesson?.id as number,
        ...submitForm,
        assetVideo: videoUrl,
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
      setvideoUrl(lesson.assetVideo as string);
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
      </div>

      <div className="mt-5">
        <FormControl fullWidth>
          <InputLabel label="lectures" />

          <LectureAutoComplete
            id="lectures"
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            edit={lesson?.lecture}
          />
        </FormControl>
        <Error message={errors?.lectureId || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="Video" />
        <FileUpload
          setImgUrl={setvideoUrl}
          acceptedFileType={["video/*"]}
          editImg={submitForm.assetVideo}
          type="video"
        />
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
