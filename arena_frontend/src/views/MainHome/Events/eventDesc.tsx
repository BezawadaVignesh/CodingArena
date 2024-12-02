import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FacebookIcon from "@mui/icons-material/Facebook";
import GroupIcon from "@mui/icons-material/Group";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  Card,
  Dialog,
  Divider,
  Fade,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
// import Markdown from 'markdown-to-jsx';
import { TransitionProps } from "@mui/material/transitions";
import React, { FormEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AlertContext } from "../../../components/common/AlertProvider";
import Markdown from "../../../components/common/Markdown";
import Navbar from "../../../components/Navbar/Navbar";
import events from "./eventdata";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom style={{ transitionDelay: "300ms" }} ref={ref} {...props} />;
});

const MyTextField = styled(TextField)(({}) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black", // Change border color on focus
      borderWidth: "2px", // Optionally, make it bolder
    },
  },
}));

const WarnFill = () => {
  return (
    <div style={{ fontSize: 13, color: "#ba191a" }}>Please fill this Field</div>
  );
};

const ContactForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState(["", false]);
  const [email, setEmail] = useState(["", false]);
  const [phn, setPhn] = useState(["", false]);
  const [msg, setMsg] = useState(["", false]);
  const alert = useContext(AlertContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name[0] === "") {
      setName(["", true]);
    }
    if (email[0] === "") {
      setEmail(["", true]);
    }
    if (msg[0] === "") {
      setMsg(["", true]);
    }
    if (name[0] !== "" && email[0] !== "" && msg[0] !== "") {
      alert?.showAlert("Thank you", "success");
    }
  };

  return (
    <>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        TransitionComponent={Transition}
        open={open}
        disableEscapeKeyDown={true}
        sx={{}}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            textAlign: "left",
            width:"500px",
            padding: "25px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                
                rowGap: 25,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 1 }}
              >
                Name
                <MyTextField
                  sx={{}}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setName([e.target.value, false]);
                  }}
                />
                {name[1] && <WarnFill />}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 1 }}
              >
                Email
                <MyTextField
                  type="email"
                  sx={{}}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setEmail([e.target.value, false]);
                  }}
                />
                {email[1] && <WarnFill />}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 1 }}
              >
                Phone Number (Optional)
                <MyTextField
                  sx={{}}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(e) => {
                    setPhn([e.target.value, false]);
                  }}
                />
                {phn[1] && <WarnFill />}
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", rowGap: 1 }}
              >
                Query
                <MyTextField
                  sx={{}}
                  id="outlined-basic"
                  variant="outlined"
                  multiline
                  onChange={(e) => {
                    setMsg([e.target.value, false]);
                  }}
                  placeholder="Type your Message..."
                />
                {msg[1] && <WarnFill />}
              </div>
              <Button
                variant="contained"
                sx={{
                  width: 120,
                  height: 40,
                  borderRadius: 5,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = id ? Number(id) : NaN;
  const event = events[eventId];
  
  const [showContactForm, setShowContactForm] = useState(false); 


  const handleContactButtonClick = () => {
    setShowContactForm((prev) => !prev);
  };

  // Event details in Markdown format
  const eventDetails = `
  ## Event Details
  **Description:** This event is a unique opportunity to connect with industry experts, learn new skills, and participate in exciting challenges.

  ### Schedule
  - **Date:** January 15, 2025
  - **Time:** 10:00 AM to 5:00 PM

  ### Location
  - **Venue:** Online (Zoom link will be provided after registration)

  ### Participation
  - Open to all Engineering Students, Freshers, and Undergraduates.

  ### Activities
  - Workshops
  - Coding Competitions
  - Networking Sessions

  **Don't miss this opportunity to enhance your skills and expand your network!**
  `;
  const eventUrl = window.location.href;
  const whatsappShareUrl = `whatsapp://send?text=${encodeURIComponent(
    eventDetails
  )}%20${eventUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    eventDetails
  )}&url=${encodeURIComponent(eventUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    eventUrl
  )}&title=Event%20Title&summary=${encodeURIComponent(eventDetails)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    eventUrl
  )}`;
  const locationUrl =
    "https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA";
  return (
    <div style={{ marginTop: 49 }}>
      <Navbar time={1} />
      <Box p={3} sx={{ maxWidth: 1200, margin: "auto", marginTop: "60px" }}>
        <Fade in timeout={1100}>
          <Card
            elevation={3}
            sx={{ p: 3, mb: 2 }}
            variant="outlined"
            style={{
              borderRadius: "0.5rem",
              boxShadow:
                " 0 4px 6px -1px rgba(0, 0, 0, 0.1) ,0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src={event.imageUrl}
                  alt="Event"
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {event.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {event.subline}
                </Typography>
                {/* <a href="whatsapp://send?text=Hello%2C%20World!">Send Message</a>
                <a href="https://api.whatsapp.com/send">Send Message</a> */}
                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="primary" />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                      onClick={() => window.open(locationUrl, "_blank")}
                    >
                      {event.location}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon color="primary" />
                    {/* <Typography variant="body2" color="textSecondary">
                      Updated On:
                      </Typography> */}
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      {event.time + " " + event.date}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <GroupIcon sx={{ color: "primary.main" }} />
                    <Typography variant="body2" color="textSecondary">
                      Team Size:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      {event.teamSize}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
                    <IconButton
                      component="a"
                      href={whatsappShareUrl}
                      target="_blank"
                      color="success"
                      aria-label="Share on WhatsApp"
                    >
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={twitterShareUrl}
                      target="_blank"
                      color="primary"
                      aria-label="Share on Twitter"
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={linkedinShareUrl}
                      target="_blank"
                      color="primary"
                      aria-label="Share on LinkedIn"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href={facebookShareUrl}
                      target="_blank"
                      color="primary"
                      aria-label="Share on Facebook"
                    >
                      <FacebookIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Fade>

        <Fade in timeout={1200}>
          <Card
            elevation={3}
            sx={{ p: 3, mb: 3 }}
            style={{
              borderRadius: "0.5rem",
              boxShadow:
                " 0 4px 6px -1px rgba(0, 0, 0, 0.1) ,0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" color="primary">
                  Registration fee: ${event.registrationFee}
                </Typography>
                <Button variant="contained" color="success" sx={{ mt: 1 }}>
                  Register Now
                </Button>
                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" fontWeight="bold">
                  Eligibility
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.eligibility}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4} gap={2}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CalendarTodayIcon color="primary" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="body2" color="textSecondary">
                      Registration Start Date:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {event.registrationStart}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <CalendarTodayIcon color="primary" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="body2" color="textSecondary">
                      Registration Deadline:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {event.registrationDeadline}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <GroupIcon color="primary" />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Typography variant="body2" color="textSecondary">
                      Registered Students:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="bold"
                    >
                      {event.registeredStudents}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Fade>
        <Fade in timeout={1400}>
          <Card
            style={{
              padding: "20px",
              fontFamily: "Roboto, Helvetica Neue, sans-serif",
              flexGrow: "1",
              overflowY: "auto",
              borderRadius: "0.5rem",
              boxShadow:
                " 0 4px 6px -1px rgba(0, 0, 0, 0.1) ,0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            sx={{ mb: 3 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Details
            </Typography>
            <Divider
              sx={{ my: 1, backgroundColor: "primary.main", height: "2px" }}
            />
            <Markdown children={event.description} />
          </Card>
        </Fade>
        <Card
          style={{
            padding: "20px",
            borderRadius: "0.5rem",
            boxShadow:
              " 0 4px 6px -1px rgba(0, 0, 0, 0.1) ,0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Hosted By
          </Typography>
          <Divider
            sx={{ my: 1, backgroundColor: "primary.main", height: "2px" }}
          />
          <Typography variant="h6" fontWeight="400w" sx={{ marginTop: 2 }}>
            {event.hostedBy}
          </Typography>
          {event.hostNames.map((name, index) => (
            <Typography key={index} variant="body1" sx={{ marginTop: 1 }}>
              {name}
            </Typography>
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, display: "flex", alignItems: "center" }}
            onClick={handleContactButtonClick}
            startIcon={<ContactMailIcon />} // Icon is placed at the start
          >
            Contact with Organizers
          </Button>
          {showContactForm && (
            <div style={{ margin: "auto", width: "80%" }}>
              <div
                style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
              >
                <ContactForm
                  open={showContactForm}
                  setOpen={setShowContactForm}
                />
              </div>
            </div>
          )}
        </Card>
      </Box>
    </div>
  );
};

export default EventPage;
