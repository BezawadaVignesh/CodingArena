import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, styled, Typography, Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom style={{ transitionDelay: '300ms' }} ref={ref} {...props} />;
});

const MyTypograpghy = styled(Typography)(({ }) => ({
  fontFamily: "Poppins"
}));

const ProjectInfo = (
  {
    title,
    desc,
    img,
    open,
    setOpen
  }:
    {
      title: string;
      desc: string;
      img: string;
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
) => {
  return (
    <>
      <Dialog
        onClose={() => { setOpen(false) }}
        TransitionComponent={Transition}
        open={open}
        disableEscapeKeyDown={true}
        sx={{}}
      >
        <div style={{textAlign: 'right', paddingRight: 10, paddingTop: 10}}><CloseIcon onClick={()=>setOpen(false)} /></div>
        <div style={{display: "flex", flexDirection: "column", rowGap: 15, justifyContent: "center", alignItems: "center", marginBottom: 20, padding: 10}} >
          <DialogTitle>
            <MyTypograpghy sx={{fontWeight: 700, fontSize: 30, textAlign: "center"}} >{title}</MyTypograpghy>
          </DialogTitle>
          <img src={img} alt={title} width={500} height={500}
            style={{
              maxWidth: "100%",
              height: "auto",
            }} />
          <DialogContent>
            <MyTypograpghy>
              {desc}
            </MyTypograpghy>
          </DialogContent>
          {/* <DialogActions>
          <Button variant="contained" color="info" onClick={() => { action(false); setOpen(false); }}>No</Button>
          <Button variant="contained" color="error" onClick={() => { action(true); setOpen(false); }}>
            Yes
          </Button>
        </DialogActions> */}
        </div>
      </Dialog>
    </>
  )
}

export default ProjectInfo;