import { useEffect, useState } from "react";
import "./countdown.css";
export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <div className="countdown">🎉 È il giorno del viaggio!</div>;
  }

  return (
    <div className="countdown">
      <div className="d-flex align-items-center">
        <div className="block d-flex flex-column">
          <span>{timeLeft.days}</span>
          <span className="time">giorni</span>
        </div>
        <span>:</span>
        <div className="block d-flex flex-column">
          <span>{timeLeft.hours}</span>
          <span className="time">ore</span>
        </div>
        <span>:</span>
        <div className="block d-flex flex-column">
          <span>{timeLeft.minutes}</span>
          <span className="time">minuti</span>
        </div>
      </div>
    </div>
  );
}
