import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemHabitacion = ({habitacion, fila}) => {
  return (
    <tr>
      <td className="text-center align-content-center">{fila}</td>
      <td className="text-center align-content-center">{habitacion.tipo}</td>
      <td className="text-center align-content-center">{habitacion.capacidad}</td>
      <td className="text-center align-content-center">
        <img
          src={habitacion.imagen}
          className="w-25"
          alt={habitacion.tipo}
        ></img>
      </td>
      <td className="text-center align-content-center">${habitacion.precioPorNoche}</td>
      <td className="text-center">
        <Link className="me-lg-2 btn btn-warning my-2" to={`/administrador/editar/${habitacion.id}`}>
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Link className="me-lg-2 btn btn-danger" to={'/administrador/eliminar'}>
          <i className="bi bi-trash"></i>
        </Link>
      </td>
    </tr>
  );
};

export default ItemHabitacion;
