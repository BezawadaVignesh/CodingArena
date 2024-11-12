import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { TransitionOverlay } from "../../components/transition";
// import Announcements from "./Anouncements/Announcements";
import ClubName from "./ClubName/ClubName";
import useDarkModeOnScroll from "./common/DarkElements";
import DotCursor from "./DotCursor/DotCursor";
import "./main.css";
import Objective from "./Objective/Objective";
import PastEvents from "./PastEvents/PastEvents";
import "./styles.css";
import GlowingCards from "./VisionMission/GlowingCards";

const shapeTypes = ["circle", "square", "triangle"]; // Define possible shapes

function Component() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div  > {JSON.stringify(scrollYProgress)} </motion.div>  
  )
}

const sampleCode = [
  "#include <stdio.h>",
  "",
  "int main() {",
  "    // Code to display end page",
  '    printf("Display end page!\\n");',
  "    return 0;",
  "}",
];
const sampleCode2 = [
"  hp1,  dap hp2",
"  count i ma1, hp2",
"  law hp3    / next step",
"  dac i ml1",
"  law 7",
"  dac i mb1",
"  random ",
"  scr 9s",
"  sir 9s",
"  xct hr1",
"  add i mx1",
"  dac i mx1",
"  swap",
"  add i my1",
"  dac i my1",
"  random",
"  scr 9s",
"  sir 9s",
"  xct hr2",
"  dac i mdy",
"  dio i mdx",
"  setup .hpt,3",
"  lac ran",
"  dac i mth",
"hp4,  lac i mth",
"  sma",
"  sub (311040",
"  spa",
"  add (311040",
"  dac i mth",
"  count .hpt,hp4",
"  xct hd2",
"  dac i ma1",
"hp2,  jmp .",
]

const RandomShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createRandomShape = () => {
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const positionX = Math.random() * 100; // Random x position in percentage
    const positionY = Math.random() * 100; // Random y position in percentage

    const shape = document.createElement("div");
    shape.className = `shape ${shapeType}`;
    shape.style.left = `${positionX}%`;
    shape.style.top = `${positionY}%`;
    shape.style.animationDelay = `${Math.random() * 2}s`;

    return shape as Node;
    // return (
    //   <div
    //     key={Math.random()} // Ensure unique key for each shape
    //     className={`shape ${shapeType}`}
    //     style={{
    //       left: `${positionX}%`,
    //       top: `${positionY}%`,
    //       animationDelay: `${Math.random() * 2}s`,
    //     }}
    //   />
    // );
  };

  // Generate shapes when the component mounts
  useEffect(() => {
    const shapes = Array.from({ length: 10 }, createRandomShape); // Create 20 random shapes
    shapes.forEach((shape) => containerRef.current?.appendChild(shape));
  }, []);

  return (
    <div
      style={{ height: "100vh" }}
      className="shapes-container"
      ref={containerRef}
    >
      {}
    </div>
  );
};



const ClubHome = () => {
  const [hovered, setHovered] = useState(false);

  const darkElementsRefs = useDarkModeOnScroll(2);
  
  return (
    <TransitionOverlay>
      <>
        <Navbar time={0} />
        <DotCursor expand={hovered}/>
        <ClubName setHovered={setHovered} />
         <div ref={darkElementsRefs.current[0]}>
          <Objective />
          <GlowingCards />
        </div> 
         
        {/* <Announcements /> */}
         <div ref={darkElementsRefs.current[1]}>

        <PastEvents /> 
         </div>

        
        
        {/* <div ref={darkElement}> */}

        {/* <CodeScrollAnimation codeLines={sampleCode} containerStyle={{ backgroundColor: "#1e1e1e", height: "1500px" }}
        lineStyle={{ fontSize: "1.1rem", color: "#00ff00" }} /> */}
        {/* </div> */}
        {/* <Footer /> */}
      </>
    </TransitionOverlay>
  );
};

export default ClubHome;
