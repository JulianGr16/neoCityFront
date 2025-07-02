import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Alert, Button, Modal, Form } from "react-bootstrap";
import { leerReservasUsuario, obtenerHabitacion, editarReserva, eliminarReserva } from "../../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../App.css";

const MisReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState({});
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);

  const usuarioLogueado = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  const fechaCheckIn = watch("fechaCheckIn");
  const fechaCheckOut = watch("fechaCheckOut");

  useEffect(() => {
    if (usuarioLogueado?.id) {
      cargarReservas();
    }
  }, [usuarioLogueado?.id]);

  const cargarReservas = async () => {
    try {
      const respuestaReservas = await leerReservasUsuario(usuarioLogueado.id);
      if (respuestaReservas.status === 200) {
        const reservasData = await respuestaReservas.json();
        setReservas(reservasData);

        const habitacionesData = {};
        for (const reserva of reservasData) {
          if (!habitacionesData[reserva.habitacionId]) {
            const respuestaHabitacion = await obtenerHabitacion(reserva.habitacionId);
            if (respuestaHabitacion.status === 200) {
              const habitacionData = await respuestaHabitacion.json();
              habitacionesData[reserva.habitacionId] = habitacionData;
            }
          }
        }
        setHabitaciones(habitacionesData);
      }
    } catch (error) {
      console.error("Error al cargar las reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  const calcularNoches = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const inicio = new Date(checkIn);
    const fin = new Date(checkOut);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  };

  const abrirModalEditar = (reserva) => {
    setReservaEditando(reserva);
    setValue("fechaCheckIn", reserva.fechaCheckIn);
    setValue("fechaCheckOut", reserva.fechaCheckOut);
    setValue("cantidadPersonas", reserva.cantidadPersonas);
    setShowEditModal(true);
  };

  const cerrarModalEditar = () => {
    setShowEditModal(false);
    setReservaEditando(null);
    reset();
  };

  const onSubmitEditar = async (data) => {
    try {
      const cantidadNoches = calcularNoches(data.fechaCheckIn, data.fechaCheckOut);
      const habitacion = habitaciones[reservaEditando.habitacionId];
      const precioTotal = cantidadNoches * parseFloat(habitacion.precioPorNoche);

      const reservaActualizada = {
        ...reservaEditando,
        fechaCheckIn: data.fechaCheckIn,
        fechaCheckOut: data.fechaCheckOut,
        cantidadPersonas: parseInt(data.cantidadPersonas),
        cantidadNoches: cantidadNoches,
        precioTotal: precioTotal
      };

      const respuesta = await editarReserva(reservaActualizada, reservaEditando.id);
      
      if (respuesta.status === 200) {
        Swal.fire({
          title: "¡Reserva modificada!",
          text: "Tu reserva ha sido actualizada exitosamente.",
          icon: "success",
        });
        cerrarModalEditar();
        cargarReservas();
      } else {
        throw new Error("Error al modificar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo modificar la reserva. Intenta nuevamente más tarde.",
        icon: "error",
      });
    }
  };

  const cancelarReserva = (reserva) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer. Tu reserva será cancelada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar reserva",
      cancelButtonText: "No, mantener reserva"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await eliminarReserva(reserva.id);
          
          if (respuesta.status === 200) {
            Swal.fire({
              title: "¡Reserva cancelada!",
              text: "Tu reserva ha sido cancelada exitosamente.",
              icon: "success",
            });
            cargarReservas();
          } else {
            throw new Error("Error al cancelar la reserva");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo cancelar la reserva. Intenta nuevamente más tarde.",
            icon: "error",
          });
        }
      }
    });
  };

  const confirmarReserva = async (reserva) => {
    try {
      const reservaActualizada = {
        ...reserva,
        estado: "confirmada"
      };

      const respuesta = await editarReserva(reservaActualizada, reserva.id);
      
      if (respuesta.status === 200) {
        Swal.fire({
          title: "¡Reserva confirmada!",
          text: "Tu reserva ha sido confirmada exitosamente.",
          icon: "success",
        });
        cargarReservas();
      } else {
        throw new Error("Error al confirmar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo confirmar la reserva. Intenta nuevamente más tarde.",
        icon: "error",
      });
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearFechaInput = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'confirmada':
        return <Badge bg="success">Confirmada</Badge>;
      case 'pendiente':
        return <Badge bg="warning">Pendiente</Badge>;
      case 'cancelada':
        return <Badge bg="danger">Cancelada</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = formatearFechaInput(tomorrow);

  const getMinCheckOut = () => {
    if (!fechaCheckIn) return minDate;
    const checkInDate = new Date(fechaCheckIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return formatearFechaInput(checkInDate);
  };

  if (loading) {
    return (
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando tus reservas...</p>
        </div>
      </Container>
    );
  }

  if (!usuarioLogueado) {
    return (
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Alert variant="warning">
          <Alert.Heading>Acceso denegado</Alert.Heading>
          <p>Debes iniciar sesión para ver tus reservas.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="flex-grow-1 py-4">
        <h1 className="text-center mb-4">
          <i className="bi bi-calendar-check me-2"></i>
          Mis Reservas
        </h1>
        
        {reservas.length === 0 ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <Alert variant="info" className="text-center">
                <Alert.Heading>No tienes reservas</Alert.Heading>
                <p>
                  Aún no has realizado ninguna reserva. ¡Explora nuestro catálogo de habitaciones y realiza tu primera reserva!
                </p>
              </Alert>
            </Col>
          </Row>
        ) : (
          <Row>
            {reservas.map((reserva, index) => {
              const habitacion = habitaciones[reserva.habitacionId];
              return (
                <Col key={reserva.id} lg={6} xl={4} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    {habitacion && (
                      <Card.Img
                        variant="top"
                        src={habitacion.imagen}
                        style={{ height: "200px", objectFit: "cover" }}
                        alt={habitacion.tipo}
                      />
                    )}
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title>
                          {habitacion ? habitacion.tipo : 'Cargando...'}
                        </Card.Title>
                        {getEstadoBadge(reserva.estado)}
                      </div>
                      
                      <Card.Text className="mb-2">
                        <strong>Reserva #{index + 1}</strong>
                      </Card.Text>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-people me-1"></i>
                          {reserva.cantidadPersonas} {reserva.cantidadPersonas === 1 ? 'persona' : 'personas'}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-calendar-event me-1"></i>
                          Check-in: {formatearFecha(reserva.fechaCheckIn)}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-calendar-x me-1"></i>
                          Check-out: {formatearFecha(reserva.fechaCheckOut)}
                        </small>
                      </div>
                      
                      <div className="mb-2">
                        <small className="text-muted">
                          <i className="bi bi-moon me-1"></i>
                          {reserva.cantidadNoches} {reserva.cantidadNoches === 1 ? 'noche' : 'noches'}
                        </small>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="border-top pt-2">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Total pagado:</span>
                            <span className="h5 mb-0 text-primary">
                              ${reserva.precioTotal.toLocaleString()}
                            </span>
                          </div>
                          
                          {reserva.estado === 'pendiente' && (
                            <div className="d-flex gap-2 mb-2">
                              <Button
                                variant="success"
                                size="sm"
                                className="w-100"
                                onClick={() => confirmarReserva(reserva)}
                              >
                                <i className="bi bi-check-circle me-1"></i>
                                Confirmar Reserva
                              </Button>
                            </div>
                          )}
                          
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="flex-fill"
                              onClick={() => abrirModalEditar(reserva)}
                              disabled={reserva.estado === 'cancelada'}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Modificar
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="flex-fill"
                              onClick={() => cancelarReserva(reserva)}
                              disabled={reserva.estado === 'cancelada'}
                            >
                              <i className="bi bi-x-circle me-1"></i>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      <Modal show={showEditModal} onHide={cerrarModalEditar} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Modificar Reserva #{reservas.findIndex(r => r.id === reservaEditando?.id) + 1}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {reservaEditando && habitaciones[reservaEditando.habitacionId] && (
            <div className="row">
              <div className="col-md-5">
                <img
                  src={habitaciones[reservaEditando.habitacionId].imagen}
                  alt={habitaciones[reservaEditando.habitacionId].tipo}
                  className="img-fluid rounded mb-3"
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">{habitaciones[reservaEditando.habitacionId].tipo}</h6>
                    <p className="card-text mb-1">
                      <i className="bi bi-people me-1"></i>
                      Capacidad máxima: {habitaciones[reservaEditando.habitacionId].capacidad} personas
                    </p>
                    <p className="card-text">
                      <i className="bi bi-currency-dollar me-1"></i>
                      ${parseFloat(habitaciones[reservaEditando.habitacionId].precioPorNoche).toLocaleString()} por noche
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-7">
                <Form onSubmit={handleSubmit(onSubmitEditar)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad de personas *</Form.Label>
                    <Form.Select
                      {...register("cantidadPersonas", {
                        required: "Debe seleccionar la cantidad de personas"
                      })}
                    >
                      <option value="">Seleccione cantidad de personas</option>
                      {[...Array(parseInt(habitaciones[reservaEditando.habitacionId].capacidad))].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} {index + 1 === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text className="text-danger">
                      {errors.cantidadPersonas?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Check-in *</Form.Label>
                    <Form.Control
                      type="date"
                      min={minDate}
                      {...register("fechaCheckIn", {
                        required: "La fecha de check-in es obligatoria",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.fechaCheckIn?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Check-out *</Form.Label>
                    <Form.Control
                      type="date"
                      min={getMinCheckOut()}
                      {...register("fechaCheckOut", {
                        required: "La fecha de check-out es obligatoria",
                        validate: (value) => {
                          if (!fechaCheckIn) return true;
                          return new Date(value) > new Date(fechaCheckIn) || 
                                 "La fecha de check-out debe ser posterior al check-in";
                        }
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.fechaCheckOut?.message}
                    </Form.Text>
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={cerrarModalEditar}>
                      Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                      <i className="bi bi-check-circle me-1"></i>
                      Guardar Cambios
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MisReservas;
