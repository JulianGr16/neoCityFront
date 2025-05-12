import React from "react";
import "../../App.css";
import CardHabitaciones from "./componentesIndex/CardHabitaciones";
import CardRestaurante from "./componentesIndex/CardRestaurante";
import CardVistas from "./componentesIndex/CardVistas";


const Index = () => {
  return (
    <>
      <section className="mainSection text-center text-white">
        <article className="container-fluid w-75 border rounded border-black bg-dark opacity-75 my-3">
          <h2>Tu Hogar Lejos de Casa</h2>
          <p>
            En el corazón de la ciudad, nuestro hotel no es solo un lugar para
            dormir: es un espacio diseñado para ofrecerte una experiencia
            inolvidable. Ya sea que viajes por negocios, en familia o en una
            escapada romántica, te invitamos a relajarte en un ambiente moderno,
            acogedor y lleno de detalles pensados para ti. Desde el momento en
            que entras, serás recibido con una cálida sonrisa y una atención
            personalizada que nos diferencia. Nuestras habitaciones combinan
            diseño contemporáneo con confort total, y cada rincón del hotel está
            concebido para que te sientas como en casa… o incluso mejor.
          </p>
        </article>
      </section>
      <section className="container-fluid section-card py-4">
        <div className="row d-flex justify-content-center py3">
         <CardHabitaciones></CardHabitaciones>
         <CardRestaurante></CardRestaurante>
         <CardVistas></CardVistas>
        </div>
      </section>
      <section className="container-fluid section-comentarios">
        <h3 className="text-center text-white fw-bolder my-3">COMENTARIOS DESTACADOS</h3>
        <div className="row d-flex justify-content-around">
          <div className="col-sm-12 col-md-4 my-2 ">
             <div className="border bg-white text-black rounded py-2">
              <i class="bi bi-person fw-bold ">CARLOS PEREZ:</i>
            Excelente servicio!!
             </div>
          </div>
          <div className="col-sm-12 col-md-4 my-2 ">
            <div className="border bg-white text-black rounded py-2">
               <i class="bi bi-person fw-bold">MARINA SALAS:</i>
            la verdad que muy recomendable!
            </div>
          </div>
          <div className="col-sm-12 col-md-4 my-2">
             <div className="border bg-white text-black rounded">
              <i class="bi bi-person fw-bold">HECTOR VAQUERO:</i>
            Me lo recomendo un colega del trabajo... 10 puntos!!
             </div>
          </div>
          <div className="col-sm-12 col-md-4 my-2 ">
             <div className="border bg-white text-black rounded py-2">
              <i class="bi bi-person fw-bold">MARIO RODRIGUEZ:</i>
            mi familia ya quiere volver al hotel!!
             </div>
          </div>
          <div className="col-sm-12 col-md-4 my-2 ">
             <div className="border bg-white text-black rounded">
              <i class="bi bi-person fw-bold">PEDRO CAMPOS:</i>y lo mejor de todo
            son sus promociones en fechas importante
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
