import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../../App.css";
import { useForm } from "react-hook-form";
import { login } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const navegacion = useNavigate();

  const onSubmit = (data) => {
    if (login(data)) {
      Swal.fire({
        title: "Bienvenido",
        text: "Ingresaste al panel de Administracion de NeoCity Hotel",
        icon: "success",
      });
      //guardar el usuario en el state
      setUsuarioLogueado(data.email);
      //redirigir al admin
      navegacion("/administrador");
    } else {
      Swal.fire({
        title: "Oops... Ocurrio un error",
        text: "El email o la contraseña ingresados son incorrectos",
        icon: "error",
      });
    }
  };

  return (
    <Container className="flex-grow-1 align-content-center">
      <Row className="d-flex justify-content-center ">
        <Col className="col-sm-12 col-md-6 col-xl-4 mb-4">
          <Card className="my-5">
            <Card.Header as="h5" className="text-center fw-bold">
              Inicio de Sesion
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese el email"
                    {...register("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:
                          "Ingrese una dirección de correo electrónico válida",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={mostrarContraseña ? "text" : "password"}
                      placeholder="Contraseña"
                      {...register("password", {
                        required: "La contraseña es obligatoria",
                        pattern: {
                          value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                          message:
                            "Debe tener entre 8 y 16 caracteres, con una mayúscula, una minúscula y un número.",
                        },
                      })}
                    />
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() => setMostrarContraseña(!mostrarContraseña)}
                    >
                      <i
                        className={`bi ${
                          mostrarContraseña ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </Button>
                  </div>
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
