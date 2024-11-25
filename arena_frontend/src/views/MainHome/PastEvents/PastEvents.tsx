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
      "A skilled thief is offered a chance to have his criminal history erased if he can implant another person's idea into a target's subconscious.",
    imageUrl:
      "codecreate.png",

  },
  {
    title: "Code Sprint 1.0",
    date: " August 1st, 2023",
    noOfParticipants: 200,
    budget: 0,
    resoursePerson: ["D Soujanya",],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl:
      "codeSprint1.0.jpeg",
  },
  {
    title: "Code Sprint 2.0",
    date: " August 1st, 2023",
    noOfParticipants: 200,
    budget: 0,
    resoursePerson: ["D Soujanya",],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    imageUrl:
      "codeSprint2.0.jpg",
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
              <p style={{ fontStyle: "italic" }}>
                <strong>Genre:</strong> {movie.resoursePerson.join(", ")}
              </p>
              <p style={{ fontStyle: "italic" }}>
                <strong>Director:</strong> {movie.budget}
              </p>
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
