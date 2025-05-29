import { useEffect, useState } from "react";
import "./nextEvent.css";
import Ongoing from "../ongoing/ongoing.jsx";
export default function NextEvent({ schedule }) {
  const [nextItem, setNextItem] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const tempoRimanente = (futuraData) => {
    const diff = futuraData - new Date("2025-06-01T20:09:00Z");
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
    const now = new Date("2025-06-01T20:09:00Z"); // oppure: new Date("2025-06-01T20:09:00Z")
    const bufferMs = 20 * 60 * 1000; // 20 minuti

    const flatEvents = [];

    schedule.days.forEach((day) => {
      Object.entries(day.schedule).forEach(([period, events]) => {
        events.forEach((item) => {
          const content = typeof item === "string" ? item : item.event;
          const link = typeof item === "string" ? null : item.link;
          const timeString =
            typeof item === "object" && item.time ? item.time : null;

          if (!timeString) {
            console.warn(
              `Evento "${content}" non ha un orario definito e verrà ignorato.`
            );
            return;
          }

          const dateTimeString = `${day.date}T${timeString}`;
          const eventDate = new Date(dateTimeString);

          if (isNaN(eventDate)) {
            console.warn(
              `Data non valida per evento "${content}": ${dateTimeString}`
            );
            return;
          }

          flatEvents.push({
            content,
            link,
            time: eventDate,
            endTime: new Date(
              eventDate.getTime() + (item.duration || 30) * 60000
            ),
          });
        });
      });
    });

    const currentEvent = flatEvents.find((event) => {
      return now >= event.time && now <= event.endTime;
    });

    setCurrentEvent(currentEvent || null);
    console.log("Current event:", currentEvent);

    // Trova il primo evento in arrivo (entro buffer)
    const upcoming = flatEvents.find((event) => {
      return event.time.getTime() > now.getTime() - bufferMs;
    });
    setNextItem(upcoming);
  }, [schedule]);

  if (!nextItem) {
    return <div className="next-event">✅ Tutto fatto! Rilassati.</div>;
  }

  return (
    <>
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
        <div className="tra" onClick={() => setShowModal(true)}>
          {" "}
          {tempoRimanente(nextItem.time)}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            Avete ancora {tempoRimanente(nextItem.time)} al prossimo evento
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}

      {currentEvent && (
        <Ongoing
          className="ongoing"
          endTime={nextItem.endTime}
          event={currentEvent}
        />
      )}
    </>
  );
}
