import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
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
import { PaymentAccount } from "../../../types/payment_account";
import { PaymentBank, paymentBankData } from "../../../types/payment_bank";
import {
  handleCreatePaymentAccount,
  handleUpdatePaymentAccount,
  setPaymentAccountError,
} from "../../../store/slice/payment_accountSlice";
import { Error } from "../../../component/Error";
import toast from "react-hot-toast";

interface Props {
  paymentAccount?: PaymentAccount;
  paymentBanks: PaymentBank[];
}

const defaultForm = {
  id: undefined,
  name: "",
  phone_number: "",
  payment_bank_id: undefined,
  payment_bank: paymentBankData,
};

export const Form = ({ paymentAccount, paymentBanks }: Props) => {
  const [sumbitForm, setForm] = useState<PaymentAccount>(defaultForm);
  const [selectedIds, setSelectedIds] = useState<number>();
  const errors = useAppSelector((store) => store.paymentAccount.error);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Payment account is created successfully.");
    navigate("/payment-accounts");
  };

  const handleSubmit = () => {
    dispatch(
      handleCreatePaymentAccount({
        ...sumbitForm,
        payment_bank_id: selectedIds as number,
        onSuccess,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(
      handleUpdatePaymentAccount({
        id: paymentAccount?.id as number,
        ...sumbitForm,
        payment_bank_id: selectedIds as number,
        onSuccess: () => {
          toast.success("Payment account is updated successfully.");
        },
      })
    );
  };
  useEffect(() => {
    if (paymentAccount) {
      setForm(paymentAccount);
      setSelectedIds(paymentAccount.payment_bank_id as number);
    }
    return () => {
      dispatch(setPaymentAccountError(null));
    };
  }, [paymentAccount]);
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
        <InputLabel label="phone number" />
        <TextField
          id="phone number"
          type="text"
          size="small"
          fullWidth
          required
          autoComplete="off"
          value={sumbitForm.phone_number}
          onChange={(e) =>
            setForm({ ...sumbitForm, phone_number: e.target.value })
          }
        />
        <Error message={errors?.phone_number || ""} />
      </div>

      <div className="mt-5">
        <FormControl fullWidth>
          <InputLabel label="payment banks" />
          <Select
            id="payment banks"
            size="small"
            value={selectedIds || ""}
            onChange={(e) => {
              setSelectedIds(e.target.value as number);
            }}
          >
            {paymentBanks.map((d: PaymentBank) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Error message={errors?.payment_bank_id || ""} />
      </div>
      <div className="flex justify-end mt-5 items-center gap-2">
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/payment-accounts");
          }}
        >
          Back
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            paymentAccount ? handleUpdate() : handleSubmit();
          }}
        >
          {paymentAccount ? "Update" : "Submit"}
        </Button>
      </div>
    </Paper>
  );
};
