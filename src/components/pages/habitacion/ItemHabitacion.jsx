import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { eliminarHabitacion } from "../../../helpers/queries";
import Swal from "sweetalert2";

const ItemHabitacion = ({ habitacion, fila, actualizarTabla }) => {
  const borrarHabitacion = () => {
    Swal.fire({
      title: "¿Está seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminarlo",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarHabitacion(habitacion.id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Habitación Eliminada",
            text: `La habitación ${habitacion.id} fue eliminada con éxito`,
            icon: "success",
          });
          window.location.reload();
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `La habitación ${habitacion.id} no pudo eliminarse, intente nuevamente más tarde.`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center align-content-center">{fila}</td>
      <td className="text-center align-content-center">{habitacion.tipo}</td>
      <td className="text-center align-content-center">
        {habitacion.capacidad}
      </td>
      <td className="text-center align-content-center d-none d-md-table-cell">
        <img
          src={habitacion.imagen}
          className="img-fluid"
          style={{
            maxWidth: "80px",
            maxHeight: "60px",
            objectFit: "cover",
          }}
          alt={habitacion.tipo}
        ></img>
      </td>
      <td className="text-center align-content-center">
        <small className="d-block d-sm-none">$</small>
        <span className="d-none d-sm-inline">$</span>
        {habitacion.precioPorNoche}
      </td>
      <td className="text-center align-content-center">
        <Badge
          bg={habitacion.reserva ? "danger" : "success"}
          className="d-none d-sm-inline"
        >
          {habitacion.reserva ? "Ocupada" : "Disponible"}
        </Badge>
        <Badge
          bg={habitacion.reserva ? "danger" : "success"}
          className="d-sm-none"
        >
          {habitacion.reserva ? "Ocupada" : "Libre"}
        </Badge>
      </td>
      <td className="text-center">
        <div className="d-flex flex-column flex-sm-row gap-1 justify-content-center">
          <Link
            className="btn btn-warning btn-sm"
            to={`/administrador/editar/${habitacion.id}`}
          >
            <i className="bi bi-pencil-square"></i>
            <span className="d-none d-lg-inline ms-1">Editar</span>
          </Link>
          <Button className="btn btn-danger btn-sm" onClick={borrarHabitacion}>
            <i className="bi bi-trash"></i>
            <span className="d-none d-lg-inline ms-1">Eliminar</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemHabitacion;
