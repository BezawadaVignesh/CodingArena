import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { TransitionOverlay } from "../../components/transition";
import ClubName from "./ClubName/ClubName";
import useDarkModeOnScroll from "./common/DarkElements";
import DotCursor from "./DotCursor/DotCursor";
import Footer from "./Footer/Footer";
import "./main.css";
import Objective from "./Objective/Objective";
import PastEvents from "./PastEvents/PastEvents";
import "./styles.css";
import GlowingCards from "./VisionMission/GlowingCards";

const ClubHome = () => {
  const [hovered, setHovered] = useState(false);

  const darkElementsRefs = useDarkModeOnScroll(2);

  return (
    <TransitionOverlay>
      <>
        <Navbar time={0} />
        <DotCursor expand={hovered} />
        <ClubName setHovered={setHovered} />
        <div ref={darkElementsRefs.current[0]}>
          <Objective />
          <GlowingCards />
        </div>

        <div ref={darkElementsRefs.current[1]}>
          <PastEvents />
        </div>

        {/* <div ref={darkElement}> */}

        {/* <CodeScrollAnimation codeLines={sampleCode} containerStyle={{ backgroundColor: "#1e1e1e", height: "1500px" }}
        lineStyle={{ fontSize: "1.1rem", color: "#00ff00" }} /> */}
        {/* </div> */}
        <Footer />
      </>
    </TransitionOverlay>
  );
};

export default ClubHome;
