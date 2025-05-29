import { useEffect } from "react";
import { Slider } from "./external/slider.js";
import data from "./assets/data.json";
import Countdown from "./components/countdown/countdown.jsx";
import NextEvent from "./components/nextEvent/nextEvent.jsx";
import { useState } from "react";
import Extra from "./components/Extra/Extra.jsx";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showModalExtra, setShowModalExtra] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // "2025-06-02"
  const icone = {
    mattina: <i className="fa fa-coffee" aria-hidden="true"></i>,
    pomeriggio: <i className="fa fa-sun-o" aria-hidden="true"></i>,
    sera: <i className="fa fa-moon-o" aria-hidden="true"></i>,
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
                    <section className={"periodo " + periodo} key={periodo}>
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
                                target="_self"
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
          <a href={data.hotel} className="link-box" target="_self">
            <i className="fa fa-home fa-2x"></i>
            <span>Hotel </span>
          </a>
          <a href={data.aereoporto} className="link-box" target="_self">
            <i className="fa fa-plane fa-2x"></i>
            <span> VAL </span>
          </a>

          <a
            className="link-box"
            target="_self"
            onClick={() => setShowModalExtra(true)}
          >
            <i className="fa fa-map-marker fa-2x" aria-hidden="true"></i>
            <span style={{ whiteSpace: "nowrap" }}> Tappe Extra </span>
          </a>
          <a
            className="link-box"
            target="_self"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-life-ring fa-2x" aria-hidden="true"></i>
            <span style={{ whiteSpace: "nowrap" }}> Contatti </span>
          </a>
          <a
            className="link-box"
            href={
              /Android/i.test(navigator.userAgent)
                ? "intent://translate/#Intent;package=com.google.android.apps.translate;scheme=https;end"
                : "https://translate.google.com/?sl=auto&tl=es&op=translate"
            }
            target="_self"
            rel="noopener noreferrer"
          >
            <i className="fa fa-language fa-2x" aria-hidden="true"></i>
            <span style={{ whiteSpace: "nowrap" }}> Traduttore </span>
          </a>
        </div>
      </main>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>📇 Contatti utili</h3>
            <ul>
              <li>
                📞 Hotel: <a href="tel:+34696120663"> 696 12 06 63</a>
              </li>
              <li>
                {" "}
                <a href={data.hotel} target="_self">
                  📍 Calle del Convent de Sant Francesc
                </a>{" "}
              </li>
              <li>
                🆘 (NUE) <a href="tel:112">112</a>{" "}
              </li>
            </ul>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}
      {showModalExtra && <Extra setShowModalExtra={setShowModalExtra}></Extra>}
    </>
  );
}

export default App;
