import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";

interface Contest {
  id: number;
  platform: string;
  title: string;
  subTitle: string;
  date: string;
  duration: string;
}
const data: Contest[] = [
  {
    id: 1,
    platform: "leetcode",
    title: "weekly 997",
    subTitle: "blaaaa",
    date: "12-02-2002",
    duration: "1:30",
  },
  {
    id: 2,
    platform: "codechef",
    title: "starter 997",
    subTitle: "blaaaa",
    date: "12-03-2002",
    duration: "2 hr",
  },
  {
    id: 3,
    platform: "codechef",
    title: "starter 997",
    subTitle: "blaaaa",
    date: "12-03-2002",
    duration: "2 hr",
  },
  {
    id: 4,
    platform: "codechef",
    title: "starter 997",
    subTitle: "blaaaa",
    date: "12-03-2002",
    duration: "2 hr",
  },
];

const Announcement: React.FC<Contest> = ({
  id,
  platform,
  title,
  subTitle,
  date,
  duration,
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
    >
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
            {subTitle}
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
            {/* <LocationOnIcon color="primary" fontSize="small" /> */}
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {platform}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1} mb={1}>
            <CalendarTodayIcon color="primary" fontSize="small" />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {duration}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
const ContestAnounce: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>(data);
  
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`/api/cp/contests`, {
        withCredentials: true,
      });
      
      console.log(data);
      setContests(data);

    })();
  }, []);
  return (
    <div style={{ marginTop: 49 }}>
      <Navbar time={1} />
      <Box p={3} sx={{ margin: "auto", maxWidth: 1200, marginTop: "49px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          upcoming contests
        </Typography>
        {contests.map((contest, index) => (
          <Announcement key={index} {...contest} />
        ))}
        {/* <Divider sx={{ my: 4 }} /> */}
      </Box>
    </div>
  );
};

export default ContestAnounce;
