import { Logout } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";

// import Logo from '../../../public/plogo_for_cc.svg';
import { motion } from "framer-motion";
import "./Navbar.module.css";
import "./styles.css";

function UserDisplay({ user, logOut }: { user: string; logOut: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  return (
    <div>
      <Button
        sx={{
          margin: 0,
          padding: 0,
          textTransform: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          "&:hover": { backgroundColor: "inherit" },
          "&:checked": {},
        }}
        disableRipple
        onClick={handleClick}
      >
        <Avatar sx={{ height: "30px", width: "30px", marginRight: 1 }}></Avatar>{" "}
        {user}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={() => navigate("/admin/home")}>
          <ListItemIcon>
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          Admin View
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

const NavButtonActive = styled(Button)(({ theme }) => ({
  textTransform: 'none', // Remove uppercase transformation
  color: "var(--text-color)", // Use the primary text color
  position: 'relative',
  paddingInline: '10px',
  fontWeight: 'bold',
  "&:hover": {
    backgroundColor: "transparent",
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '95%',
    height: '2px',
    display: 'block',
    marginTop: '20px',
    borderRadius: '.25rem',
    // left: '0',
    background: "var(--text-color)",
    transition: 'width 0.3s ease',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  color: "var(--text-color)",
  position: "relative",
  fontSize: "0.95rem",
  paddingInline: "10px",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0",
    height: "2px",
    display: "block",
    marginTop: "20px",
    right: "0",
    background: "var(--text-color)",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "95%",
    left: "0",
    backgroundColor: "var(--text-color)",
  },
}));

const NavBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff12",
  backdropFilter: "blur(8px)",
  color: theme.palette.text.primary,
  // borderBottom: `1px solid ${theme.palette.divider}`,
  position: "fixed",
  paddingBlock: "5px",
  width: "100%",

  top: 0,
  zIndex: 100,
}));


import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import CollectionsIcon from '@mui/icons-material/Collections';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  const pages = ["Home", "About Us", "Anouncements", "Projects", "Gallery", "Contact Us"];
  const pageIcons = [<HomeIcon />, <InfoIcon />, <NotificationsIcon />, <CodeIcon />, <CollectionsIcon />, <ContactMailIcon />]
  const move = ["/home", "/aboutus", "/announcements", "/projects", "/gallery", '/contactus'] as string[];
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const linkIdx = move.findIndex((path) => location.pathname == path)
  // const { user, logOut } = useAuth() || { user: undefined };
  const isActive = (path: string) => location.pathname === path;
  return (
    <div>
      <NavBox>
        <motion.div
          initial={{ y: '-110%' }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          animate={
            { y: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 2.5 }}
        >
          {/* <nav className={""} style={{}}> */}

          {/* {user ? <UserDisplay user={user} logOut={logOut} /> : location.pathname == '/login' ? <></> :<Link to="/login">Login</Link>} */}

          <div className="__menu-bar" >

            <IconButton
              aria-label="open drawer"
              onClick={() => { setDrawerOpen(true) }}
            >

              <MenuIcon sx={{color: "black"}} />
            </IconButton>
          </div>
          <div className="__name-logo">Coding Club</div>


          {/* <Logo /> */}
          {/* <img src={Logo} width={100}/> */}
          {
            <div className={"__nav-buttons " + style.nav} >
              {pages.map((page, index) => (
                (index == linkIdx) ?<NavButtonActive>{page}</NavButtonActive>: <NavButton sx={{
                  fontWeight: isActive(move[index]) ? "bold" : "normal", 
                  fontSize: isActive(move[index]) ? 20: ""
                }} onClick={() => navigate(move[index])}>{page}</NavButton>
              ))}
            </div>

          }
        </motion.div>
        {/* </nav> */}
      </NavBox>

      <Drawer open={drawerOpen} transitionDuration={1000} onClose={() => { setDrawerOpen(false); }}>
        <motion.div
          initial={{ x: '-110%' }}
          animate={
            { x: 0 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <Box sx={{ width: "100vh", }} role="presentation">
            <List>
              <ListItem>
                <CloseIcon style={{ fontSize: "2em" }} onClick={() => { setDrawerOpen(false); }} />
              </ListItem>
              <ListItem>

                <div className="__name-logo" style={{ color: theme.palette.mode == "dark"? "white": "" }}>Coding Club</div>

              </ListItem>
              <Divider />
              {pages.map((text, index) => (
                
                <ListItem key={text} disablePadding sx={{ backgroundColor: isActive(move[index]) ? theme.palette.mode == "dark" ? "white": "black": "", color: isActive(move[index]) ? theme.palette.mode == "dark" ? "black": "white": "" }}>
                  <ListItemButton onClick={() => { setDrawerOpen(false);  navigate(move[index]) }} >
                    <ListItemIcon sx={{color: isActive(move[index]) ? theme.palette.mode == "dark" ? "black": "white": "" }}>
                      {pageIcons[index]}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ fontSize: "5em" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

          </Box>
        </motion.div>
      </Drawer>
    </div>
  );
};

export default Navbar;
