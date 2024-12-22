import { Layout } from "../../component/layout/Layout";
import { HeadLine } from "../../component/HeadLine";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button, Paper, TextField } from "@mui/material";
import { InputLabel } from "../../component/InputLabel";
import { createSetting, getSetting } from "../../store/slice/settingSlice";
import toast from "react-hot-toast";

export const SettingPage = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((store) => store.setting.data);
  const defaultForm = {
    app_name: settings?.app_name || null,
  };

  const [sumbitForm, setForm] = useState(defaultForm);

  const handleSubmit = () => {
    dispatch(
      createSetting({
        settings: { ...sumbitForm },
        onSuccess: () => {
          toast.success("Submitted Successfully");
        },
      })
    );
  };
  useEffect(() => {
    dispatch(getSetting());
  }, []);

  useEffect(() => {
    if (settings) {
      setForm({
        app_name: settings.app_name || null,
      });
    }
  }, [settings]);

  return (
    <Layout title="Settings">
      <HeadLine header="Settings" />
      <Paper className="px-5 py-3 mt-5">
        <div className="mt-5">
          <InputLabel label="appname" />
          <TextField
            id="appname"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.app_name || ""}
            onChange={(e) =>
              setForm({ ...sumbitForm, app_name: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Paper>
    </Layout>
  );
};
