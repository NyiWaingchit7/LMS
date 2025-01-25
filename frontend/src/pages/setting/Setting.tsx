import { HeadLine } from "@/component/HeadLine";
import { useEffect, useState } from "react";
import { InputLabel } from "@/component/InputLabel";
import { createSetting, getSetting } from "@/store/slice/settingSlice";
import toast from "react-hot-toast";
import { Error } from "@/component/Error";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Paper, TextField, Button } from "@mui/material";

export const SettingPage = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((store) => store.setting.data);
  const defaultForm = {
    app_name: settings?.app_name || null,
    email: settings?.email || null,
    phone: settings?.phone || null,
    facebook: settings?.facebook || null,
    messenger: settings?.messenger || null,
    youtube: settings?.youtube || null,
    telegram: settings?.telegram || null,
  };

  const [sumbitForm, setForm] = useState(defaultForm);
  const errors = useAppSelector((store) => store.setting.error);
  const handleSubmit = () => {
    dispatch(
      createSetting({
        settings: { ...sumbitForm },
        onSuccess: () => {
          toast.success("Submitted Successfully");
          // window.location.reload();
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
        email: settings?.email || null,
        phone: settings?.phone || null,
        facebook: settings?.facebook || null,
        messenger: settings?.messenger || null,
        youtube: settings?.youtube || null,
        telegram: settings?.telegram || null,
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
        <div className="mt-5">
          <InputLabel label="email" />
          <TextField
            id="email"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.email || ""}
            onChange={(e) => setForm({ ...sumbitForm, email: e.target.value })}
          />
          <Error message={errors?.email || ""} />
        </div>{" "}
        <div className="mt-5">
          <InputLabel label="phone" />
          <TextField
            id="phone"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.phone || ""}
            onChange={(e) => setForm({ ...sumbitForm, phone: e.target.value })}
          />
        </div>{" "}
        <div className="mt-5">
          <InputLabel label="facebook" />
          <TextField
            id="facebook"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.facebook || ""}
            onChange={(e) =>
              setForm({ ...sumbitForm, facebook: e.target.value })
            }
          />
        </div>{" "}
        <div className="mt-5">
          <InputLabel label="messenger" />
          <TextField
            id="messenger"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.messenger || ""}
            onChange={(e) =>
              setForm({ ...sumbitForm, messenger: e.target.value })
            }
          />
        </div>{" "}
        <div className="mt-5">
          <InputLabel label="youtube" />
          <TextField
            id="youtube"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.youtube || ""}
            onChange={(e) =>
              setForm({ ...sumbitForm, youtube: e.target.value })
            }
          />
        </div>{" "}
        <div className="mt-5">
          <InputLabel label="telegram" />
          <TextField
            id="telegram"
            type="text"
            size="small"
            fullWidth
            required
            autoComplete="off"
            value={sumbitForm.telegram || ""}
            onChange={(e) =>
              setForm({ ...sumbitForm, telegram: e.target.value })
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
