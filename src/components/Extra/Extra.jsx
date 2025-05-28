export default function Extra({ setShowModalExtra }) {
  if (!setShowModalExtra) {
    console.warn("setShowModalExtra function not provided");
  }
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="sticky-bar">
            <button
              className="close-button"
              onClick={() => setShowModalExtra(false)}
            >
              {" "}
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </div>
          <div className="row gy-4">
            {/* Casa Carmela */}
            <div className="col-12">
              <div className="card d-flex flex-row align-items-center">
                <img
                  src="https://www.visitvalencia.com/sites/default/files/crm-images/GALERIA_Casa%20Carmela_3.png"
                  className="img-fluid rounded-start"
                  alt="Casa Carmela"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body py-2">
                  <h5 className="card-title mb-1">🍽️ Casa Carmela</h5>
                  <p className="card-text small mb-1">
                    Paella tradizionale cotta su fuoco a legna
                  </p>
                  <a
                    href="https://maps.app.goo.gl/YSJuRCJAq8yDg3HTA"
                    className="card-link text-primary small"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Apri su Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* ALENAR */}
            <div className="col-12">
              <div className="card d-flex flex-row align-items-center">
                <img
                  src="https://alenarbodega.com/wp-content/uploads/2022/11/local-1.jpg"
                  className="img-fluid rounded-start"
                  alt="ALENAR"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body py-2">
                  <h5 className="card-title mb-1">
                    🍷 ALENAR 
                  </h5>
                  <p className="card-text small mb-1">
                    Tapas fresche e vini locali
                  </p>
                  <a
                    href="https://maps.app.goo.gl/RwUQvPhjCJx9pqGp7"
                    className="card-link text-primary small"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Apri su Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Gulliver */}
            <div className="col-12">
              <div className="card d-flex flex-row align-items-center">
                <img
                  src="https://www.visitvalencia.com/sites/default/files/media/media-images/images/PARQUE-GULLIVER-VALENCIA.jpg"
                  className="img-fluid rounded-start"
                  alt="Parque Gulliver"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body py-2">
                  <h5 className="card-title mb-1">🎠 Parque Gulliver</h5>
                  <p className="card-text small mb-1">
                    Parco giochi gigante gratuito
                  </p>
                  <a
                    href="https://maps.app.goo.gl/vGEDweuPXStEB95u7"
                    className="card-link text-primary small"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Apri su Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Plaza de Toros */}
            <div className="col-12">
              <div className="card d-flex flex-row align-items-center">
                <img
                  src="https://www.guidavalencia.com/wp-content/uploads/plaza-toros-valencia.jpg"
                  className="img-fluid rounded-start"
                  alt="Plaza de Toros"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body py-2">
                  <h5 className="card-title mb-1">🏛️ Plaza de Toros</h5>
                  <p className="card-text small mb-1">
                    Storica arena neoclassica
                  </p>
                  <a
                    href="https://maps.app.goo.gl/46FdkWAaXsdeESYF6"
                    className="card-link text-primary small"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📍 Apri su Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
