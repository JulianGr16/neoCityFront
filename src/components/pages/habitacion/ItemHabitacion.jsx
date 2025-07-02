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
      <td className="text-center align-content-center">
        <img
          src={habitacion.imagen}
          className="w-25"
          alt={habitacion.tipo}
        ></img>
      </td>
      <td className="text-center align-content-center">
        ${habitacion.precioPorNoche}
      </td>
      <td className="text-center align-content-center">
        <Badge bg={habitacion.reserva ? "danger" : "success"}>
          {habitacion.reserva ? "Ocupada" : "Disponible"}
        </Badge>
      </td>
      <td className="text-center">
        <Link
          className="me-lg-2 btn btn-warning my-2"
          to={`/administrador/editar/${habitacion.id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button className="me-lg-2 btn btn-danger" onClick={borrarHabitacion}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemHabitacion;
