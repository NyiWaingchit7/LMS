import { useEffect, useState } from "react";

import { Lecture } from "../../../types/lecture";
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
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  handleCreatePopularLecture,
  handleUpdatePopularLecture,
  setPopularLectureError,
} from "../../../store/slice/popular_lectureSlice";
import { Error } from "../../../component/Error";

interface Props {
  lecture?: any;
  lectures: Lecture[];
}

const defaultForm = {
  title: "",
  lectureId: null,
};

export const Form = ({ lecture, lectures }: Props) => {
  const [sumbitForm, setForm] = useState<any>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((store) => store.popularLecture.error);

  const onSuccess = () => {
    toast.success("Lecture is added to Popular list successfully.");

    navigate("/popular-lectures");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreatePopularLecture({
        ...sumbitForm,
        lectureId: selectedIds as number,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdatePopularLecture({
        id: lecture?.id as number,
        ...sumbitForm,
        lectureId: selectedIds as number,
        onSuccess: () => {
          toast.success("Lecture is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (lecture) {
      setForm(lecture);

      setSelectedIds(lecture.lectureId);
    }
    return () => {
      dispatch(setPopularLectureError(null));
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
          <InputLabel label="lectures" />
          <Select
            id="payment banks"
            size="small"
            value={selectedIds || ""}
            onChange={(e) => {
              setSelectedIds(e.target.value as number);
            }}
          >
            {lectures?.map((d: Lecture) => (
              <MenuItem key={d.id} value={d.id}>
                {d.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Error message={errors?.lectureId || ""} />
      </div>

      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/popular-lectures");
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
