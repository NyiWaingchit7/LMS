import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "@/component/InputLabel";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setPopularLectureError,
  storePopularLecture,
  updatePopularLecture,
} from "@/store/slice/popular_lectureSlice";
import { Error } from "@/component/Error";
import { LectureAutoComplete } from "@/component/LectureAutocomplete";
import { PopularLecture } from "@/types/popular_lecture";

interface Props {
  lecture?: PopularLecture;
}

const defaultForm = {
  title: "",
  lectureId: null,
};

export const Form = ({ lecture }: Props) => {
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
      storePopularLecture({
        ...sumbitForm,
        lectureId: selectedIds as number,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      updatePopularLecture({
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

      setSelectedIds(Number(lecture.lectureId));
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
        <InputLabel label="lectures" />
        <LectureAutoComplete
          id="lectures"
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
          edit={lecture?.lecture}
        />
        {/* <FormControl fullWidth>
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
        </FormControl> */}
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
