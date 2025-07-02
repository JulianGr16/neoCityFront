import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../App.css";

const Foot = () => {
  return (
    <footer className="bg-dark text-white">
      <section className="container-fluid text-center mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <h4>Redes sociales</h4>
            <div className="d-flex justify-content-center">
              <div className="fs-4 mx-2">
                <i className="bi bi-instagram"></i>
              </div>
              <div className="fs-4 mx-2">
                <i className="bi bi-linkedin"></i>
              </div>
              <div className="fs-4 mx-2">
                <i className="bi bi-facebook"></i>
              </div>
              <div className="fs-4 mx-2">
                <i className="bi bi-twitter-x"></i>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>Enlaces útiles</h4>
            <div className=" lista-preguntas">
              <li>Política de privacidad</li>
              <li>Términos y condiciones</li>
              <li>Preguntas frecuentes</li>
              <li></li>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>Servicios y amenities</h4>
            <div className=" lista-preguntas">
              <li>Wifi grauito</li>
              <li>Gimnasio</li>
              <li>Piscina</li>
              <li>Restaurante</li>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>Información del contacto</h4>
            <div className=" lista-preguntas">
              <li>Dirección:Salta 78 - San Miguel de Tucuman</li>
              <li>Teléfono:+5438155689</li>
              <li>Correo electrónico:info@hotel.com</li>
              <li>Restaurante</li>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-2 text-center  border-top border-black border-opacity-25 pb-2">
        <h6 className="mt-2">©TODOS LOS DERECHOS RESERVADOS</h6>
      </section>
    </footer>
  );
};

export default Foot;
