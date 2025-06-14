import { Container } from "react-bootstrap";
import "../../App.css"
import { NavLink } from "react-router-dom";

const Bienvenidos = () => {
    return (
        <Container className="flex-grow-1 mt-5">
            <article className="row border py-5 px-5 rounded border-black bg-body-secondary mb-4">
                <div className="col-sm-12 col-md-12">
                    <h2>¡Bienvenido a NeoCity! Ya podes empezar a realizar tus Reservas 😊</h2>
                    <NavLink to="/login" className="btn btn-primary mt-1 text-center">Iniciar sesion</NavLink>
                </div>
            </article>
        </Container>
    );
};

export default Bienvenidos;