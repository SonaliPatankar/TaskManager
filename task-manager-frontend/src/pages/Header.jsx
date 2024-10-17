import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import task_logo from "../assets/prioritize.png";

function Header() {
  const theme = useTheme(); // Using the theme for colors and spacing
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Left side logo with flexGrow to create space */}
          <Box sx={{ flexGrow: 1 }}>
            <img
              alt="Task Manager Logo"
              src={task_logo}
              style={{ height: 60, marginRight: theme.spacing(2), cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Typography centered by setting flexGrow on both sides */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: theme.palette.common.white,
              fontWeight: "bold",
              letterSpacing: "0.1rem",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Task Manager App
          </Typography>

          {/* Right side account icon with flexGrow to create space */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Account Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon sx={{ fontSize: 36, color: theme.palette.common.white }} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: 1 }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate("/logout");
                }}
              >
                <Typography textAlign="center" sx={{ color: theme.palette.text.primary }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
