import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { eliminarHabitacion, leerHabitacion } from "../../../helpers/queries";
import Swal from "sweetalert2";

const ItemHabitacion = ({ habitacion, fila, actualizarTabla }) => {
  const borrarHabitacion = () => {
    Swal.fire({
      title: "Esta seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!",
      cancelButtonText: "No, Cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarHabitacion(habitacion.id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Habitacion Eliminada!",
            text: `La habitacion ${habitacion.id} fue eliminada con exito`,
            icon: "success",
          });
          //actualiza la tabla del administrador
          const respuestaHabitaciones = await leerHabitacion()
          if(respuestaHabitaciones.status === 200){
            const habitacionesActualizadas = await respuestaHabitaciones.json()
            actualizarTabla(habitacionesActualizadas)
          }
        }else{
          Swal.fire({
            title: "Ocurrio un error",
            text: `La habitacion ${habitacion.id} no pudo eliminarse, intente nuevamente mas tarde.`,
            icon: "error",
          })
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
