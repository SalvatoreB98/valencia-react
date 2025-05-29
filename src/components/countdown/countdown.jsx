import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./countdown.css";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date("2025-06-01T20:09:00Z");
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
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

  const flipAnim = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  };

  const labelMap = {
    days: "giorni",
    hours: "ore",
    minutes: "minuti",
    seconds: "secondi",
  };

  return (
    <div className="countdown">
      <div className="d-flex align-items-center justify-content-center gap-3">
        {["days", "hours", "minutes", "seconds"].map((unit, i) => (
          <div key={unit} className="block d-flex flex-column align-items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={timeLeft[unit]}
                {...flipAnim}
                className="number"
              >
                {timeLeft[unit]}
              </motion.span>
            </AnimatePresence>
            <span className="time">{labelMap[unit]}</span>
            {i !== 3 && <span className="separator"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
