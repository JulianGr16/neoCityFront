import { Button, Table } from "react-bootstrap";
import "../../App.css";
import ItemHabitacion from "./habitacion/ItemHabitacion";


const Administrador = () => {
  return (
    <section className="container mainAdmin py-3">
      <h1 className="text-center">Administrador</h1>
      <article className="row">
        <div className="col-sm-12 col-md-12 my-3">
          <h2>Habitaciones</h2>
          <Button>Nueva Habitacion</Button>
        </div>
        <hr />
        <Table responsive striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Numero Habitacion</th>
              <th>Tipo de Habitacion</th>
              <th>Capacidad de personas</th>
              <th>URL de Imagen</th>
              <th>Precio por noche</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              <ItemHabitacion></ItemHabitacion>
            }
          </tbody>
        </Table>
        <div className="col-sm-12 col-md-12 ">
          <h2>Usuarios</h2>
          <Button>Nueva Usuario</Button>
        </div>
      </article>
    </section>
  );
};

export default Administrador;
