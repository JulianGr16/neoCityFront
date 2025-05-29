import { Button } from "react-bootstrap";

const ItemHabitacion = ({habitacion, fila}) => {
  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{habitacion.tipo}</td>
      <td className="text-end">{habitacion.numero}</td>
      <td className="text-center">
        <img
          src={habitacion.imagen}
          className="w-75"
          alt={habitacion.tipo}
        ></img>
      </td>
      <td>${habitacion.precioPorNoche}</td>
      <td className="text-center">
        <Button variant="warning" className="me-lg-2">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="danger">
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemHabitacion;
