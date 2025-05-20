import { Button } from "react-bootstrap";
import "../../App.css";
const Administrador = () => {
  return (
    <section className="container mainAdmin py-3">
      <h1 className="text-center">Administrador</h1>
      <hr />
      <article className="row">
        <div className="col-sm-12 col-md-12 my-3">
          <h2>Habitaciones</h2>
          <Button>Nueva Habitacion</Button>
        </div>
        <hr />
        <div className="col-sm-12 col-md-12 ">
          <h2>Usuarios</h2>
          <Button>Nueva Usuario</Button>
        </div>
      </article>
    </section>
  );
};

export default Administrador;
