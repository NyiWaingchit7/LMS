import { Button, FormControl, MenuItem, Paper, Select } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

import { Lecture } from "../../../types/lecture";
import { Student } from "../../../types/student";
import { Purchase } from "../../../types/purchase";
import { handleCreatePurchase } from "../../../store/slice/purchaseSlice";
import { InputLabel } from "../../../component/InputLabel";
import { FileUpload } from "../../../component/FileUpload";

interface Props {
  students: Student[];
  lectures: Lecture[];
}

const defaultForm = {
  studentId: undefined,
  lectureId: undefined,
  payment_assetUrl: "",
};

export const Form = ({ students, lectures }: Props) => {
  const [sumbitForm, setForm] = useState<Purchase>(defaultForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState<number | undefined>(undefined);
  const [lectureId, setLectureId] = useState<number | undefined>(undefined);
  const [imgUrl, setImgUrl] = useState("");

  const onSuccess = () => {
    navigate("/purchases");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreatePurchase({
        ...sumbitForm,
        studentId: studentId as number,
        lectureId: lectureId as number,
        payment_assetUrl: imgUrl,
        onSuccess,
      })
    );
  };

  return (
    <Paper className="px-5 py-3 mt-5">
      <div>
        <div className="mt-5">
          <FormControl fullWidth>
            <InputLabel label="Student" />
            <Select
              id="Student"
              size="small"
              value={studentId || ""}
              onChange={(e) => {
                setStudentId(e.target.value as number);
              }}
            >
              {students.map((d: Student) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-5">
          <FormControl fullWidth>
            <InputLabel label="lecture" />
            <Select
              id="lecture"
              size="small"
              value={lectureId || ""}
              onChange={(e) => {
                setLectureId(e.target.value as number);
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
      </div>
      <div className="mt-5">
        <FileUpload setImgUrl={setImgUrl} />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/purchases");
          }}
        >
          Back
        </Button>
        <Button size="small" variant="contained" onClick={handleSubmit}>
          Sumbit
        </Button>
      </div>
    </Paper>
  );
};
