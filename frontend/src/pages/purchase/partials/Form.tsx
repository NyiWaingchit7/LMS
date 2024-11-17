import { Button, FormControl, MenuItem, Paper, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

import { Lecture } from "../../../types/lecture";
import { Student } from "../../../types/student";
import { Purchase } from "../../../types/purchase";
import {
  handleCreatePurchase,
  setPurchaseError,
} from "../../../store/slice/purchaseSlice";
import { InputLabel } from "../../../component/InputLabel";
import { FileUpload } from "../../../component/FileUpload";
import { Error } from "../../../component/Error";
import toast from "react-hot-toast";

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
  const [sumbitForm] = useState<Purchase>(defaultForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState<number | undefined>(undefined);
  const [lectureId, setLectureId] = useState<number | undefined>(undefined);
  const [imgUrl, setImgUrl] = useState("");
  const errors = useAppSelector((store) => store.purchase.error);
  const total_price =
    (lectures.find((data) => data.id === lectureId)
      ?.discount_price as number) ||
    (lectures.find((data) => data.id === lectureId)?.price as number);
  const onSuccess = () => {
    toast.success("Purchase is created successfully.");
    navigate("/purchases");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreatePurchase({
        ...sumbitForm,
        studentId: studentId as number,
        lectureId: lectureId as number,
        payment_assetUrl: imgUrl,
        total_price,
        onSuccess,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(setPurchaseError(null));
    };
  }, []);

  return (
    <Paper className="px-5 py-3 mt-5">
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
        <Error message={errors?.studentId || ""} />
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
        <Error message={errors?.lectureId || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="image" />
        <FileUpload setImgUrl={setImgUrl} />
        <Error message={errors?.payment_assetUrl || ""} />
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
