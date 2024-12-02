import { Button, ButtonGroup, styled } from '@mui/material';
import { useState } from 'react';
import Members from '../../../components/common/MemberData';
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
    img: "/Vignesh2.png",
    github: "https://github.com/BezawadaVignesh",
  },
  {
    name: "R. Harinath Reddy",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "21r11a05k0@gcet.edu.in",
    img: "/harinath.jpg",
    github: "https://github.com/HarinathReddyR",
  },
  {
    name: "T. Jagadeesh Chandra",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "",
    mail: "21r11a05l0@gcet.edu.in",
    img: "/jaggu.jpg",
    github: "https://github.com/Jagadeesh-1314",
  },
  {
    name: "Y. Rahul",
    desig: "Coordinator",
    fbook: "",
    x: "",
    linkedIn: "https://www.linkedin.com/in/rahul-bablu-a718b9273",
    mail: "21r11a05l4@gcet.edu.in",
    img: "/rahul.jpg",
    github: "https://github.com/rahul-bablu",
  },
]

const members: MemberData[] = [
  {
    name: "Ruchith",
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
    linkedIn: "https://www.linkedin.com/in/naveen-rampa-aa1178270",
    mail: "",
    img: "",
    github: "",
  },
]




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

const FilterButton = styled(Button)(({ }) => ({
  // backgroundColor: "black",
  color: "var(--text-color)",
  fontFamily: "Poppins",
  borderColor: "black",
  "&:hover": {
    backgroundColor: "black",
    color: "white",
  }
}));

const OurTeam = () => {
  const buttons = ['All', 'Faculty', 'Students', 'Others'];
  const [selectedButton, setSelectedButton] = useState(buttons[0]);
  return (
    <div style={{
      marginTop: 100, marginBottom: 100, fontFamily: "Poppins",
      width: "100%",

      paddingInline: "5%"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "justify",
        flexDirection: "column",
        alignItems: "center",
        // padding: 5,

      }}>
        <h1 style={{ fontSize: "1.9em", fontWeight: 700 }}>Our Team</h1>
        {/* <Divider/> */}
        <p style={{ marginTop: 10 }}>The strength of the team is each individual member. The strength of each member is the team.</p>
        <p>- Phil Jackson</p>
        <div style={{ marginBlock: 50, borderRadius: 20, paddingInline: 15 }}>
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            sx={{
              // borderRadius: 10,
              '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                borderColor: "none"
              },
              height: 45,

            }}
          >
            {
              buttons.map(button => (
                <FilterButton
                  onClick={() => setSelectedButton(button)}
                  variant={selectedButton === button ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: selectedButton === button ? "black": "",
                    color: selectedButton === button ? "white": "black",
                  }}
                >
                  {button}
                </FilterButton>
              ))
            }
          </ButtonGroup>
        </div>
      </div>

      {(selectedButton === "All" || selectedButton === "Faculty") ? <TeamCategory name={"Faculty"} data={faculty} /> : <></>}
      {(selectedButton === "All" || selectedButton === "Students") ? <TeamCategory name={"Students"} data={students} /> : <></>}
      {(selectedButton === "All" || selectedButton === "Others") ? <TeamCategory name={"Other Members"} data={members} /> : <></>}
    </div>
  )
}

export default OurTeam;