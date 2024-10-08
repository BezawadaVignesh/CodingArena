import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import Axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth/AuthProvider";
import Navbar from "../components/common/Navbar";
  // import { useAuth } from "../components/Auth/AuthProvider";
  import AccessTimeIcon from '@mui/icons-material/AccessTime';
  
  const Timer = ({ deadline }: { deadline: string }) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    // const deadline = ;
  
    const getTime = (deadline: string) => {
      const time = Math.max(Date.parse(deadline) - Date.now(), 0);
      // setTimeLeft(time);
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div
        className="timer"
        role="timer"
        style={{
          // backgroundColor: "rgba(255, 255, 255, 0.7)",
          display: "flex",
          // borderRadius: 10,
          fontSize: 14,
          alignItems: 'baseline',
          textAlign: "center",
          // border: "2px solid #AAAA",
          // width: "115px",
        }}
      >
        <AccessTimeIcon fontSize="medium" sx={{paddingInline: "5px", transform: 'translate(0px, 2px)'}}/>
            <p > Starts in {days < 10 ? "0" + days : days}d  {hours < 10 ? "0" + hours : hours}h {minutes < 10 ? "0" + minutes : minutes}m {seconds < 10 ? "0" + seconds : seconds}s</p>
           
        
        
      </div>
    );
  };
  

  const Contests = () => {
    // const [qs, setQs] = useState<any>([
    //   { title: "This should not appier", id: 0 },
    // ]);
    const [qs, setQs] = useState<any>([]);
    const { user } = useAuth()!;
    // const { user } = useAuth()!;
  
    const navigate = useNavigate();
    useEffect(() => {
      (async () => {
        const { data } = await Axios.get(`/api/contest/user?userId=${1}`, {withCredentials:true});
        // const { data } = await Axios.post(`/api/contest/adduser/1`,{userId:1}, {withCredentials:true});
        // console.log(data)
        setQs(data);
      })();
    }, []);
  
    async function handleRegister() {
      const { data } = await Axios.post(`/api/contest/adduser/1`,{userId:1}, {withCredentials:true});
      console.log(data);
    }
  // console.log(user);
    return (
      <div >
        <Navbar />
        <Box
          // alignItems="center"/
        >
          <div style={{ width: "100%", display: 'flex', flexWrap: 'wrap', maxWidth: '1000px', margin: 'auto' }}>
            {
              qs.map(
                ({ title, id, registred, startTime, state, uended }: { title: string; id: number, registred:boolean, startTime:string, state: string, uended: boolean }, index: number) => (
                  !registred?<></>:
                  <Card
                    
                    // variant="outlined"
                    sx={{
                      fontFamily: "sans-serif",
                      margin: "auto",
                      width: "450px",
                      marginY: "10px",
                      transition: 'box-shadow 0.3s',
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                    key={id}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 0,
                        padding: 20,
                      paddingTop:25,
                      }}
                    >
                      <div >
                      <Timer deadline={startTime} />
                      <Typography sx={{paddingBottom: 1, fontWeight: 600, fontSize: '18px'}}>
                        {title} {"\n"}
                      </Typography>
                      <Typography sx={{fontFamily: '"M PLUS Rounded 1c", sans-serif', fontSize: '14px'}}>{dayjs(startTime).format('dddd, MMMM D, YYYY h:mm A')}</Typography>
                      
                      </div>
                      {uended?<Button size="small" variant="outlined" disabled>Submited</Button>: state === "inactive" && (Date.parse(startTime) - Date.now() > 0) ? <Timer deadline={startTime} />: <Button  variant="contained"onClick={() => navigate(`/test/${id}`)} >Enter</Button>}
                      
                      
                      
                    </div>
                  </Card>
  )
              )
              // JSON.stringify(qs)
            }
          </div>
          {/* <div style={{ width: "100%" }}>
            {
              qs.map(
                ({ title, id, registred, startTime, state, uended }: { title: string; id: number, registred:boolean, startTime:string, state: string, uended: boolean }, index: number) => (
                  !registred?<></>:
                  <Card
                    
                    variant="outlined"
                    
                    sx={{
                      fontFamily: "sans-serif",
                      margin: "auto",
                      width: "80%",
                      marginY: "10px",
                      
                    }}
                    key={id}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 0,
                        padding: 20,
                      paddingTop:25,
                      }}
                    >
                      <div >
                      <Typography sx={{paddingBottom: 1}}>
                        {index + 1}. {title} {"\n"}
                      </Typography>
                      <Typography fontSize={11}>This is a short desc if needed</Typography>
                      </div>
                      {uended?<Button size="small" variant="outlined" disabled>Submited</Button>: state === "inactive" && (Date.parse(startTime) - Date.now() > 0) ? <Timer deadline={startTime} />: <Button  variant="contained"onClick={() => navigate(`/test/${id}`)} >Enter</Button>}
                     
                      
                      
                    </div>
                  </Card>
  )
              )
              // JSON.stringify(qs)
            }
          </div> */}
          
          <div style={{ width: "100%" }}>
           <div style={{fontWeight: 600, margin: "auto", fontSize: '18px',fontFamily: '"M PLUS Rounded 1c", sans-serif',
                      width: "80%",}}>Featured Contests</div>
            {
              qs.map(
                ({ title, id, registred, startTime, state, uended }: { title: string; id: number, registred:boolean, startTime:string, state: string, uended: boolean }, index: number) => (
                  registred?<></>:
                  <Card
                    
                    variant="outlined"
                    sx={{
                      fontFamily: "sans-serif",
                      margin: "auto",
                      width: "80%",
                      marginY: "10px",
                    }}
                    key={id}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        margin: 0,
                        padding: 20,
                      paddingTop:25,
                      }}
                    >
                      <div >
                      <Typography sx={{paddingBottom: 1}}>
                        {index + 1}. {title} {"\n"}
                      </Typography>
                      </div>
                      <div>
                        {registred? <Button size="small" variant="outlined" disabled>Registered..</Button>:<Button size="small" variant="contained" color="success" onClick={handleRegister}>Register</Button>}
                      </div>
                      
                      {/* <div>
                      <Button size="small" color="info" variant="contained">
                        Edit
                      </Button>
                      <Button sx={{marginInline: 1}} size="small" color="error" variant="contained">
                        Delete
                      </Button>
                      </div> */}
                    </div>
                  </Card>
  )
              )
              // JSON.stringify(qs)
            }
          </div>
        </Box>
        {/* <div style={{margin:'auto', width:'80%'}}>
          { user=='user1' || true?<div style={{marginLeft:'auto',marginRight:0, width:100}}><Button sx= {{margin: 'auto', width: 90}} color="success" variant="contained"><Create /></Button></div>:<>Hi</>}
          </div> */}
      </div>
    );
  };
  
  export default Contests;
  