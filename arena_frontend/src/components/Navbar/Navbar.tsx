import MenuIcon from '@mui/icons-material/Menu';
import {
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
  styled
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";

// import Logo from '../../../public/plogo_for_cc.svg';
import { motion } from "framer-motion";
import "./Navbar.module.css";
import "./styles.css";

// function UserDisplay({ user, logOut }: { user: string; logOut: () => void }) {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const navigate = useNavigate();
//   return (
//     <div>
//       <Button
//         sx={{
//           margin: 0,
//           padding: 0,
//           textTransform: "none",
//           color: "inherit",
//           display: "flex",
//           alignItems: "center",
//           "&:hover": { backgroundColor: "inherit" },
//           "&:checked": {},
//         }}
//         disableRipple
//         onClick={handleClick}
//       >
//         <Avatar sx={{ height: "30px", width: "30px", marginRight: 1 }}></Avatar>{" "}
//         {user}
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem> */}
//         <MenuItem onClick={() => navigate("/admin/home")}>
//           <ListItemIcon>
//             <AdminPanelSettingsIcon />
//           </ListItemIcon>
//           Admin View
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={logOut}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }

const NavButtonActive = styled(Button)(() => ({
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

const NavButton = styled(Button)(() => ({
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
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import NotificationsIcon from '@mui/icons-material/Notifications';

const pageData = [
  ["Home", <HomeIcon />, "/home",],
  ["Events", <EventIcon />, "/home/Events",],
  ["Announcements", <NotificationsIcon />, "/home/announcements",],
  ["Standings", <LeaderboardIcon />, "/home/standings",],
  ["Our Team", <GroupsIcon />, "/home/our-team",],
  ["Projects", <CodeIcon />, "/home/projects",],
  ["Gallery", <CollectionsIcon />, "/home/gallery",],
  ["Contact Us", <ContactMailIcon />, "/home/contact-us",]
];


const MenuButton = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  return (
    <div className="__menu-bar" >
      <IconButton
        aria-label="open drawer"
        onClick={() => { setOpen(true) }}
      >
        <MenuIcon sx={{ color: "var(--text-color)" }} />
      </IconButton>
    </div>
  )
}

const DrawerNav = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const linkIdx = pageData.findIndex((path) => location.pathname == path[2])
  return (
    <Drawer open={open} transitionDuration={1000} onClose={() => { setOpen(false); }}>
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
              <CloseIcon style={{ fontSize: "2em" }} onClick={() => { setOpen(false); }} />
            </ListItem>
            <ListItem>

              <div className="__name-logo" style={{color: "black"}}>Coding Club</div>

            </ListItem>
            <Divider />
            {pageData.map((page, index) => (

              <ListItem key={page[0] as string} disablePadding sx={{ backgroundColor: linkIdx == index ? "black" : "", color: linkIdx == index ? "white" : "" }}>
                <ListItemButton onClick={() => { setOpen(false); navigate(page[2] as string) }} >
                  <ListItemIcon sx={{ color: linkIdx == index ? "white" : "" }}>
                    {page[1] as string}
                  </ListItemIcon>
                  {/* {page[0]} */}
                  <ListItemText primary={page[0] as string} sx={{ fontSize: "5em" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Box>
      </motion.div>
    </Drawer>
  )
}
interface Time {
  time: number;
}
const Navbar :React.FC<Time>= ({time=2.5}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const linkIdx = pageData.findIndex((path) => location.pathname == path[2])
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
          transition={{ duration: 0.5, ease: "easeOut", delay: time }}
        >
          <MenuButton setOpen={setDrawerOpen} />
          <div className="__name-logo">Coding Club</div>
          {
            <div className={"__nav-buttons " + style.nav} >
              {pageData.map((page, index) => (
                (index == linkIdx) ? <NavButtonActive>{page[0]}</NavButtonActive> :
                  <NavButton onClick={() => navigate(page[2] as string)}>{page[0]}</NavButton>
              ))}
            </div>

          }
        </motion.div>
      </NavBox>

      <DrawerNav open={drawerOpen} setOpen={setDrawerOpen} />
    </div>
  );
};

export default Navbar;
