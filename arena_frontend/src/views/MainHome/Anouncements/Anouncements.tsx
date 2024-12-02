import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Box, CircularProgress } from "@mui/material";
import Axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import { AlertContext } from "../../../components/common/AlertProvider";
import { StyledTab, StyledTabs } from "../../AdminCodeRunner";
import AnnouncementCard from "./AnouncementsCard";

interface Contest {
  id: number;
  platform: string;
  link: string;
  title: string;
  subTitle: string;
  date: string;
  duration: string;
  location?: string;
}

const Announcements = () => {
  const presentEvents: Contest[] = [
    {
      id: 1,
      link: "/codeSprint1.0.jpeg",
      title: "codeSprint1.0",
      subTitle: "A great event to attend",
      date: "June 19, 2024",
      location: "Geethanjali College of Eng and Tech ,cheeryal",
      duration: "1hr",
      platform: "event",
    },
    {
      id: 2,
      link: "/codeSprint2.0.jpg",
      title: "codeSprint2.0",
      subTitle: "Learn and explore",
      date: " Aug 1 2023",
      duration: "1hr",
      location: "Geethanjali College of Eng and Tech ,cheeryal",
      platform: "event",
    },
  ];
  const data: Contest[] = [
    {
      id: 1,
      link: "START162",
      platform: "leetcode",
      title: "weekly 997",
      subTitle: "blaaaa",
      date: "12-02-2002",
      duration: "1:30",
    },
    {
      id: 2,
      platform: "codechef",
      link: "START162",
      title: "starter 997",
      subTitle: "blaaaa",
      date: "12-03-2002",
      duration: "2 hr",
    },
    {
      id: 3,
      platform: "codechef",
      title: "starter 997",
      link: "START162",
      subTitle: "blaaaa",
      date: "12-03-2002",
      duration: "2 hr",
    },
    {
      id: 4,
      platform: "codechef",
      link: "START162",
      title: "starter 997",
      subTitle: "blaaaa",
      date: "12-03-2002",
      duration: "2 hr",
    },
  ];
  const [tab, setTab] = useState(1);
  const [contests, setContests] = useState<Contest[]>(data);
  const [loading, setLoading] = useState(true);
  const alert = useContext(AlertContext);
  const externalContests = useRef<Contest[]>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (tab == 2) {
        if (externalContests.current) {
          setContests(externalContests.current);
          setLoading(false);
          return;
        }
        try {
          const { data } = await Axios.get(`/api/cp/contests`, {
            withCredentials: true,
          });
          externalContests.current = data;
        } catch (e) {
          alert?.showAlert("Couldn't load data please try later", "error");
        } finally {
          setContests(externalContests.current || []);
          setLoading(false);
        }
      } else {
        setContests(presentEvents);
        setLoading(false);
      }
    })();
  }, [tab]);

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <NotificationsNoneIcon className="bell-icon" />
        <h1>Announcements</h1>
        <Box
          sx={{
            // width: "80%",
            borderBottom: 1,

            margin: "0 auto",
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
            <StyledTab label="Internal" value={1} />
            <StyledTab label="External" value={2} />
          </StyledTabs>
        </Box>
        <p className="subtitle">Stay updated with the latest news and events</p>
      </div>

      <div className="announcements-grid">
        {loading && (
          <Box sx={{ width: "100%", height: "10vh", position: "relative" }}>
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                position: "absolute",
              }}
            >
              <CircularProgress />
            </div>
          </Box>
        )}
        {!loading &&
          contests.map((contest, index) => {
            const { date, link, ...data } = contest;
            return (
              <AnnouncementCard
                time={dayjs(date).format("hh:MM A")}
                date={dayjs(date).format("DD/MM/YYYY")}
                category={contest.platform}
                key={index}
                link={
                  contest.platform == "leetcode"
                    ? "https://leetcode.com/contest/" + contest.link
                    : contest.platform == "codechef"
                    ? "https://www.codechef.com/" + contest.link
                    : contest.platform == "codeforces"
                    ? contest.link
                    : contest.link
                }
                {...data}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Announcements;
