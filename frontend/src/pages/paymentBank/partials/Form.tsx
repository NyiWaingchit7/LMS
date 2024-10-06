import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "../../../component/InputLabel";
import { useEffect, useState } from "react";
import { Category } from "../../../types/category";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { PaymentBank } from "../../../types/payment_bank";
import {
  handleCreatePaymentBank,
  handleUpdatePaymentBank,
} from "../../../store/slice/payment_bankSlice";
import { FileUpload } from "../../../component/FileUpload";

interface Props {
  paymentBank?: PaymentBank;
}

const defaultForm = {
  name: "",
  assetUrl: "",
};

export const Form = ({ paymentBank }: Props) => {
  const [sumbitForm, setForm] = useState<Category>(defaultForm);
  const [imgUrl, setImgUrl] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/payment-banks");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreatePaymentBank({ ...sumbitForm, assetUrl: imgUrl, onSuccess })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdatePaymentBank({
        id: paymentBank?.id as number,
        ...sumbitForm,
        assetUrl: imgUrl,
        onSuccess: () => {
          alert("update success");
        },
      })
    );
  };
  useEffect(() => {
    if (paymentBank) {
      setForm(paymentBank);
    }
  }, [paymentBank]);
  return (
    <Paper className="px-5 py-3 mt-5">
      <div>
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
      <div className="mt-5">
        <InputLabel label="image" />
        <FileUpload setImgUrl={setImgUrl} editImg={sumbitForm.assetUrl} />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/payment-banks");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            paymentBank ? handleUpdate() : handleSubmit();
          }}
        >
          {paymentBank ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
