import { Error } from "@/component/Error";
import { FileUpload } from "@/component/FileUpload";
import { InputLabel } from "@/component/InputLabel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  handleCreatePaymentBank,
  handleUpdatePaymentBank,
  setPaymentBankError,
} from "@/store/slice/payment_bankSlice";
import { Category } from "@/types/category";
import { PaymentBank } from "@/types/payment_bank";
import { Paper, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const errors = useAppSelector((store) => store.paymentBank.error);

  const onSuccess = () => {
    toast.success("Payment Bank is created successfully.");
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
          toast.success("Payment Bank is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (paymentBank) {
      setForm(paymentBank);
    }
    return () => {
      dispatch(setPaymentBankError(null));
    };
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
        <Error message={errors?.name || ""} />
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
