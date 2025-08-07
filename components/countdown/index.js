import React, { useState, useEffect, useCallback } from 'react';

const TimeCountDown = ({ dateClass }) => {
  const countdownDate = new Date('12/06/2026').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const updateTime = useCallback(() => {
    const currentTime = new Date().getTime();
    const distance = countdownDate - currentTime;

    if (distance < 0) {
      setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    });
  }, [countdownDate]);

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  return (
    <ul className={`countdown_timer_block unordered_list justify-content-center ${dateClass}`}>
      {['Days', 'Hours', 'Min', 'Sec'].map((label, index) => {
        const timeValues = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
        return (
          <li className="time-section" key={label}>
            <span className="time">{timeValues[index]}</span>
            <small className="time-text">{label}</small>
          </li>
        );
      })}
    </ul>
  );
};

export default TimeCountDown;
