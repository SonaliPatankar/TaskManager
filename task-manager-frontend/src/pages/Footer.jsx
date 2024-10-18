import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function Footer() {
  const theme = useTheme();

  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0, backgroundColor: theme.palette.primary.main }}>
      <Toolbar disableGutters sx={{ padding: "0px 1px" }}>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: theme.palette.common.white }}>
            © {new Date().getFullYear()} Task Manager App. All Rights Reserved.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
