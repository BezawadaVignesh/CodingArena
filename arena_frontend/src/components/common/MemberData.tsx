import { GitHub } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Members = ({ data }: { data: any; }) => {
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
        { data.desig && <div style={{ fontWeight: "450", fontSize: 15, color: "#383838" }} >{data.desig}</div>}
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
  
export default Members;