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
    sessionStorage.removeItem("NeoCityHotel");
    setUsuarioLogueado("");
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
        <Navbar.Brand as={Link} to="/" className="fs-3 ms-2 ms-lg-5">
          <i className="bi bi-buildings"></i> NeoCity
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
          <Nav className="ms-auto me-2 me-lg-5">
            {usuarioLogueado !== "" && !usuarioLogueado?.esAdmin && (
              <NavLink
                className="btn btn-outline-light me-2 mb-2 mb-lg-0"
                end
                to="/mis-reservas"
              >
                <i className="bi bi-calendar-check me-1"></i>
                <span className="d-none d-sm-inline">Mis Reservas</span>
                <span className="d-sm-none">Reservas</span>
              </NavLink>
            )}
            {usuarioLogueado !== "" ? (
              <Button variant="danger" onClick={logout} className="w-auto">
                <i className="bi bi-box-arrow-right me-1 d-lg-none"></i>
                <span className="d-none d-lg-inline">Cerrar Sesión</span>
                <span className="d-lg-none">Salir</span>
              </Button>
            ) : (
              <NavLink className="btn btn-light" end to="/login">
                <i className="bi bi-person me-1"></i>
                <span className="d-none d-sm-inline">Iniciar Sesión</span>
                <span className="d-sm-none">Login</span>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Nab;
