import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './styles.css';





const projects = [

  {
    title: "Exam Branch Portal",
    desc: "The Exam Branch Portal is a web application designed to streamline the management of exam-related processes. This application serves as an efficient platform for registering students for supplementary exams, revaluation exams, and written test exam fee payments.",
    img: "/ebpro.jpg",
  },


  {
    title: "Coding Arena",
    desc: "An interactive coding platform tailored for hands-on learning and real-time problem-solving. The Coding Arena empowers students to practice coding, participate in contests, and collaborate on challenges. Built with a focus on data structures and algorithms, this platform is ideal for honing technical skills and fostering a competitive coding culture.",
    img: "/codingarenapro.jpg",
  },


  {
    title: "TLP Feedback Application",
    desc: "A feedback tool that bridges the gap between students and faculty, aiming to improve teaching quality and learning outcomes. Through structured feedback, students can share their learning experiences for each course. Faculty members receive scores and insights to enhance their teaching approach, helping improve the overall academic experience.",
    img: "/tlppro.jpg",
  },

]

const ProjectCard = ({ data }: { data: any; }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        key={data.title}
        // onClick={()=>{navigate(`${(data.title).split(' ').join('')}`)}}
        variant="outlined"
        sx={{
          fontFamily: "Poppins",
          display: "flex",
          padding: 3,
          flexDirection: "column",
          rowGap: 5,
          maxWidth: 530,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        }}>
        <h1 style={{
          // fontSize: "1.5em",
          // fontWeight: 600,
          textAlign: "center"
        }}>
          {data.title}
        </h1>
        <img src={data.img} alt="ebppro" width={425} height={210}
          style={{
            maxWidth: "100%",
            // height: "auto",
            maxHeight: "210",
          }}
        />
        <Typography sx={{
          fontFamily: "Poppins",
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,

        }}>
          {data.desc}
        </Typography>
        <Button variant="contained"
          key={data.title+"button"}
          onClick={() => { navigate(`${(data.title).split(' ').join('')}`) }}
          sx={{
            // width: 120,
            height: 40,
            fontFamily: "Poppins",
            borderRadius: 5,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#aaa"
            }
          }}
          type="submit"
        >
          Know More
        </Button>
      </Card>

    </>
  )
}

const Projects = () => {

  return (
    <div style={{ marginBlock: "110px" }}>
      <div style={{
        fontFamily: "Poppins",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        rowGap: "10px",
        width: "100%",
      }}>
        <h1
          style={{
            // width: "100%",
            // fontWeight: 700,
            fontSize: "1.9em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Our Projects
        </h1>
        <div style={{
          marginTop: 60,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 30

        }}>
          {projects.map((proj, ___) => (

            <ProjectCard data={proj} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;