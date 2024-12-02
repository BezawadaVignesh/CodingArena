import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { StyledTab, StyledTabs } from "../../AdminCodeRunner";

interface Event {
  id: number;
  image?: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  isPresent: boolean;
}
const EventCard: React.FC<Event> = ({
  id:_id,
  image,
  title,
  subtitle,
  date,
  location,
  isPresent,
}) => {
 
  return (
    <Card
      sx={{
        display: "flex",
        padding: "20px",
        mb: 2,
        borderRadius: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
      // onClick={() => navigate(`/home/event/${id}`)}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: { xs: "100%", sm: 300 },
          height: { xs: 140, sm: "auto" },
          borderRadius: 2,
          objectFit: "cover",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "300w" }}
            >
              {subtitle}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1} mb={1}>
              <CalendarTodayIcon color="primary" fontSize="small" />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOnIcon color="primary" fontSize="small" />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {location}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        {isPresent && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                alignSelf: "flex-end",
                mt: { xs: 2, sm: 0 }, // Adjust top margin for small screens
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
};
const EventsPage: React.FC = () => {

  const pastEvents = [
    {
      id: 3,
      image: "/codecreate.png",
      title: "Code Create Connect",
      subtitle: "Code Create Connect, organized by GCET_Coding_Club on December 1st, saw 200+ participants. Led by Sowjanya (CSE, Final Year), the session covered DSA, career tips, LinkedIn/X profile building, and global tech opportunities, with support from Principal Dr. Udaya Kumar Susarla and faculty coordinators.",
      date: "December 1st 2023",
      location: "Geethanjali College of Engineering and Technology,Cheeryal",
      isPresent: false,
    },
    {
      id: 5,
      image: "/codeSprint1.0.jpeg",
      title: "Code Sprint 1.0",
      subtitle: "Code Sprint 1.0, organized by GCET_Coding_Club in July-August 2023, featured two rounds with 300+ participants. The first online round, held on July 20, 2023, included 30 MCQs, and 80 students with scores above 60% advanced to the second offline round on August 1, 2023, at GCET’s Block-V labs.",
      date: "Aug 1st, 2023",
      location: "Geethanjali College of Engineering and Technology,Cheeryal",
      isPresent: false,
    },
    {
      id: 4,
      image: "/codeSprint2.0.jpg",
      title: "Code Sprint 2.0",
      subtitle: "CODE SPRINT 2.0 was a two-round coding contest held at GCET, with an online round on June 19, 2024, and a final offline round on June 21, 2024. Hosted on the Smart Interviews platform, it featured diverse problem sets and offered cash prizes for top performers.",
      date: " June 19, 2024",
      location: "Geethanjali College of Engineering and Technology,Cheeryal",
      isPresent: false,
    },
  ];
  const [tab, setTab] = useState(1);
  // const [loading,setLoading] = useState(true);
  
  return (
    <div style={{ "padding": "1rem",
      "maxWidth": "1000px",
      "margin":" 0 auto",}}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "800", mb: 2, textAlign: "center" }}
        >
          Events
        </Typography>
      <Box
          sx={{
            // width: "80%",
            borderBottom: 1,
            
            // margin: "100px auto",
            borderColor: "divider",
            // marginLeft:"120px"
          }}
        >
          <StyledTabs
            onChange={(_e, t) => setTab(t)}
            aria-label="Problem and submissions lables"
            value={tab}
            variant="fullWidth"
          >
            <StyledTab label="Ongoing" value={1} />
            <StyledTab label="Past Events" value={2} />
          </StyledTabs>
        </Box>

      {
      tab===1 &&<Box p={3} sx={{ margin: "auto", display:"grid",placeItems:"center",maxWidth: 1200,}}>
        {
        // presentEvents.map((event, index) => (
        //   <EventCard key={index} {...event} />
        // ))
        }
        <p>No Events</p>
        {/* <Divider sx={{ my: 4 }} /> */}
      </Box>
      }
      {tab===2 &&<Box p={3} sx={{ margin: "auto", maxWidth: 1200 }}>
        
        {pastEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        {/* <Divider sx={{ my: 4 }} /> */}
      </Box>}
    </div>
  );
};

export default EventsPage;
