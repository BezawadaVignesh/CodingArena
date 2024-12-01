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
  const announcements = [
    {
      title: "Hackathon 2024: Code for Change",
      date: "2024-03-15",
      time: "09:00 AM",
      description:
        "Join us for our biggest hackathon yet! 48 hours of coding, collaboration, and innovation. Amazing prizes await!",
      isNew: true,
      category: "event",
      link: "#",
      poster:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
      venue: "Innovation Hub, Building A",
      capacity: "200 participants",
      deadline: "March 10, 2024",
      organizer: "Tech Innovation Club",
      registrationSteps: [
        "Create an account on our event portal",
        "Fill out the registration form",
        "Submit your team details (2-4 members)",
        "Pay the registration fee ($20 per team)",
        "Receive confirmation email with further instructions",
      ],
      additionalDetails:
        "Prizes include $5000 for first place, internship opportunities, and mentorship programs. Food and refreshments will be provided throughout the event. Don't forget to bring your laptop and charger!",
    },
    {
      title: "New Web Development Workshop Series",
      date: "2024-03-20",
      time: "06:00 PM",
      description:
        "Learn modern web development with our comprehensive workshop series. From basics to advanced concepts.",
      isNew: true,
      category: "news",
      link: "#",
      poster:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070",
      venue: "Virtual (Zoom)",
      capacity: "100 participants",
      deadline: "March 18, 2024",
      organizer: "Web Dev Community",
      registrationSteps: [
        "Sign up for the workshop series on our portal",
        "Choose your preferred batch timing",
        "Complete the pre-workshop survey",
        "Join the Discord community",
      ],
      additionalDetails:
        "8-week intensive program covering HTML, CSS, JavaScript, React, and Node.js. Includes hands-on projects and 1-on-1 mentoring sessions.",
    },
    {
      title: "Club Meeting Schedule Update",
      date: "2024-03-10",
      time: "04:30 PM",
      description:
        "Weekly meetings will now be held on Thursdays at 5 PM to accommodate more members.",
      category: "update",
      link: "#",
      poster:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
      venue: "Room 301, Student Center",
      organizer: "Club Management",
      additionalDetails:
        "This change will be effective from next week. The new schedule allows for longer sessions and more interactive activities.",
    },
    {
      title: "Project Showcase: Spring 2024",
      date: "2024-04-01",
      time: "02:00 PM",
      description:
        "Present your projects to industry professionals and win mentorship opportunities!",
      category: "event",
      link: "#",
      poster:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070",
      venue: "Main Auditorium",
      capacity: "50 projects",
      deadline: "March 25, 2024",
      organizer: "Career Development Center",
      registrationSteps: [
        "Submit your project proposal",
        "Get approval from your faculty advisor",
        "Register your team members",
        "Schedule a demo slot",
        "Prepare your presentation materials",
      ],
      additionalDetails:
        "Top projects will receive funding opportunities and direct internship offers from our industry partners. Each team will get 15 minutes for presentation and 5 minutes for Q&A.",
    },
  ] as const;
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
            {/* <StyledTab
          label={
            <span style={{ position: "relative" }}>
              Details
              { (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-25px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "red",  // You can change the color
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",  // Adjust font size as needed
                    fontWeight: "bold",
                  }}
                >
                  2
                </span>
              )}
            </span>
          }
          value={3}
        /> */}
            {/* <StyledTab label="Advance" value={3} /> */}
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
