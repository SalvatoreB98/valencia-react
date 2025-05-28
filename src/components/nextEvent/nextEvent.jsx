import { useEffect, useState } from "react";
import "./nextEvent.css";
export default function NextEvent({ schedule }) {
  const [nextItem, setNextItem] = useState(null);

  const tempoRimanente = (futuraData) => {
    const diff = futuraData - new Date();
    if (diff <= 0) return "⏳ Ora!";

    const minutiTotali = Math.floor(diff / 60000);
    const ore = Math.floor(minutiTotali / 60);
    const minuti = minutiTotali % 60;

    if (ore > 0 && minuti > 0)
      return (
        <div className="container-count2">
          <div className="desc">🕒</div>
          <div>{ore}</div>
          <div className="unit">h</div>
          <div>{minuti}</div>
          <div className="unit">m</div>
        </div>
      );
    if (ore > 0)
      return (
        <div className="container-count2">
          <div className="desc">🕒</div>
          <div>{ore}</div>
          <div className="unit">h</div>
        </div>
      );
    return (
      <div className="container-count2">
        <div className="desc">🕒</div>
        <div>{minuti}</div>
        <div className="unit">m</div>
      </div>
    );
  };

  useEffect(() => {
    const now = new Date();
    const flatEvents = [];
    schedule.days.forEach((day) => {
      const baseDate = new Date(day.date);

      Object.entries(day.schedule).forEach(([period, events]) => {
        events.forEach((item, index) => {
          const content = typeof item === "string" ? item : item.event;
          const link = typeof item === "string" ? null : item.link;

          // Orario stimato fittizio: mattina=09:00, pomeriggio=15:00, sera=20:00
          let hour =
            period === "mattina" ? 9 : period === "pomeriggio" ? 15 : 20;
          const eventDate = new Date(baseDate);
          eventDate.setHours(hour, index * 10, 0); // distanza temporale fittizia

          flatEvents.push({ content, link, time: eventDate });
        });
      });
    });

    const upcoming = flatEvents.find((event) => event.time > now);
    setNextItem(upcoming);
  }, [schedule]);

  if (!nextItem) {
    return <div className="next-event">✅ Tutto fatto! Rilassati.</div>;
  }

  return (
    <div className="next-event p-4 bg-yellow-100 rounded-xl shadow-md text-center">
      <div className="next-thing">
        <strong className="">Prossima cosa da fare:</strong>
        <div className="text-xl font-semibold">
          {nextItem.link ? (
            <a
              href={nextItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {nextItem.content}
            </a>
          ) : (
            nextItem.content
          )}
        </div>
      </div>
      <div className="tra">{tempoRimanente(nextItem.time)}</div>
    </div>
  );
}
