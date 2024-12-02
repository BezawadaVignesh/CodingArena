import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const movieData = [
  {
    title: "Code Create Connect",
    date: "December 1st 2023",
    noOfParticipants: 200,
    budget: 0,
    resoursePerson: ["D Soujanya",],
    description:
      "Code Create Connect, organized by GCET_Coding_Club on December 1st, saw 200+ participants. Led by Sowjanya (CSE, Final Year), the session covered DSA, career tips, LinkedIn/X profile building, and global tech opportunities, with support from Principal Dr. Udaya Kumar Susarla and faculty coordinators.",
    imageUrl:
      "/codecreate.png",

  },
  {
    title: "Code Sprint 1.0",
    date: " August 1st, 2023",
    noOfParticipants: 298,
    budget: 0,
    resoursePerson: ["Keerthi.M","Ramanjaneyulu"],
    description:
      "Code Sprint 1.0, organized by GCET_Coding_Club in July-August 2023, featured two rounds with 300+ participants. The first online round, held on July 20, 2023, included 30 MCQs, and 80 students with scores above 60% advanced to the second offline round on August 1, 2023, at GCET’s Block-V labs.",
    imageUrl:
      "/codeSprint1.0.jpeg",
  },
  {
    title: "Code Sprint 2.0",
    date: " June 19, 2024",
    noOfParticipants: 181,
    budget: 0,
    resoursePerson: ["Ramanjaneyulu","Keerthi.M"],
    description:
      "CODE SPRINT 2.0 was a two-round coding contest held at GCET, with an online round on June 19, 2024, and a final offline round on June 21, 2024. Hosted on the Smart Interviews platform, it featured diverse problem sets and offered cash prizes for top performers.",
    imageUrl:
      "/codeSprint2.0.jpg",
  },
];

const PastEvents = () => {
  const [leftImage, setLeftImage] = useState(movieData[0].imageUrl);
  const rightRef = useRef<any>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const movieIndex: any = entry.target.getAttribute("data-index");
          setLeftImage(movieData[movieIndex].imageUrl);
        }
      });
    }, observerOptions);

    const rightSection = rightRef.current;
    if (rightSection) {
      const headings = rightSection.querySelectorAll("h1");
      headings.forEach((heading: any) => observer.observe(heading));
    }

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ background: 'var(--bg-color)', color: 'var(--text-color)', position: 'relative' }}>
      <div className="__section-title"
      >
        Past Events
      </div>
      <div style={{ position: "relative", width: "100%", display: "flex", }}>
        {/* Left Component (Sticky) */}
        <div
          style={{
            position: "sticky",
            width: "45%",
            top: "55px",
            height: "calc(100vh - 55px)",
            display: "inline-block",
          }}
        >
          <div
            style={{ display: "grid", placeContent: "center", height: "100%" }}
          >
            <div
              style={{ width: "90%", maxHeight: "80%", borderRadius: "8px" }}
            >

              <motion.img
              style={{width: '100%', height: '100%'}}
                src={leftImage}
                key={leftImage} // Key update triggers re-animation
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Component */}
        <div
          ref={rightRef}
          style={{
            display: "inline-block",
            width: "55%",
            backgroundColor: "#050d1a",
            color: "white",
            paddingInline: "10%",
            paddingBlock: '100px'
          }}
        >
          {movieData.map((movie, index) => (
            <div
              key={index}
              style={{
                minHeight: "calc(90vh - 55px)",
                paddingBottom: "100px",
                fontSize: "1rem",
              }}
            >
              <h1 data-index={index} style={{ fontSize: "2em" }}>
                {movie.title}
              </h1>
              <p style={{ fontWeight: "bold" }}>
                {movie.date}
              </p>
              {/* <p style={{  fontStyle: "italic" }}>
              <strong>Year:</strong> {movie.date}
            </p> */}
              {/* <p style={{ fontStyle: "italic" }}>
                <strong>Genre:</strong> {movie.resoursePerson.join(", ")}
              </p>
              <p style={{ fontStyle: "italic" }}>
                <strong>Director:</strong> {movie.budget}
              </p> */}
              <p>{movie.description}</p>
              {/* <Dialog
                open={true}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Gallary />
              </Dialog> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
