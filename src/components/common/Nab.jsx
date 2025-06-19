import { Link, NavLink, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "../../App.css";
import RutasAdmin from "../../../routes/RutasAdmin";
import RutasProtegidas from "../../../routes/RutasProtegidas";

const Nab = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    //quita el usuario del sesionStorage
    sessionStorage.removeItem("NeoCityHotel");
    //resetea el state
    setUsuarioLogueado("");
    //redirecciona a la pagina principal
    navegacion("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="py-2 barra-navegacion"
      >
        <Navbar.Brand as={Link} to="/" className="fs-3 ms-5">
          <i className="bi bi-buildings"></i> NeoCity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavLink end to="/" className="nav-link">
              Inicio
            </NavLink>
            <NavLink end to="/QuienesSomos" className="nav-link">
              ¿Quiénes somos?
            </NavLink>
            <NavLink end to="/Contacto" className="nav-link">
              Contacto
            </NavLink>
            <NavLink end to="/galeriaDeImagenes" className="nav-link">
              Galeria de imágenes
            </NavLink>
            <NavLink end to="/CatalogoHabitaciones" className="nav-link">
              Catálogo de Habitaciones
            </NavLink>
            {usuarioLogueado?.esAdmin && (
              <NavLink end to="/administrador" className="nav-link">
                Administrador
              </NavLink>
            )}
          </Nav>
          <Nav className="ms-auto me-5 align-items-center">
            {usuarioLogueado !== "" ? (
              <Button variant="danger" onClick={logout}>
                Cerrar Sesion
              </Button>
            ) : (
              <NavLink className="btn btn-light" end to="/login">
                <i className="bi bi-person me-1"></i>
                Iniciar Sesión
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nab;
