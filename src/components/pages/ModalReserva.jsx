import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearReserva } from "../../helpers/queries";
import Swal from "sweetalert2";

const ModalReserva = ({ show, onHide, habitacion, usuarioLogueado }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const fechaCheckIn = watch("fechaCheckIn");
  const fechaCheckOut = watch("fechaCheckOut");
  const cantidadPersonas = watch("cantidadPersonas");

  const calcularNoches = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const inicio = new Date(checkIn);
    const fin = new Date(checkOut);
    const diferencia = fin.getTime() - inicio.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  };

  const cantidadNoches = calcularNoches(fechaCheckIn, fechaCheckOut);
  const precioTotal = cantidadNoches * parseFloat(habitacion?.precioPorNoche || 0);

  const formatearFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const day = fecha.getDate();
    
    const monthStr = month < 10 ? '0' + month : month;
    const dayStr = day < 10 ? '0' + day : day;
    
    return year + '-' + monthStr + '-' + dayStr;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const reservaData = {
        usuarioId: usuarioLogueado.id,
        habitacionId: habitacion.id,
        fechaReserva: formatearFecha(new Date()),
        fechaCheckIn: data.fechaCheckIn,
        fechaCheckOut: data.fechaCheckOut,
        cantidadPersonas: parseInt(data.cantidadPersonas),
        cantidadNoches: cantidadNoches,
        precioTotal: precioTotal,
        estado: "pendiente"
      };

      const respuesta = await crearReserva(reservaData);
      
      if (respuesta.status === 201) {
        Swal.fire({
          title: "¡Reserva creada!",
          text: `Tu reserva para ${habitacion.tipo} está pendiente de confirmación. Puedes confirmarla desde "Mis Reservas".`,
          icon: "success",
        });
        reset();
        onHide();
      } else {
        throw new Error("Error al crear la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo completar la reserva. Intenta nuevamente más tarde.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = formatearFecha(tomorrow);

  const getMinCheckOut = () => {
    if (!fechaCheckIn) return minDate;
    const checkInDate = new Date(fechaCheckIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return formatearFecha(checkInDate);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-calendar-check me-2"></i>
          Reservar {habitacion?.tipo}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {habitacion && (
          <div className="row">
            <div className="col-md-5">
              <img
                src={habitacion.imagen}
                alt={habitacion.tipo}
                className="img-fluid rounded mb-3"
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
              />
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{habitacion.tipo}</h6>
                  <p className="card-text mb-1">
                    <i className="bi bi-people me-1"></i>
                    Capacidad máxima: {habitacion.capacidad} personas
                  </p>
                  <p className="card-text">
                    <i className="bi bi-currency-dollar me-1"></i>
                    ${parseFloat(habitacion.precioPorNoche).toLocaleString()} por noche
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-7">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Cantidad de personas *</Form.Label>
                  <Form.Select
                    {...register("cantidadPersonas", {
                      required: "Debe seleccionar la cantidad de personas",
                      min: {
                        value: 1,
                        message: "Mínimo 1 persona"
                      },
                      max: {
                        value: parseInt(habitacion.capacidad),
                        message: `Máximo ${habitacion.capacidad} personas para esta habitación`
                      }
                    })}
                  >
                    <option value="">Seleccione cantidad de personas</option>
                    {[...Array(parseInt(habitacion.capacidad))].map((_, index) => (
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

                {cantidadNoches > 0 && cantidadPersonas && (
                  <Alert variant="info">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div>
                          <i className="bi bi-people me-1"></i>
                          {cantidadPersonas} {cantidadPersonas === "1" ? 'persona' : 'personas'}
                        </div>
                        <div>
                          <i className="bi bi-moon me-1"></i>
                          {cantidadNoches} {cantidadNoches === 1 ? 'noche' : 'noches'}
                        </div>
                      </div>
                      <strong className="h5 mb-0">
                        Total: ${precioTotal.toLocaleString()}
                      </strong>
                    </div>
                  </Alert>
                )}

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading || cantidadNoches <= 0 || !cantidadPersonas}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        Confirmar Reserva
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};


export default ModalReserva;
