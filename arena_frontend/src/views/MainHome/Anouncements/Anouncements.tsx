import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AnnouncementCard from './AnouncementsCard';

const Announcements = () => {
  const announcements = [
    {
      title: "Hackathon 2024: Code for Change",
      date: "2024-03-15",
      time: "09:00 AM",
      description: "Join us for our biggest hackathon yet! 48 hours of coding, collaboration, and innovation. Amazing prizes await!",
      isNew: true,
      category: "event",
      link: "#",
      poster: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070",
      venue: "Innovation Hub, Building A",
      capacity: "200 participants",
      deadline: "March 10, 2024",
      organizer: "Tech Innovation Club",
      registrationSteps: [
        "Create an account on our event portal",
        "Fill out the registration form",
        "Submit your team details (2-4 members)",
        "Pay the registration fee ($20 per team)",
        "Receive confirmation email with further instructions"
      ],
      additionalDetails: "Prizes include $5000 for first place, internship opportunities, and mentorship programs. Food and refreshments will be provided throughout the event. Don't forget to bring your laptop and charger!"
    },
    {
      title: "New Web Development Workshop Series",
      date: "2024-03-20",
      time: "06:00 PM",
      description: "Learn modern web development with our comprehensive workshop series. From basics to advanced concepts.",
      isNew: true,
      category: "news",
      link: "#",
      poster: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070",
      venue: "Virtual (Zoom)",
      capacity: "100 participants",
      deadline: "March 18, 2024",
      organizer: "Web Dev Community",
      registrationSteps: [
        "Sign up for the workshop series on our portal",
        "Choose your preferred batch timing",
        "Complete the pre-workshop survey",
        "Join the Discord community"
      ],
      additionalDetails: "8-week intensive program covering HTML, CSS, JavaScript, React, and Node.js. Includes hands-on projects and 1-on-1 mentoring sessions."
    },
    {
      title: "Club Meeting Schedule Update",
      date: "2024-03-10",
      time: "04:30 PM",
      description: "Weekly meetings will now be held on Thursdays at 5 PM to accommodate more members.",
      category: "update",
      link: "#",
      poster: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070",
      venue: "Room 301, Student Center",
      organizer: "Club Management",
      additionalDetails: "This change will be effective from next week. The new schedule allows for longer sessions and more interactive activities."
    },
    {
      title: "Project Showcase: Spring 2024",
      date: "2024-04-01",
      time: "02:00 PM",
      description: "Present your projects to industry professionals and win mentorship opportunities!",
      category: "event",
      link: "#",
      poster: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070",
      venue: "Main Auditorium",
      capacity: "50 projects",
      deadline: "March 25, 2024",
      organizer: "Career Development Center",
      registrationSteps: [
        "Submit your project proposal",
        "Get approval from your faculty advisor",
        "Register your team members",
        "Schedule a demo slot",
        "Prepare your presentation materials"
      ],
      additionalDetails: "Top projects will receive funding opportunities and direct internship offers from our industry partners. Each team will get 15 minutes for presentation and 5 minutes for Q&A."
    },
  ] as const;

  return (
    <div className="announcements-container">
      <div className="announcements-header">
        <NotificationsNoneIcon className="bell-icon" />
        <h1>Announcements</h1>
        <p className="subtitle">Stay updated with the latest news and events</p>
      </div>
      
      <div className="announcements-grid">
        {announcements.map((announcement, index) => (
          <AnnouncementCard key={index} {...announcement} />
        ))}
      </div>
    </div>
  );
};

export default Announcements;