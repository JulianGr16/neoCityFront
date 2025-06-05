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
    <section className="container mainAdmin py-3">
      <h1 className="text-center">Administrador</h1>
      <article className="row">
        <div className="col-sm-12 col-md-12 my-3">
          <h2>Habitaciones <Link to="/administrador/crear"><i class="bi bi-file-earmark-plus btn btn-primary"></i></Link></h2> 
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
              habitaciones.map((habitacion, posicion) => <ItemHabitacion key={habitacion.id} habitacion={habitacion} fila={posicion+1} actualizarTabla={setHabitaciones}></ItemHabitacion>)
            }
          </tbody>
        </Table>
        <div className="col-sm-12 col-md-12 ">
          <h2>Usuarios<i class="bi bi-file-earmark-plus btn btn-primary ms-2"></i></h2>
        </div>
      </article>
    </section>
  );
};

export default Administrador;
