import { Button, Table } from "react-bootstrap";
import "../../App.css";
import { useEffect, useState } from "react";
import { URLHabitaciones } from "../../helpers/queries";
import { Link} from "react-router-dom";
import { leerHabitacion } from "../../helpers/queries";
import ItemHabitacion from "./habitacion/ItemHabitacion";
import Swal from "sweetalert2";

const Administrador = () => {

  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(()=>{
    obtenerHabitaciones()
  },[])

  const  obtenerHabitaciones = async() => {
    const respuesta = await leerHabitacion()
    if(respuesta.status === 200){
      const datos = await respuesta.json()
      setHabitaciones(datos)
    }else{
      Swal.fire({
        title: "Ocurrio un error",
        text: `No se pudieron obtener la lista de habitaciones, intente nuevamente mas tarde.`,
        icon: "error",
      })
    }
  }

  return (
    <section className="container-fluid mainAdmin py-3">
      <h1 className="text-center">Administrador</h1>
      <article className="row">
        <div className="col-12 mb-3">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <h2 className="mb-2">
                Habitaciones 
                <Link to="/administrador/crear" className="btn btn-primary ms-2">
                  <i className="bi bi-file-earmark-plus"></i>
                  <span className="d-none d-sm-inline ms-1">Agregar</span>
                </Link>
              </h2> 
            </div>
            <div className="col-12 col-md-4 text-center">
              <Link to="/administrador/reservas" className="btn btn-info w-100">
                <i className="bi bi-calendar-check me-2"></i>
                <span>Ver Reservas</span>
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link to="/administrador/usuarios" className="btn btn-warning w-100">
                <i className="bi bi-people me-2"></i>
                <span>Gestionar Usuarios</span>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-12">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Numero Habitacion</th>
                  <th>Tipo de Habitacion</th>
                  <th>Capacidad de personas</th>
                  <th className="d-none d-md-table-cell">URL de Imagen</th>
                  <th>Precio por noche</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  habitaciones.map((habitacion, posicion) => <ItemHabitacion key={habitacion.id} habitacion={habitacion} fila={posicion+1} actualizarTabla={setHabitaciones}></ItemHabitacion>)
                }
              </tbody>
            </Table>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Administrador;
