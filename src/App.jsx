import { useEffect } from "react";
import "./App.css";
import { Slider } from "./slider.js";
import data from "./assets/data.json";
import Countdown from "./components/countdown.jsx";
function App() {
  const today = new Date().toISOString().split("T")[0]; // "2025-06-02"
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
                  className={`card day-card ${dayObj.date === today ? 'highlight' : ''}`}
                  day={dayObj.day}
                >
                  <h2>
                    Giorno {dayObj.day}{" "}
                    <span>
                      {new Date(dayObj.date).toLocaleDateString("it-IT")}
                    </span>
                  </h2>
                  <ul>
                    {Object.entries(dayObj.schedule).map(
                      ([periodo, eventi]) => (
                        <div key={periodo}>
                          {eventi.map((item, index) => (
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
                        </div>
                      )
                    )}
                  </ul>
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

        <section className="todo p-3">
          <h2 className="text-center">Prossima cosa da fare</h2>
        </section>

        <div className="bottom-bar">
          <a href={data.hotel} className="link-box" target="_blank">
            <i className="fa fa-home fa-2x"></i>
            <span>Hotel </span>
          </a>
          <a href={data.aereoporto} className="link-box" target="_blank">
            <i className="fa fa-plane fa-2x"></i>
            <span> Aereo </span>
          </a>
        </div>
      </main>
    </>
  );
}

export default App;
