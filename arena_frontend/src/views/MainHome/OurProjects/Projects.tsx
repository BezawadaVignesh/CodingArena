import { Card, Typography } from "@mui/material";
import { useState } from "react";
import './styles.css';


interface ReadMoreProps {
  id: string
  text: string
  amountOfWords?: number
}



const projects = [

  {
    title: "Exam Branch Portal",
    desc: "A centralized platform for managing exam-related processes. This portal streamlines activities from registration to grade distribution, ensuring efficient communication between students and faculty.",
    img: "/pro.png",
  },


  {
    title: "Coding Arena",
    desc: "An interactive coding platform tailored for hands-on learning and real-time problem-solving. The Coding Arena empowers students to practice coding, participate in contests, and collaborate on challenges. Built with a focus on data structures and algorithms, this platform is ideal for honing technical skills and fostering a competitive coding culture.",
    img: "/pro.png",
  },


  {
    title: "TLP Feedback Application",
    desc: "A feedback tool that bridges the gap between students and faculty, aiming to improve teaching quality and learning outcomes. Through structured feedback, students can share their learning experiences for each course. Faculty members receive scores and insights to enhance their teaching approach, helping improve the overall academic experience.",
    img: "/pro.png",
  },

]

export const ReadMore = ({ id, text, amountOfWords = 36 }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const splittedText = text.split(' ')
  const itCanOverflow = splittedText.length > amountOfWords
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text
  const endText = splittedText.slice(amountOfWords - 1).join(' ')
  
  const handleKeyboard = (e: { code: string; }) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <p id={id}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span 
            className={`${!isExpanded && 'hidden'}`} 
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className='text-violet-400 ml-2'
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'show less' : 'show more'}
          </span>
        </>
      )}
    </p>
  )
}

const ProjectCard = ({data}:{data:any}) => {
  return (
    <Card
      variant="outlined"
      sx={{
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
      <div style={{
        fontFamily: "Poppins",
        fontSize: "1.5em",
        fontWeight: 600,
        textAlign: "center"
      }}>
        {data.title}
      </div>
      <img src={data.img} alt="ebppro" width={450} height={200}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <Typography  sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
      }}>
        {data.desc}
      </Typography>
    </Card>
  )
}

const Projects = () => {

  return (
    <div style={{ marginTop: "110px" }}>
      <div style={{
        fontFamily: "Poppins",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        rowGap: "10px",
        width: "100%"
      }}>
        <div
          style={{
            width: "100%",
            fontWeight: 700,
            fontSize: "2.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Our Projects
        </div>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          rowGap: 25,
          columnGap: 25

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