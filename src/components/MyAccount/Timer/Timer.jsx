import React, { useState, useRef } from "react";
import "./Timer.css";
import axios from "axios";
import { useEffect } from "react";
import settingCookie from "../../../utils/settingCookie";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isStudy, setIsStudy] = useState(false);
  const countRef = useRef(null);

  const startTime = async () => {
    setIsStudy(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    try {
      const token = settingCookie("get-access");
      const res = await axios({
        method: "get",
        url: "/api/timer/start",
        headers: {
          Authorization: `${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 멈추면
  const pauseTime = async () => {
    setIsStudy(false);
    clearInterval(countRef.current);

    try {
      const token = settingCookie("get-access");
      const res = await axios({
        method: "get",
        url: "/api/timer/stop",
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const getStudyTime = async () => {
    try {
      const token = settingCookie("get-access");
      console.log(token);
      const res = await axios({
        method: "get",
        url: "/api/timer",
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(res.data);
      const seconds = res.data.minutes * 60;
      setTimer(seconds);
      if (res.data.status === "REST") {
        setIsStudy(false);
        clearInterval(countRef.current);
      } else if (res.data.status === "STUDY") {
        setIsStudy(true);
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudyTime();
  }, []);

  return (
    <div className="app">
      <h2>Your Coding Timer</h2>
      <h3>!You are a coding king!</h3>
      <div className="stopwatch-card">
        <p>{formatTime()}</p>
        <div className="buttons">
          {isStudy ? (
            <button className="timerButton" onClick={pauseTime}>
              Pause
            </button>
          ) : (
            <button className="timerButton" onClick={startTime}>
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Timer;
