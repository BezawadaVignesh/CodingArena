import "./glowing-card.css";
const GlowingCards = () => {
  return (
    <div style={{ backgroundColor: "var(--bg-color)", paddingBlock: "100px" }}>
      <div
        style={{ margin: "auto", width: "max-content" }}
      >
        <div
          onMouseMove={(e) => {
            for (const date of document.getElementsByClassName(
              "box"
            ) as HTMLCollectionOf<HTMLElement>) {
              const rect = date.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

              date.style.setProperty("--mouse-x", `${x}px`);
              date.style.setProperty("--mouse-y", `${y}px`);
            }
          }}
        >
          <div className="container">
            {/* <div style={{backgroundColor: 'var(--text-color)', opacity: 0.1}}> */}

            <div className="box">
              <div className="box-content">

                <h2>Vision</h2>
                <p>
                To empower every member of GCET Coding Club to become proficient
                coders, creative thinkers, and proactive problem-solvers who are
                ready to make an impact in the tech world. We envision a
                community that fosters innovation and inclusivity, inspiring
                students to reach their full potential through technology.
                </p>
              </div>
            </div>
            {/* </div> */}
            <div className="box">
              <div className="box-content" style={{
                paddingInline: '30px',
                paddingLeft: '50px',
              }}>
                <h2>Mission</h2>

                <ol>
                <li>To provide a supportive and collaborative environment for students to learn and practice coding.</li>
                <li>To encourage innovation by organizing coding events, hackathons, and competitive programming sessions. </li>
                <li>To connect members with industry experts and alumni for insights into real-world applications and career opportunities. </li>
                <li>To inspire students to pursue excellence in technology, focusing on continuous learning and improvement.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlowingCards;
