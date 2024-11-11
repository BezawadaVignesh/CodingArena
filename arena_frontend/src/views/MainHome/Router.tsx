import { RouteObject } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { TransitionOverlay } from "../../components/transition";
import AboutDevs from "./AboutDev/AboutDevs";
import ClubHome from "./ClubHome";
import ClubName from "./ClubName/ClubName";
import ContactUs from "./ContactUs/ContactUs";
import DotCursor from "./DotCursor/DotCursor";
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
      <TransitionOverlay msg="About Devs">
        <div>
          <DotCursor />
          <AboutDevs />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "our-team",
    element: (
      <TransitionOverlay key={"our-team"} msg="Our Team">
        <div>
          <Navbar />
          <DotCursor />
          <ClubName setHovered={()=>{}} />
          <OurTeam />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "projects",
    element: (
      <TransitionOverlay key={"our-projects"} msg="Our Projects">
        <div>
          <Navbar />
          <DotCursor />
          <ClubName setHovered={()=>{}} />
          <Projects />
        </div>
      </TransitionOverlay>
    ),
  },
  {
    path: "contact-us",
    element: (
      <TransitionOverlay key={"contact-us"} msg="Contact Us">
        <div>
          <Navbar />
          <DotCursor />
          {/* <ClubName setHovered={()=>{}} /> */}
          <ContactUs />
        </div>
      </TransitionOverlay>
    ),
  },
];
export default routes;
