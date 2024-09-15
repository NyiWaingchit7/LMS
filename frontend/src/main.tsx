import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./utils/theme.ts";
import { Router } from "./routes/Routers.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>{" "}
  </Provider>
);
