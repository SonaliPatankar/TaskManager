import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button, Menu } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// import task_logo from "../assets/prioritize.png";
import task_logo from "../assets/task_logo.png"
function Header() {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar disableGutters sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", paddingLeft:"15px"}}>
          <img
            alt="Task Manager Logo"
            src={task_logo}
            style={{ height: 50, marginRight: theme.spacing(2), cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Box>

        {/* Centered Typography with navigation links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" onClick={() => navigate("/tasks")}>
            Tasks
          </Button>
          <Button color="inherit" onClick={() => navigate("/about-us")}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => navigate("/contact-us")}>
            Contact Us
          </Button>
        </Box>

        {/* Right side account icon */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" , paddingRight:"15px"}}>
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
    </AppBar>
  );
}

export default Header;
