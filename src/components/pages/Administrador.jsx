import { Button } from "react-bootstrap";
import "../../App.css";
import { useEffect } from "react";
import { URLHabitaciones } from "../../helpers/queries";
import { Link } from "react-router-dom";

const Administrador = () => {la
  useEffect(()=>{
    console.log(URLHabitaciones)
  },[])

  return (
    <section className="container mainAdmin py-3">
      <h1 className="text-center">Administrador</h1>
      <hr />
      <article className="row">
        <div className="col-sm-12 col-md-12 my-3">
          <h2>Habitaciones <Link to="/administrador/crear"><i class="bi bi-file-earmark-plus btn btn-primary"></i></Link></h2> 
        </div>
        <hr />
        <div className="col-sm-12 col-md-12 ">
          <h2>Usuarios<i class="bi bi-file-earmark-plus btn btn-primary ms-2"></i></h2>
        </div>
      </article>
    </section>
  );
};

export default Administrador;
