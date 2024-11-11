import { GitHub } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import './styles.css';

type MemberData = {
  name: string;
  desig: string;
  fbook: string;
  x: string;
  linkedIn: string;
  mail: string;
  img: string;
  github?: string;
};

const faculty: MemberData[] = [
  {
    name: "A.Sree Lakshmi",
    desig: "Convenor",
    fbook: "",
    x: "",
    linkedIn: "https://www.linkedin.com/in/dr-sree-lakshmi-adepu-1a773a44",
    mail: "sreelakshmi.cse@gcet.edu.in",
    img: "/hod.jpg",
  },
  {
    name: "M. Keerthi",
    desig: "Club Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "sreelakshmi.cse@gcet.edu.in",
    img: "/keerthi.jpeg",
  },
  {
    name: "S. Ramanjaneyulu",
    desig: "Club Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "Ramanji.cse@gcet.edu.in",
    img: "/ramanji.png",
  },
  {
    name: "P. Chandra Shekar",
    desig: "Faculty Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "pchandrasekharreddy.cse@gcet.edu.in",
    img: "/chandrasekhar.jpeg",
  },
  {
    name: "A. Srinivas Rao",
    desig: "Faculty Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "asrinivasrao.cse@gcet.edu.in",
    img: "",
  },
]


const students: MemberData[] = [
  {
    name: "B. Vignesh",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "21r11a05f8@gcet.edu.in",
    img: "",
    github: "https://github.com/BezawadaVignesh",
  },
  {
    name: "R. Harinath Reddy",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "21r11a05k0@gcet.edu.in",
    img: "",
    github: "https://github.com/HarinathReddyR",
  },
  {
    name: "T. Jagadeesh Chandra",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "21r11a05l0@gcet.edu.in",
    img: "",
    github: "https://github.com/Jagadeesh-1314",
  },
  {
    name: "Y. Rahul",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "https://www.linkedin.com/in/rahul-bablu-a718b9273",
    mail: "21r11a05l4@gcet.edu.in",
    img: "",
    github: "https://github.com/rahul-bablu",
  },
  {
    name: "Vardhan",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "Naveen",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "https://www.linkedin.com/in/naveen-rampa-aa1178270",
    mail: "",
    img: "",
    github: "",
  },
]

const members: MemberData[] = [
  {
    name: "B. Vignesh",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "R. Harinath Reddy",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "T. Jagadeesh Chandra",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "Y. Rahul",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "Vardhan",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
  {
    name: "Naveen",
    desig: "Member",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "",
    img: "",
    github: "",
  },
]

const Members = ({ data }: { data: MemberData; }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      rowGap: 15,
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}>
      <img src={data.img || "/default-member.jpg"} alt="img" width={200} height={200} style={{ borderRadius: "50%", }} />
      <div style={{ fontWeight: "500" }} >{data.name}</div>
      <div style={{ fontWeight: "450", fontSize: 15, color: "#383838" }} >{data.desig}</div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 15,
        alignItems: "center"
      }}>
        {<a href={"mailto:"+data.mail} target='__blank' style={{ textDecoration: "none", color: "black" }} ><EmailIcon /></a>}
        {<a href={data.x} target='__blank' style={{ textDecoration: "none", color: "black" }} ><XIcon /></a>}
        {<a href={data.linkedIn} target='__blank' style={{textDecoration:"none", color: "black"}} ><LinkedInIcon /></a>}
        {data.github && <a href={data.github} target='__blank' style={{textDecoration:"none", color: "black"}} ><GitHub /></a>}

      </div>
    </div>
  )
}

const TeamCategory = ({ name, data }: { name: string; data: MemberData[]; }) => {
  return (
    <div className="__our-team" style={{
      marginTop: 50,

    }}>
      <div
        
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: "2em",
          marginBottom: 30
        }}>
        {name}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 50,
        rowGap: 30,
      }}>
        {
          data.map((info, __) => (
            <Members data={info} />
          ))
        }
      </div>
    </div>
  )
}

const OurTeam = () => {
  // const [value, setValue] = useState(0);
  return (
    <div style={{
      marginTop: 100, marginBottom: 100, fontFamily: "Poppins",
      width: "100%"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "justify",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,

      }}>
        <div style={{ fontSize: "2.5em", fontWeight: 700 }}>Our Team</div>
        {/* <Divider/> */}
        <div style={{ marginTop: 10 }}>The strength of the team is each individual member. The strength of each member is the team.</div>
        <div>- Phil Jackson</div>
        {/* <Tabs value={value} onChange={(__: React.SyntheticEvent, newValue: number) => { setValue(newValue); }} aria-label="tabs">
          <Tab label="All" />
          <Tab label="Faculty" />
          <Tab label="Students"  />
          <Tab label="Other Members" />
        </Tabs> */}
      </div>
      <TeamCategory name={"Faculty"} data={faculty} />
      <TeamCategory name={"Students"} data={students} />
      <TeamCategory name={"Other Members"} data={members} />
    </div>
  )
}

export default OurTeam;