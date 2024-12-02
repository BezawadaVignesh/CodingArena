import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Members from "../../../components/common/MemberData";
import useWindowDimensions from "./GetDimensions";



const projects: { [key: string]: any; } = {
  "ExamBranchPortal": [
    {
      name: "Exam Branch Portal",
      desc: "The Exam Branch Portal is a web application designed to streamline the management of exam-related processes. This application serves as an efficient platform for registering students for supplementary exams, revaluation exams, and written test exam fee payments.",
      vid: "/exambranch.mp4",
    },
    {
      name: "Login Screen",
      vid: "/ebpro.jpg",
      desc: "This is the login page for the application, designed with a simple and clean interface.",
    },
    {
      name: "Supplementary Exam Fee Calculation",
      vid: "/eb3.png",
      desc: "User calculates fees for supplementary exams with fields for base cost, additional cost, and maximum cost. Users can search for a student’s record using their roll number. A search button retrieves and displays the required details.",
    },
    {
      name: "Manage Database",
      vid: "/eb1.png",
      desc: "This screen shows a student database where records can be searched using a roll number. It displays details like subject code, grade, semester, and payment status. ",
    },
  ],
  "CodingArena": [
    {

      name: "Coding Arena",
      desc: "An interactive coding platform tailored for hands-on learning and real-time problem-solving. The Coding Arena empowers students to practice coding, participate in contests, and collaborate on challenges. Built with a focus on data structures and algorithms, this platform is ideal for honing technical skills and fostering a competitive coding culture.",
      vid: "/codingarena.mp4",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
  ],
  "TLPFeedbackApplication": [
    {
      name: "TLP Feedback Application",
      desc: "A feedback tool that bridges the gap between students and faculty, aiming to improve teaching quality and learning outcomes. Through structured feedback, students can share their learning experiences for each course. Faculty members receive scores and insights to enhance their teaching approach, helping improve the overall academic experience.",
      vid: "/tlp.mp4",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
    {
      vid: "/pro.png",
      desc: "Some Matter",
    },
  ],
}


const developersData: { [key: string]: any; } = {

  "ExamBranchPortal": [
    {
      name: "B. Vignesh",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05f8@gcet.edu.in",
      img: "/Vignesh2.png",
      github: "https://github.com/BezawadaVignesh",
    },
    {
      name: "R. Harinath Reddy",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05k0@gcet.edu.in",
      img: "/harinath.jpg",
      github: "https://github.com/HarinathReddyR",
    },
    {
      name: "T. Jagadeesh Chandra",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05l0@gcet.edu.in",
      img: "/jaggu.jpg",
      github: "https://github.com/Jagadeesh-1314",
    },
    {
      name: "P. Sahith",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "",
      img: "/sahith.jpg",
      github: "https://github.com/SahithPoreddy",
    },
    {
      name: "Y. Rahul",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "https://www.linkedin.com/in/rahul-bablu-a718b9273",
      mail: "21r11a05l4@gcet.edu.in",
      img: "/rahul.jpg",
      github: "https://github.com/rahul-bablu",
    },
  ],
  "CodingArena": [
    {
      name: "B. Vignesh",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05f8@gcet.edu.in",
      img: "/Vignesh2.png",
      github: "https://github.com/BezawadaVignesh",
    },
    {
      name: "R. Harinath Reddy",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05k0@gcet.edu.in",
      img: "/harinath.jpg",
      github: "https://github.com/HarinathReddyR",
    },
    {
      name: "T. Jagadeesh Chandra",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05l0@gcet.edu.in",
      img: "/jaggu.jpg",
      github: "https://github.com/Jagadeesh-1314",
    },
    {
      name: "Y. Rahul",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "https://www.linkedin.com/in/rahul-bablu-a718b9273",
      mail: "21r11a05l4@gcet.edu.in",
      img: "/rahul.jpg",
      github: "https://github.com/rahul-bablu",
    },
  ],
  "TLPFeedbackApplication": [
    {
      name: "T. Jagadeesh Chandra",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05l0@gcet.edu.in",
      img: "/jaggu.jpg",
      github: "https://github.com/Jagadeesh-1314",
    },
    {
      name: "B. Vignesh",
      // desig: "Coordinator",
      fbook: "",
      x: "",
      linkedIn: "",
      mail: "21r11a05f8@gcet.edu.in",
      img: "/Vignesh2.png",
      github: "https://github.com/BezawadaVignesh",
    },
  ]
}

const ProjectInfo = () => {
  const { width, height: _height } = useWindowDimensions();
  const rightRef = useRef<any>(null);
  const project = useParams().name as string;
  const data: any = projects[project];
  const developers: any = developersData[project];
  const [leftImage, setLeftImage] = useState(data[1].vid);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index: any = entry.target.getAttribute("data-index");
          setLeftImage(data[Number(index)].vid);
        }
      });
    }, observerOptions);
    const rightSection = rightRef.current;
    if (rightSection) {
      const headings = rightSection.querySelectorAll("h2");
      headings.forEach((heading: any) => observer.observe(heading));
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>

      <div style={{
        marginBlock: 110,
        fontFamily: "Poppins",
        marginInline: "5% 5%",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
          gap: 10
        }}>
          <h1>
            {data[0].name}
          </h1>
          <div style={{ paddingInline: 25 }}>
            {data[0].desc}
          </div>
        </div>
        <div>

        </div>
        <div style={{ width: "100%", height: "auto", paddingInline: 25, marginBottom: 20, display: "grid", placeItems: "center" }}>
          <video src={data[0].vid} autoPlay loop muted style={{ width: "100%", height: "auto" }} >
          </video>
        </div>
        <div className="main" style={{ position: "relative", width: "100%", display: "flex", }}>
          {
            width > 850 ?
              <>
                {/* Left Component (Sticky) */}
                <div
                  className="left"
                  style={{
                    position: "sticky",
                    width: "45%",
                    top: "55px",
                    height: "calc(100vh - 55px)",
                    display: "inline-block",
                    paddingInline: 25
                  }}
                >
                  <div
                    style={{ display: "grid", placeContent: "center", height: "100%" }}
                  >
                    <div>
                      <motion.img
                        src={leftImage}
                        style={{ width: "100%", borderRadius: "8px", maxHeight: 500 }}
                        key={leftImage} // Key update triggers re-animation
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }} />
                    </div>
                  </div>
                </div><div
                  className="right"
                  ref={rightRef}
                  style={{
                    display: "inline-block",
                    width: "55%",
                    // backgroundColor: "white",
                    color: "black",
                    paddingInline: "10%",
                    paddingBlock: '100px'
                  }}
                >
                  {data.map((matter: any, index: number) => (
                    (index !== 0) ?
                      <div
                        key={index}
                        style={{
                          minHeight: "calc(90vh - 60px)",
                          display: "grid",
                          placeContent: "center"
                        }}
                      >
                        <h2 data-index={index} style={{ fontSize: "2em" }}>
                          {matter.name}
                        </h2>
                        <p>{matter.desc}</p>
                      </div> : <></>
                  ))}
                </div>
              </> :
              <>
                <div>
                  {
                    data.map((matter: any, index: number) => (
                      (index !== 0) ?
                        <div style={{ display: "grid", placeItems: "center", paddingInline: 25, marginBottom: 20 }}>
                          <h2>{matter.name}</h2>
                          <p>{matter.desc}</p>
                          <img src={matter.vid} alt="Project Image" style={{ width: "100%", height: "auto", }} />
                        </div> :
                        <></>
                    ))
                  }
                </div>
              </>
          }

        </div>

        <div style={{ padding: 0 }}>
          <div style={{ display: "flex", justifyContent: "center", fontSize: "2em", fontWeight: "bold", paddingInline: 20, marginBlock: 40 }}>Developers</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {
              developers.map((dev: any, _idx: any) => {
                return (
                  <Members data={dev} />
                )
              })
            }
          </div>
          <div style={{ display: "flex", justifyContent: "center", fontSize: "2em", fontWeight: "bold", paddingInline: 20, marginBlock: 50 }}>Maintainance</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-evenly" }}>
            {
              developers.map((dev: any, _idx: number) => {
                return (
                  <Members data={dev} />
                )
              })
            }
          </div>


        </div>
      </div>
    </>
  )
}

export default ProjectInfo;