import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "@/component/InputLabel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useNavigate } from "react-router-dom";
import { CreateStudent, Student } from "@/types/student";
import {
  setStudentError,
  storeStudent,
  updateStudent,
} from "@/store/slice/studentSlice";
import { Error } from "@/component/Error";
import toast from "react-hot-toast";

interface Props {
  student?: Student;
}

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  assetUrl: "",
};

export const Form = ({ student }: Props) => {
  const [sumbitForm, setForm] = useState<Student>(defaultForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((store) => store.student.error);

  const onSuccess = () => {
    toast.success("Student is created successfully");
    navigate("/students");
  };

  const handleSubmit = () => {
    dispatch(storeStudent({ ...(sumbitForm as CreateStudent), onSuccess }));
  };

  const handleUpdate = () => {
    dispatch(
      updateStudent({
        id: student?.id as number,
        ...sumbitForm,
        onSuccess: () => {
          toast.success("Student is updated successfully");
        },
      })
    );
  };
  useEffect(() => {
    if (student) {
      console.log(student);

      setForm({ ...student, password: "" });
      console.log(sumbitForm);
    }
    return () => {
      dispatch(setStudentError(null));
    };
  }, [student]);
  return (
    <Paper className="px-5 py-3 mt-5">
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
        <Error message={errors?.name || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="email" />
        <TextField
          id="email"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.email}
          onChange={(e) => setForm({ ...sumbitForm, email: e.target.value })}
        />
        <Error message={errors?.email || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="password" />
        <TextField
          id="password"
          type="password"
          size="small"
          fullWidth
          required
          autoComplete="off"
          onChange={(e) => setForm({ ...sumbitForm, password: e.target.value })}
        />
        <Error message={errors?.password || ""} />
      </div>
      <div className="mt-5">
        <InputLabel label="phone" />
        <TextField
          id="phone"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.phone}
          onChange={(e) => setForm({ ...sumbitForm, phone: e.target.value })}
        />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/students");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            student ? handleUpdate() : handleSubmit();
          }}
        >
          {student ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
