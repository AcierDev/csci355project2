"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = time.getHours();
  const hoursForClock = hours % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const scale = (
    num: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <div
          className="needle hour"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              hoursForClock,
              0,
              12,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div
          className="needle minute"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              minutes,
              0,
              60,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div
          className="needle second"
          style={{
            transform: `translate(-50%, -100%) rotate(${scale(
              seconds,
              0,
              60,
              0,
              360
            )}deg)`,
          }}
        ></div>
        <div className="center-point"></div>
      </div>

      <div className="time">
        {hoursForClock}:{minutes < 10 ? `0${minutes}` : minutes} {ampm}
      </div>
      <div className="date">
        {days[time.getDay()]}, {months[time.getMonth()]}{" "}
        <span className="circle">{time.getDate()}</span>
      </div>
    </div>
  );
}
