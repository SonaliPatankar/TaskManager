import { createTheme } from "@mui/material/styles";
import { common, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      dark: "#f7f7f7",
      paper: common.white,
      paper1: common.black,
    },
    primary: {
      main: "#004E91",
    },
    inherit: "#ffffff",
    secondary: {
      main: "#FAC300",
    },
    common: {
      grey: "#54585A",
      lightgrey: "#f5f5f5",
      green: "#33A02C",
      lightgreen: "#00B16A",
      black: "#000000",
      white: "#ffffff",
      link: "#0000FF",
      avatar1: "#FF8D29",
    },
    chartColors: {
      color1: "#DAFF7C",
      color2: "#033043",
      color3: "#0A7273",
      color4: "#e66f00",
      color5: "#745ea9",
      color6: "#D2EEF9",
      color7: "#4D55F5",
      color8: "#C45858",
      color9: "#4e910f",
      color10: "#910f4e",
      color11: "#91520f",
      color12: "#3e0e4b",
    },
    text: {
      primary: blueGrey[900],
      secondary: blueGrey[600],
    },
    error: {
      main: "#C21E56",
    },
  },
  typography: {
    fontFamily: ["Playfair Display !important", "sans-serif"],
    fontSize: 12.5,
    fontWeight: 300,
  },
  mixins: {
    toolbar: {
      minHeight: 50,
    },
  },
});

export default theme;
