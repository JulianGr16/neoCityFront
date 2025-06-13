import { Container } from "react-bootstrap";
import "../../App.css"

const Bienvenidos = () => {
    return (
        <Container className="flex-grow-1 mt-5">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <h2>¡Bienvenido a NeoCity! Ya podes empezar a realizar tus Reservas 😊</h2>
                </div>
            </div>
        </Container>
    );
};

export default Bienvenidos;