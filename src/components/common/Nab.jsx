import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Nab = () => {
  return (
    <>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="py-2 barra-navegacion">
        <Navbar.Brand href="#home" className="fs-3 ms-5">NeoCity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link href="#link">¿Quiénes somos?</Nav.Link>
            <Nav.Link href="#link">Contacto</Nav.Link>
            <Nav.Link href="#link">Galeria de imágenes</Nav.Link>
            <Nav.Link href="#link">Catálogo de Habitaciones</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default Nab;
