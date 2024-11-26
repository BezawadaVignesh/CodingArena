import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ConfettiExplosion from 'react-confetti-explosion';
import { Navigate, useNavigate } from "react-router-dom";
import './Countdown.css'; // For custom styling

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(10); // Initialize countdown at 10 seconds
  const [isActive, setIsActive] = useState(false); // Start with active countdown
  const [isFinished, setIsFinished] = useState(false); // Track if countdown is finished
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [isExploding, setIsExploding] = React.useState(false);
  const navigate = useNavigate();
  const startTimer = () => {
    setIsActive(true); // Activate timer when button is clicked
  };

  const resetTimer = () => {
    setTimeLeft(10); // Reset time to 10 seconds
    setIsActive(false); // Deactivate countdown
    setIsFinished(false); // Reset finished state
    setConfettiVisible(false);
  };

  useEffect(() => {
    let timer:number;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false); // Stop the timer when it hits 0
      setIsFinished(true); // Mark countdown as finished
      triggerConfetti(); // Trigger confetti
      setConfettiVisible(true);
    }

    // Cleanup interval on component unmount or when countdown ends
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // useEffect(() => {
  //   if (confettiVisible) {
  //     const confettiTimer = setTimeout(() => {
  //       setConfettiVisible(false); // Hide confetti after 5 seconds
  //     }, 3000); // Confetti lasts for 5 seconds

  //     return () => clearTimeout(confettiTimer); // Cleanup timeout
  //   }
  // }, [confettiVisible]);


  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="countdown">
      <div className="timer ">
        <div className="timer-icon grow">
          <i className={`fa fa-clock ${isFinished ? 'stop' : ''}`}></i>
        </div>
        <span key={"time" + timeLeft} className={"time " + (isActive ? " grow " : "")}>{timeLeft}</span>
      </div>
      {confettiVisible && <Confetti />}
      <div className="controls">
        {!isActive && !isFinished && (
          <button onClick={() => {startTimer(); setIsExploding(true)}} className="start-button">
            Launch
          </button>
        )}
        {/* {(isActive || isFinished) && (
          <button onClick={resetTimer} className="reset-button">
            Reset Timer
          </button>
        )} */}
      </div><>{isExploding && <ConfettiExplosion force={0.8} duration={5000} particleCount={200} width={1500} />}</>
      {isFinished && <Navigate to={"/home"} />}
      {/* {isFinished && <>
        <div className="celebration">🎉 Launch Time! 🎉</div>
        <div className="celebration" onClick={()=>navigate("/home")}><a className="launch-link ">
          View Now
        </a></div>
      </>} */}
    </div>
  );
}

export default Countdown;
