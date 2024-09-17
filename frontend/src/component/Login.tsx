import { Box, Button, TextField } from "@mui/material";
import { InputLabel } from "./InputLabel";
import { useState } from "react";
import { config } from "../utils/config";
interface DefaultForm {
  email: string;
  password: string;
}
const defaultForm: DefaultForm = {
  email: "",
  password: "",
};
export const LogIn = () => {
  const [loginForm, setForm] = useState<DefaultForm>(defaultForm);
  const url = config.apiUrl;

  const handleLogin = () => {
    console.log(url);

    console.log(loginForm);
  };

  return (
    <Box className="min-h-screen flex justify-center items-center">
      <Box className="  w-screen max-w-screen-sm  flex flex-col gap-2 justify-center items-center ">
        <Box>
          <img src="./logo.png" className="w-20" alt="" />
        </Box>
        <Box className="flex flex-col gap-4 bg-white px-5 py-5 rounded-lg shadow-lg ">
          <Box className="flex flex-col gap-2">
            <InputLabel label={"email"} />
            <TextField
              id="email"
              autoComplete="off"
              type="email"
              sx={{ width: "400px" }}
              onChange={(e) => {
                setForm({ ...loginForm, email: e.target.value });
              }}
            />
          </Box>
          <Box className="flex flex-col gap-2">
            <InputLabel label={"password"} />
            <TextField
              id="password"
              autoComplete="off"
              type="password"
              sx={{ width: "400px" }}
              onChange={(e) =>
                setForm({ ...loginForm, password: e.target.value })
              }
            />
          </Box>
          <Box className="flex justify-end">
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Log in
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
