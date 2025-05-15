
import React from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Contacto from "../pages/Contacto";
import { Button } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css'

const Nab = () => {
  return (
    <>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="py-2 barra-navegacion">
        <Navbar.Brand href="#home" className="fs-3 ms-5">NeoCity</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="">
            <Nav.Link href="#home"></Nav.Link>
            <Nav.Link as={NavLink} to="/QuienesSomos">¿Quiénes somos?</Nav.Link>
            <Nav.Link as={NavLink} to="/Contacto">Contacto</Nav.Link>
            <Nav.Link href="#link">Galeria de imágenes</Nav.Link>
            <Nav.Link href="#link">Catálogo de Habitaciones</Nav.Link>
            <Button variant="light">Iniciar Sesion</Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default Nab;
