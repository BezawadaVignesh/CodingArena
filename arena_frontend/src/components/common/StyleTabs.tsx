import styled from "@emotion/styled";
import { Tab, Tabs, darken } from "@mui/material";

//todo
export const StyledTabs = styled(Tabs)(({ theme }:any) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .MuiTabs-indicator": {
      backgroundColor: "#252525",
      height: "2px",
    },
  }));
  
  export const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    // minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: darken(theme.palette.text.primary, 0),
      fontWeight: theme.typography.fontWeightBold,
    },
    "&.Mui-focusVisible": {
      backgroundColor: theme.palette.primary.light,
    },
  }));