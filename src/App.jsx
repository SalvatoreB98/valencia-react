import "./App.css";
import { Slider } from './slider.js'
function App() {
  new Slider('slider', document.querySelector('.card-slider'));

  return (
    <>
      <main className="timeline">
        <header>
          <div className="overlay"></div>
          <div className="desc">
            <h1>Valencia Experience</h1>
            <p>4 giorni di cultura, divertimento e relax</p>
          </div>
        </header>

        <div className="slider-container">
          <div id="slider">
            <div className="arrow-container arrow-left">
              <div className="arrow">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </div>
            </div>
            <div className="card-slider">
              <div className="card day-card" day="1">
                <h2>
                  Giorno 1 <span>01/06/2025</span>
                </h2>
                <ul>
                  <li>🍝 Pranzo in Allegria (proposta)</li>
                  <li>✈️ Aeroporto SUF - 18:00</li>
                  <li>🍹 Aperitivo Pre-Partenza</li>
                  <li>🚐 Arrivo a Valencia - 21:30</li>
                  <li>🏡 Check-in appartamento</li>
                  <li>🌆 Serata tra i vicoli con Paella & compagnia</li>
                  <li>💃 Ballar!</li>
                </ul>
              </div>

              <div className="card day-card" day="2">
                <h2>
                  Giorno 2 <span>02/06/2025</span>
                </h2>
                <ul>
                  <li>😴 Sveglia nel chill</li>
                  <li>☕ Colazione in pasticceria</li>
                  <li>🚴‍♂️ E-bike e Oceanografico</li>
                  <li>🥙 Pranzo</li>
                  <li>🏙️ Giretto in centro</li>
                  <li>🚿 Ritorno a casetta</li>
                  <li>🥩 Cena</li>
                  <li>🕺 Disco: Akuarela / Marina Beach Club</li>
                </ul>
              </div>

              <div className="card day-card" day="3">
                <h2>
                  Giorno 3 <span>03/06/2025</span>
                </h2>
                <ul>
                  <li>🥐 Colazione in pasticceria</li>
                  <li>🏛️ Mercato, Cattedrale, Parc Gulliver</li>
                  <li>🌮 Tapas al mercato</li>
                  <li>🏖️ Giretto in spiaggia</li>
                  <li>🚿 Ritorno a casetta</li>
                  <li>🍲 Cena</li>
                  <li>🍾 Serata finale in centro</li>
                </ul>
              </div>

              <div className="card day-card" day="4">
                <h2>
                  Giorno 4 <span>04/06/2025</span>
                </h2>
                <ul>
                  <li>🕶️ Occhiali da sole anti-vergogna</li>
                  <li>☕ Colazione</li>
                  <li>✈️ Ritorno all’Aeroporto SUF</li>
                  <li>👋 Saluti!</li>
                </ul>
              </div>
            </div>
            <div className="arrow-container arrow-right">
              <div className="arrow">
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>

        <section className="todo p-3">
          <h2>Prossima cosa da fare</h2>
        </section>
      </main>
    </>
  );
}

export default App;
