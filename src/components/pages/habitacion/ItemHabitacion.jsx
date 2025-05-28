import { Button } from "react-bootstrap";

const ItemHabitacion = () => {
  return (
    <tr>
      <td className="text-center">11</td>
      <td>Suite Junior</td>
      <td className="text-end">2</td>
      <td className="text-center">
        <img
          src="https://beltafrajumar.com/wp-content/uploads/2024/03/Como-decorar-una-habitacion-de-un-hotel.jpg"
          className="w-75"
          alt="habitacion hotel"
        ></img>
      </td>
      <td>$15000</td>
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
