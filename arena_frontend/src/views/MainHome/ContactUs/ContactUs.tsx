import { Email, LocationOn, Phone } from "@mui/icons-material";
import { Button, styled, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { AlertContext } from "../../../components/common/AlertProvider";
import "./styles.css";





const WarnFill = () => {
  return (
    <div style={{fontSize:13, color: "#ba191a"}}>Please fill this Field</div>
  )
}

const ContactForm = () => {
  const [name, setName] = useState(["", false]);
  const [email, setEmail] = useState(["", false]);
  const [phn, setPhn] = useState(["", false]);
  const [msg, setMsg] = useState(["", false]);
  const alert = useContext(AlertContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name[0] === "") {
      setName(["", true])
    } 
    if (email[0] === "") {
      setEmail(["", true])
    }
    if (msg[0] === "") {
      setMsg(["", true])
    }
    if (name[0] !== "" || email[0] !== "" || msg[0] !== "") {
      alert?.showAlert('Thank you', 'success');
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      textAlign: "left",
      width: "500px",
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          rowGap: 25
        }}>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            Name
            <MyTextField sx={{}} id="outlined-basic" variant="outlined" onChange={(e)=>{setName([e.target.value, false])}} />
            {name[1] && <WarnFill />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            Email
            <MyTextField type="email" sx={{}} id="outlined-basic" variant="outlined" onChange={(e)=>{setEmail([e.target.value, false])}} />
            {email[1] && <WarnFill />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            Phone Number (Optional)
            <MyTextField sx={{}} id="outlined-basic" variant="outlined" onChange={(e)=>{setPhn([e.target.value, false])}} />
            {phn[1] && <WarnFill />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", rowGap: 1 }}>

            Message
            <MyTextField sx={{}} id="outlined-basic" variant="outlined" multiline onChange={(e)=>{setMsg([e.target.value, false])}} placeholder="Type your Message..." />
            {msg[1] && <WarnFill />}
          </div>
          <Button variant="contained" sx={{
            width: 120,
            height: 40,
            borderRadius: 5,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "grey"
            }
          }}
            type="submit"
          >
            Submit
          </Button>
        </div>

      </form>
    </div>
  )
}



const Contact = ({ children, linkto }: { linkto: string; children: JSX.Element }) => {
  return (
    <a
      href={linkto}
      target="_blank"
      style={{
        textDecoration: "none",
        color: "black",
        transition: "text-decoration 0.3s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"} 
      onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"} 
    >

      <div style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
      }}>
        {children}
      </div>
    </a>
  )
}

const MyTextField = styled(TextField)(({ }) => ({
  "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",  // Change border color on focus
        borderWidth: "2px",    // Optionally, make it bolder
      },
    },
}));

const ContactInfo = () => {
  const contacts = [
    [<Phone />, "+ 91 7546825361", "tel:+917546825361"],
    [<Email />, "codingclub@gcet.edu.in", "mailto:codingclub@gcet.edu.in"],
    [<LocationOn />, "Cheeryal Village, Keesara Mandal, Hyderabad, Telangana 501301", "https://maps.google.com/maps?rlz=1C1CHBD_enIN971IN971&gs_lcrp=EgZjaHJvbWUqDwgCEC4YJxjJAxiABBiKBTIGCAAQRRg8MgwIARBFGDkYsQMYgAQyDwgCEC4YJxjJAxiABBiKBTIKCAMQLhixAxiABDIKCAQQLhixAxiABDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBCDMwNTJqMGo0qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3bcb9d3704b16971:0x522242e0977760ef&ved=2ahUKEwjN7J3Z79OJAxVrTWwGHXRuLNAQ4kB6BAg8EAE"]
  ];
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      rowGap: 10,
      flexWrap: "wrap",
      textAlign: "left",
      alignItems: "flex-start",
      width: "500px",
    }}>
      <div style={{ fontSize: "2.5em", fontWeight: "700" }} >Contact Us</div>
      <div style={{display: "flex", flexDirection: "column", rowGap: 20}}>
      <div> Feel free to use the form or drop us an email. </div>

        {contacts.map((contact, __) => (
          <Contact linkto={contact[2] as string}>
            <>
              {contact[0]}
              {contact[1]}
            </>
          </Contact>
        ))}
      </div>
    </div>
  )
}

const ContactUs = () => {
  return (
    <div style={{ marginTop: "100px", fontFamily: "Poppins" }}>
      <div className="__contact-us" style={{
        display: "flex",
        flexDirection: "row",
        columnGap: 20,
        rowGap: 20,
        width: "100%",
        justifyContent: "center",
        padding: 25,
        marginBottom: 200
      }}>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactUs;