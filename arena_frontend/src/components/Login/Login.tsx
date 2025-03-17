import { useTheme } from "@mui/material";
import { useState } from "react";
import CartoonButton from "../common/CButtons";
import Navbar from "../common/Navbar";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import style from "./styles.module.css";

export default function Login() {
  const theam = useTheme()
  const [type, setType] = useState("signIn");
  const handleOnClick = (text:any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  
  return (
    <>
    
    <Navbar/>
    <div className={style.App} style={{background: theam.palette.background.default, color:theam.palette.text.primary}}>
      <div className={style["container"] + " " + style[(type === "signUp" ? "right-panel-active" : "")]} id="container">
        <SignUpForm />
        <SignInForm />
        <div className={style["overlay-container"]}>
          <div className={style["overlay"]} >
            <div className={style["overlay-panel"] + " " + style["overlay-left"]}>
              <h1 className={style.h1} style={{color: theam.palette.background.default}}>Welcome Back!</h1>
              <p className={style.p} style={{color: theam.palette.background.default}}>
                To keep connected with us please login with your personal info
              </p>
              <CartoonButton
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </CartoonButton>
            </div>
            <div className={style["overlay-panel"]+  " " + style["overlay-right"]}>
              <h1 className={style["h1"]} style={{color: theam.palette.background.default}}>Hello, Coder!</h1>
              <p className={style.p} style={{color: theam.palette.background.default}}>Enter your personal details and start journey with us</p>
              <CartoonButton
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </CartoonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
