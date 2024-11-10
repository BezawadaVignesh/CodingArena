import { RouteObject } from "react-router-dom";
import { TransitionOverlay } from "../../components/transition";
import AboutDevs from "./AboutDev/AboutDevs";
import ClubHome from "./ClubHome";
import DotCursor from "./DotCursor/DotCursor";

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
];
export default routes;
