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
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

interface Event {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  isPresent: boolean;
}
const EventCard: React.FC<Event> = ({
  id,
  image,
  title,
  subtitle,
  date,
  location,
  isPresent,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: "flex",
        padding: "20px",
        mb: 2,
        borderRadius: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
      onClick={() => navigate(`/home/event/${id}`)}
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
  const presentEvents = [
    {
      id: 1,
      image: "/codeSprint1.0.jpeg",
      title: "Present Event 1",
      subtitle: "A great event to attend",
      date: "Dec 15, 2024",
      location: "New York",
      isPresent: true,
    },
    {
      id: 2,
      image: "/codeSprint1.0.jpeg",
      title: "Present Event 2",
      subtitle: "Learn and explore",
      date: "Dec 18, 2024",
      location: "Chicago",
      isPresent: true,
    },
  ];

  const pastEvents = [
    {
      id: 3,
      image: "/codeSprint1.0.jpeg",
      title: "Past Event 1",
      subtitle: "A memorable event",
      date: "Oct 10, 2024",
      location: "San Francisco",
      isPresent: false,
    },
    {
      id: 4,
      image: "/codeSprint1.0.jpeg",
      title: "Past Event 2",
      subtitle: "Insightful discussions",
      date: "Nov 12, 2024",
      location: "Los Angeles",
      isPresent: false,
    },
  ];
  return (
    <>
      <Navbar time={1} />
      <Box p={3} sx={{ margin: "auto", maxWidth: 1200, marginTop: "49px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          Present Events
        </Typography>
        {presentEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        {/* <Divider sx={{ my: 4 }} /> */}
      </Box>
      <Box p={3} sx={{ margin: "auto", maxWidth: 1200 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          Past Events
        </Typography>
        {pastEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        {/* <Divider sx={{ my: 4 }} /> */}
      </Box>
    </>
  );
};

export default EventsPage;
