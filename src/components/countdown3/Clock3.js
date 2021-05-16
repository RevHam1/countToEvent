import React, { useEffect, useRef, useState } from "react";
// import moment from "moment";
import "./Clock3.css";

const Clock3 = ({ eventDate }) => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(eventDate).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    // let isMounted = true;
    startTimer();
    let clear = interval.current;
    return () => {
      clearInterval(clear);
      // isMounted = false;
    };
  });

  // const EffectCleanup = () => {
  //   useEffect(() => {
  //     // let isMounted = true;
  //     startTimer();

  //     return () => {
  //       clearInterval(interval.current);
  //       // isMounted = false;
  //     };
  //   });
  // };

  return (
    <div>
      <div>
        <h1>Countdown</h1>
        <h3>to this event you can experience in...</h3>
      </div>
      <div className="countdown-wrapper">
        <div className="countdown-item">
          <p>{timerDays}</p>
          <span>days</span>
        </div>
        <div className="countdown-item">
          <p>{timerHours}</p>
          <span>hours</span>
        </div>
        <div className="countdown-item">
          <p>{timerMinutes}</p>
          <span>minutes</span>
        </div>
        <div className="countdown-item">
          <p>{timerSeconds}</p>
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Clock3;
