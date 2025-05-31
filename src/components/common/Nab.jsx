import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../App.css";

const Nab = () => {
  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="py-2 barra-navegacion"
      >
        <Navbar.Brand as={Link} to='/' className="fs-3 ms-5">
          <i class="bi bi-buildings"></i>NeoCity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="">
            <NavLink end to='/' className='nav-link'>Inicio</NavLink>
            <NavLink end to="/QuienesSomos" className='nav-link'>
              ¿Quiénes somos?
            </NavLink>
            <NavLink end to="/Contacto" className='nav-link'>
              Contacto
            </NavLink>
            <NavLink end to='galeriaDeImagenes' className='nav-link'>Galeria de imágenes</NavLink>
            <NavLink end to="/CatalogoHabitaciones" className="nav-link">Catálogo de Habitaciones</NavLink>
              <NavLink end to="/administrador" className='nav-link'>
              Administrador
            </NavLink>
            <Link className="btn btn-light" end to={"/login"}>
              <i class="bi bi-person me-1"></i>
              Iniciar Sesion</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nab;
