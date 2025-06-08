import '../../App.css'
import { Container, Row, Col, Form, FormControl, Button } from "react-bootstrap";
const Contacto = () => {
  return (
    <Container-fluid className="text-center px-5 py-5 mainContactos">
      <Row className="py-5">
        <Col className="text-start">
          <h1 className="text-primary-emphasis">Contactanos</h1>
          <h5>
            <i className="bi bi-geo-alt"></i> Direccion:
          </h5>
          <p>Av. Cordoba 235, Tucuman, Argentina</p>
          <h5>
            <i className="bi bi-envelope"></i> Email:
          </h5>
          <p>Neocityhotel@gmail.com</p>
          <h5>
            <i className="bi bi-telephone"></i> Telefono:
          </h5>
          <p>+54 9 381 2398701</p>
          <h5>
            <i className="bi bi-clock"></i> Horarios de atencion:
          </h5>
          <p>
            Recepcion: 24 horas, todos los dias<br></br>Consultas por telefono y
            Correo: Lunes a Viernes de 9:00 a 18:00
          </p>
        </Col>
        <Col className="text-start d-flex justify-content-center align-items-center p-5">
          <Form>
            <Form.Group className="my-3">
              <Col className="d-flex my-2">
                <Form.Control type="text" placeholder="Nombre" />
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  className="ms-2"
                />
              </Col>
              <Form.Control
                type="email"
                placeholder="Correo Electrónico"
                className="my-1"
              />
              <Form.Control type="text" placeholder="Asunto" className="my-1" />
              <Col>
                <Form.Control
                  as={"textarea"}
                  placeholder="Mensaje"
                  className="my-1 alturaTextarea"
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">Enviar</Button>
          </Form>
        </Col>
      </Row>
    </Container-fluid>
  );
};

export default Contacto;
