import "../../App.css";
import { Row, Col, Card, Button } from "react-bootstrap";
import { leerHabitacion } from "../../helpers/queries";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CatalogoHabitaciones = () => {
  const [mostrarHabitaciones, setMostrarHabitaciones] = useState([]);

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  const obtenerHabitaciones = async () => {
    const respuesta = await leerHabitacion();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setMostrarHabitaciones(datos);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `No se pudieron obtener la lista de habitaciones, intente nuevamente mas tarde.`,
        icon: "error",
      });
    }
  };

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
            {mostrarHabitaciones.length > 0 ? (
              mostrarHabitaciones.map((habitacion) => (
                <Col
                  key={habitacion._id || habitacion.id}
                  className="mb-4 d-flex justify-content-center"
                >
                  <Card style={{ width: "18rem", height: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={habitacion.imagen}
                      style={{ height: "200px", objectFit: "cover" }}
                      loading="lazy"
                    />
                    <Card.Body>
                      <Card.Title>
                        {habitacion.tipo}
                      </Card.Title>
                      <Card.Text>
                        {habitacion.descripcion ||
                          "Habitación cómoda y acogedora"}
                        <br />
                        Precio: ${habitacion.precioPorNoche || "Consultar"}
                      </Card.Text>
                      <Button variant="primary">Reservar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <p>No hay habitaciones disponibles</p>
              </Col>
            )}
          </Row>
        </article>
      </section>
    </>
  );
};

export default CatalogoHabitaciones;
