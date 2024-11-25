import { RouteObject } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TransitionOverlay } from "../../components/transition";
import AboutDevs from "./AboutDev/AboutDevs";
import Announcements from "./Anouncements/Anouncements";
import ClubHome from "./ClubHome";
import ClubName from "./ClubName/ClubName";
import ContactUs from "./ContactUs/ContactUs";
import DotCursor from "./DotCursor/DotCursor";
import EventPage from "./Events/eventDesc";
import EventsPage from "./Events/events";
import Gallery from "./Gallery/gallery";
import GalleryList from "./Gallery/galleryList";
import Projects from "./OurProjects/Projects";
import OurTeam from "./OurTeam/OurTeam";

const routes: RouteObject[] = [
  {
    index: true,
    element: <ClubHome />,
  },
  {
    path: "about-dev",
    element: (
      <TransitionOverlay key={"About devs"} msg="About Devs">
        <div>
          <Navbar time={1} />
          <DotCursor />
          <AboutDevs />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "announcements",
    element: (
      <TransitionOverlay msg="Announcements">
        <div style={{ marginTop: '50px'}}>
          <Navbar time={1} />
          <DotCursor />
          <Announcements />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "our-team",
    element: (
      <TransitionOverlay key={"our-team"} msg="Our Team">
        <div>
          <Navbar time={2.5} />
          <DotCursor />
          <ClubName setHovered={() => {}} />
          <OurTeam />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "gallery",
    element: (
      <TransitionOverlay key={"gallery"}  msg="Gallery">
        <div>
          <DotCursor />
          <GalleryList />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "projects",
    element: (
      <TransitionOverlay key={"our-projects"} msg="Our Projects">
        <div>
          <Navbar time={2.5} />
          <DotCursor />
          <ClubName setHovered={() => {}} />
          <Projects />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "gallery/:id",
    element: (
      // <TransitionOverlay key={"Gallery"} msg="gallery">
        <div>
          <DotCursor />
          <Gallery />
        </div>
      // </TransitionOverlay>
    ),
  },
  {
    path: "contact-us",
    element: (
      <TransitionOverlay key={"contact-us"} msg="Contact Us">
        <div>
          <Navbar time={1}  />
          <DotCursor />
          {/* <ClubName setHovered={()=>{}} /> */}
          <ContactUs />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "events",
    element: (
      <TransitionOverlay msg="Events">
        <div>
        <DotCursor />
          <EventsPage />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "event/:id",
    element: (
      <TransitionOverlay msg="Event">
        <div>
        <DotCursor />
          <EventPage />
        </div>
      </TransitionOverlay>
    ),
  },
];
export default routes;
