import { useEffect } from "react";
import { Slider } from "./external/slider.js";
import data from "./assets/data.json";
import Countdown from "./components/countdown/countdown.jsx";
import NextEvent from "./components/nextEvent/nextEvent.jsx";

function App() {
  const today = new Date().toISOString().split("T")[0]; // "2025-06-02"
  const icone = {
    mattina: <i class="fa fa-coffee" aria-hidden="true"></i>,
    pomeriggio: <i class="fa fa-sun-o" aria-hidden="true"></i>,
    sera: <i class="fa fa-moon-o" aria-hidden="true"></i>,
  };
  useEffect(() => {
    new Slider("slider", document.querySelector(".card-slider"));
    console.log("Slider initialized");
    console.log("Data loaded:", data);
  }, []);
  return (
    <>
      <main className="timeline">
        <header>
          <Countdown targetDate="2025-06-01T00:00:00" />
        </header>

        <div className="slider-container">
          <div id="slider">
            <div className="arrow-container arrow-left">
              <div className="arrow">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
            </div>
            <div className="card-slider">
              {data.days.map((dayObj) => (
                <div
                  key={dayObj.day}
                  className={`card day-card ${
                    dayObj.date === today ? "highlight" : ""
                  }`}
                  day={dayObj.day}
                >
                  <h2>
                    Giorno {dayObj.day}{" "}
                    <span>
                      {new Date(dayObj.date).toLocaleDateString("it-IT")}
                    </span>
                  </h2>

                  {["mattina", "pomeriggio", "sera"].map((periodo) => (
                    <section class={'periodo ' + periodo}>
                      <h3>
                        {icone[periodo]}{" "}
                        {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
                      </h3>

                      <ul>
                        {dayObj.schedule[periodo].map((item, index) => (
                          <li key={index}>
                            {typeof item === "string" ? (
                              item
                            ) : (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.event}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ))}
            </div>
            <div className="arrow-container arrow-right">
              <div className="arrow">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>

        <NextEvent schedule={data} />

        <div className="bottom-bar">
          <a href={data.hotel} className="link-box" target="_blank">
            <i className="fa fa-home fa-2x"></i>
            <span>Hotel </span>
          </a>
          <a href={data.aereoporto} className="link-box" target="_blank">
            <i className="fa fa-plane fa-2x"></i>
            <span> Aereo </span>
          </a>
          <a href={data.checkin} className="link-box" target="_blank">
            <i class="fa fa-address-card-o fa-2x" aria-hidden="true"></i>
            <span style={{ whiteSpace: "nowrap" }}> Check-in </span>
          </a>
        </div>
      </main>
    </>
  );
}

export default App;
