import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/index";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,

  document.getElementById("root")
);
