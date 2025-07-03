import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Alert, Table, Button } from "react-bootstrap";
import { leerReservas, obtenerHabitacion } from "../../helpers/queries";
import { useNavigate } from "react-router-dom";
import { obtenerUsuario } from "../../helpers/queries";
import Swal from "sweetalert2";
import "../../App.css";

const GestionReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState({});
  const [usuarios, setUsuarios] = useState({});
  const [loading, setLoading] = useState(true);

  const navegacion = useNavigate();

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const respuestaReservas = await leerReservas();
      if (respuestaReservas.status === 200) {
        const reservasData = await respuestaReservas.json();
        setReservas(reservasData);

        const habitacionesData = {};
        const usuariosData = {};
        
        for (const reserva of reservasData) {
          if (!habitacionesData[reserva.habitacionId]) {
            const respuestaHabitacion = await obtenerHabitacion(reserva.habitacionId);
            if (respuestaHabitacion.status === 200) {
              const habitacionData = await respuestaHabitacion.json();
              habitacionesData[reserva.habitacionId] = habitacionData;
            }
          }

          if (!usuariosData[reserva.usuarioId]) {
            try {
              const respuestaUsuario = await obtenerUsuario(reserva.usuarioId);
              if (respuestaUsuario.status === 200) {
                const usuarioData = await respuestaUsuario.json();
                usuariosData[reserva.usuarioId] = usuarioData;
              }
            } catch (error) {
              console.error("Error al cargar usuario:", error);
              usuariosData[reserva.usuarioId] = { nombreUsuario: "Usuario no encontrado" };
            }
          }
        }
        
        setHabitaciones(habitacionesData);
        setUsuarios(usuariosData);
      }
    } catch (error) {
      console.error("Error al cargar las reservas:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar las reservas.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (loading) {
    return (
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando reservas...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="mainAdmin py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <h1 className="text-center mb-0">
              <i className="bi bi-calendar-check me-2"></i>
              Gestión de Reservas
            </h1>
            <Button 
              variant="secondary"
              onClick={() => navegacion("/administrador")}
              className="w-auto"
            >
              <i className="bi bi-arrow-left me-1"></i>
              Volver al Admin
            </Button>
          </div>
        </div>
      </div>
      
      {reservas.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No hay reservas registradas</Alert.Heading>
          <p>Aún no se han realizado reservas en el sistema.</p>
        </Alert>
      ) : (
        <>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr className="text-center">
                  <th>#</th>
                  <th>Usuario</th>
                  <th className="d-none d-md-table-cell">Habitación</th>
                  <th className="d-md-none">Hab.</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th className="d-none d-lg-table-cell">Personas</th>
                  <th className="d-lg-none">Pers.</th>
                  <th className="d-none d-lg-table-cell">Noches</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="d-none d-md-table-cell">Fecha Reserva</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => {
                  const habitacion = habitaciones[reserva.habitacionId];
                  const usuario = usuarios[reserva.usuarioId];
                  
                  return (
                    <tr key={reserva.id} className="text-center align-middle">
                      <td><strong>{index + 1}</strong></td>
                      <td>
                        <div className="text-start">
                          <div className="fw-bold">{usuario?.nombreUsuario || 'Cargando...'}</div>
                          <small className="text-muted d-none d-md-block">{usuario?.email || ''}</small>
                        </div>
                      </td>
                      <td>
                        <div className="text-start">
                          <div className="fw-bold">{habitacion?.tipo || 'Cargando...'}</div>
                          <small className="text-muted d-none d-md-block">
                            Capacidad: {habitacion?.capacidad || 0} personas
                          </small>
                        </div>
                      </td>
                      <td><small>{formatearFecha(reserva.fechaCheckIn)}</small></td>
                      <td><small>{formatearFecha(reserva.fechaCheckOut)}</small></td>
                      <td>
                        <i className="bi bi-people me-1 d-none d-lg-inline"></i>
                        {reserva.cantidadPersonas}
                      </td>
                      <td className="d-none d-lg-table-cell">
                        <i className="bi bi-moon me-1"></i>
                        {reserva.cantidadNoches}
                      </td>
                      <td>
                        <strong className="text-success">
                          <small className="d-md-none">$</small>
                          <span className="d-none d-md-inline">$</span>
                          {reserva.precioTotal.toLocaleString()}
                        </strong>
                      </td>
                      <td>{getEstadoBadge(reserva.estado)}</td>
                      <td className="d-none d-md-table-cell">
                        <small className="text-muted">
                          {formatearFecha(reserva.fechaReserva)}
                        </small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          
          <div className="mt-4 p-3 bg-light rounded">
            <Row>
              <Col xs={6} md={3}>
                <div className="text-center">
                  <h5 className="text-primary mb-1">{reservas.length}</h5>
                  <small className="text-muted">Total Reservas</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center">
                  <h5 className="text-success mb-1">
                    {reservas.filter(r => r.estado === 'confirmada').length}
                  </h5>
                  <small className="text-muted">Confirmadas</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center">
                  <h5 className="text-warning mb-1">
                    {reservas.filter(r => r.estado === 'pendiente').length}
                  </h5>
                  <small className="text-muted">Pendientes</small>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <div className="text-center">
                  <h5 className="text-success mb-1">
                    ${reservas.reduce((total, reserva) => total + reserva.precioTotal, 0).toLocaleString()}
                  </h5>
                  <small className="text-muted">Ingresos Totales</small>
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default GestionReservas;
