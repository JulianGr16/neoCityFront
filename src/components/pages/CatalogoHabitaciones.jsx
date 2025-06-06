import React from "react";
import "../../App.css";
import {Row, Col, Card, Button } from "react-bootstrap";
import Suite from "../../assets/banner-habitaciones/habitacion-suite.webp";
import Premium from "../../assets/banner-habitaciones/habitacion-premium.webp";
import Standard from "../../assets/banner-habitaciones/habitacion-standard.webp";
import Presidencial from "../../assets/banner-habitaciones/habitacion-presidencial.webp";

const CatalogoHabitaciones = () => {
  return (
    <>
      <section className="container-fluid section-card py-4 flex-grow-1">
        <article className="container-fluid w-75 ">
          <h2 className="text-center text-white fw-bolder my-3 border rounded border-black bg-dark opacity-75 py-3">
            HABITACIONES
          </h2>
        </article>
        <article className="container d-flex justify-content-center">
          <Row className="justify-content-center">
            <Col className="mb-4 d-flex justify-content-center">
              <Card style={{ width: "18rem", height: "100%" }}>
                <Card.Img variant="top" src={Suite} style={{ height: "200px", objectFit: "cover" }} loading="lazy"/>
                <Card.Body >
                  <Card.Title>Suite</Card.Title>
                  <Card.Text>
                    Elegante y espaciosa, con cama king size, iluminación cálida y detalles modernos. Ideal para una estadía exclusiva.
                  </Card.Text>
                  <Button variant="primary">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mb-4 d-flex justify-content-center">
              <Card style={{ width: "18rem", height: "100%" }}>
                <Card.Img variant="top" src={Premium} style={{ height: "200px", objectFit: "cover" }} loading="lazy"/>
                <Card.Body>
                  <Card.Title>Premuim</Card.Title>
                  <Card.Text>
                    Amplia y luminosa, con cama grande, zona de descanso y balcón privado. Ideal para relajarse con estilo.
                  </Card.Text>
                  <Button variant="primary">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mb-4 d-flex justify-content-center">
              <Card style={{ width: "18rem", height: "100%" }}>
                <Card.Img variant="top" src={Standard} style={{ height: "200px", objectFit: "cover" }} loading="lazy"/>
                <Card.Body>
                  <Card.Title>Standard</Card.Title>
                  <Card.Text>
                    Moderna y funcional, con cama doble, decoración minimalista y baño completo. Ideal para quienes buscan confort y simplicidad.
                  </Card.Text>
                  <Button variant="primary">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mb-4 d-flex justify-content-center">
              <Card style={{ width: "18rem", height: "100%" }}>
                <Card.Img variant="top" src={Presidencial} style={{ height: "200px", objectFit: "cover" }} loading="lazy"/>
                <Card.Body>
                  <Card.Title>Presidencial</Card.Title>
                  <Card.Text>
                    Lujosa y panorámica, con cama king, terraza privada y detalles premium. Diseñada para vivir una experiencia inigualable.
                  </Card.Text>
                  <Button variant="primary">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </article>
      </section>
    </>
  );
};

export default CatalogoHabitaciones;
