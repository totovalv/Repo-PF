import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import logo from "../../assets/logo.PNG";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
// import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Header() {
  // const tokenUser = useSelector((state) => state.sessionState);
  const sesionLocal = JSON.parse(localStorage.getItem("session"));
  // console.log("sesion---->", sesionLocal);
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSesionClose = () => {
    localStorage.clear();
    navigate("/");
  }
  if (!sesionLocal) {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <NavLink className="color-header-res" to={"/login"}>
                    LOGIN
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img alt="logo" src={logo} width="100px" style={{ cursor: "pointer" }} />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/login"}>
                LOGIN
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (sesionLocal && sesionLocal[0].role === "admin") {
    return (
      <AppBar className="texts-login" position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <NavLink className="color-header-res" to={"/admin"}>
                    ADMIN
                  </NavLink>
                </MenuItem>

                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    PROFILE
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img alt="logo" src={logo} width="100px" style={{ cursor: "pointer" }} />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/admin"}>
                ADMIN
              </NavLink>
              <NavLink className="color-header" to={"/profile"}>
                PROFILE
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
            <Button 
            variant="outlined"
            onClick={handleSesionClose}
            sx={{ml:3, color: "#ff6700"}} 
            endIcon={<LogoutOutlined/>}>
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  if (sesionLocal && sesionLocal[0].role === "user") {
    return (
      <AppBar className="texts-login"  position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <NavLink className="color-header-res" to={"/cart"}>
                    CART
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="color-header-res" to={"/createProduct"}>
                    CREATE PRODUCT
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink className="color-header-res" to={"/profile"}>
                    PROFILE
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <NavLink to={"/"}>
              <img alt="logo" src={logo} width="100px" style={{ cursor: "pointer" }} />
            </NavLink>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              className="color-header"
            >
              <NavLink className="color-header" to={"/cart"}>
                <ShoppingCartIcon/>
             
              </NavLink>
              <NavLink className="color-header" to={"/profile"}>
                  <AccountCircleIcon/> 
                  {" "}   
              </NavLink>
              <NavLink className="color-header" to={"/profile"}>
              {sesionLocal[0].username[0].toUpperCase()+ sesionLocal[0].username.slice(1)}
              </NavLink>
              <NavLink className="color-header" to={"/createProduct"}>
                CREATE PRODUCT
              </NavLink>
              <NavLink className="color-header" to={"/createProduct"}>
             <AddBoxIcon></AddBoxIcon>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <SearchBar />
            <Button 
            variant="outlined"
            onClick={handleSesionClose}
            sx={{ml:3, color: "#ff6700"}} 
            endIcon={<LogoutOutlined/>}>
              LOGOUT
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
