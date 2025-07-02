import React, { useState, useEffect } from "react";
import "../../App.css";
import { Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
import { leerHabitacion } from "../../helpers/queries";
import ModalReserva from "./ModalReserva";
import Swal from "sweetalert2";

const CatalogoHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  const usuarioLogueado = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const cargarHabitaciones = async () => {
    try {
      const respuesta = await leerHabitacion();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setHabitaciones(datos);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las habitaciones. Intenta más tarde.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al cargar las habitaciones.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const abrirModalReserva = (habitacion) => {
    if (!usuarioLogueado) {
      Swal.fire({
        title: "Inicio de sesión requerido",
        text: "Debes iniciar sesión para realizar una reserva.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ir a Login",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    if (usuarioLogueado.esAdmin) {
      Swal.fire({
        title: "Acceso denegado",
        text: "Los administradores no pueden realizar reservas.",
        icon: "info",
      });
      return;
    }

    setHabitacionSeleccionada(habitacion);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setHabitacionSeleccionada(null);
  };

  if (loading) {
    return (
      <section className="container-fluid section-card py-4 flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-white" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-white mt-2">Cargando habitaciones disponibles...</p>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="container-fluid section-card py-4 flex-grow-1">
        <article className="container-fluid w-75">
          <h2 className="text-center text-white fw-bolder my-3 border rounded border-black bg-dark opacity-75 py-3">
            HABITACIONES DISPONIBLES
          </h2>
        </article>
        
        <article className="container d-flex justify-content-center">
          {habitaciones.length === 0 ? (
            <Alert variant="info" className="text-center w-75">
              <Alert.Heading>No hay habitaciones disponibles</Alert.Heading>
              <p>
                Actualmente no hay habitaciones disponibles para reservar. 
                El administrador no ha agregado habitaciones o todas están ocupadas. 
                Por favor, vuelve más tarde.
              </p>
            </Alert>
          ) : (
            <Row className="justify-content-center">
              {habitaciones.map((habitacion) => (
                <Col key={habitacion.id} className="mb-4 d-flex justify-content-center">
                  <Card style={{ width: "18rem", height: "100%" }}>
                    <Card.Img 
                      variant="top" 
                      src={habitacion.imagen} 
                      style={{ height: "200px", objectFit: "cover" }} 
                      loading="lazy"
                      alt={habitacion.tipo}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title>{habitacion.tipo}</Card.Title>
                        <Badge bg={habitacion.reserva ? "danger" : "success"}>
                          {habitacion.reserva ? "Ocupada" : "Disponible"}
                        </Badge>
                      </div>
                      
                      <Card.Text className="flex-grow-1">
                        <small className="text-muted">
                          <i className="bi bi-people me-1"></i>
                          Capacidad: {habitacion.capacidad} personas
                        </small>
                        <br />
                        <small className="text-muted">
                          <i className="bi bi-calendar-event me-1"></i>
                          Disponible desde: {new Date(habitacion.fecha).toLocaleDateString('es-ES')}
                        </small>
                      </Card.Text>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="h5 text-primary mb-0">
                            ${parseFloat(habitacion.precioPorNoche).toLocaleString()}
                          </span>
                          <small className="text-muted">por noche</small>
                        </div>
                        
                        <Button 
                          variant={habitacion.reserva ? "secondary" : "primary"}
                          className="w-100"
                          onClick={() => abrirModalReserva(habitacion)}
                          disabled={habitacion.reserva}
                        >
                          <i className={`bi ${habitacion.reserva ? "bi-lock" : "bi-calendar-check"} me-1`}></i>
                          {habitacion.reserva ? "No disponible" : "Reservar"}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </article>
      </section>

      <ModalReserva
        show={showModal}
        onHide={cerrarModal}
        habitacion={habitacionSeleccionada}
        usuarioLogueado={usuarioLogueado}
      />
    </>
  );
};

export default CatalogoHabitaciones;
