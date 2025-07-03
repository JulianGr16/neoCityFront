import { Card, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../../App.css";
import { useForm } from "react-hook-form";
import { loginUsuario } from "../../helpers/queries";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setUsuarioLogueado }) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const togglePasswordVisibility = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const onSubmit = async (data) => {
    const resultado = await loginUsuario(data);

    if (resultado.ok) {
      const usuario = resultado.usuario;
      sessionStorage.setItem("NeoCityHotel", JSON.stringify(usuario));
      setUsuarioLogueado(usuario);

      Swal.fire({
        title: `Bienvenido ${usuario.nombreUsuario}`,
        text: usuario.esAdmin
          ? "Ingresaste como administrador"
          : "Ingresaste como usuario",
        icon: "success",
      });
      navegacion(usuario.esAdmin ? "/administrador" : "/CatalogoHabitaciones");
    } else {
      Swal.fire({
        title: "Oops... Ocurrió un error",
        text: resultado.mensaje,
        icon: "error",
      });
    }
  };

  return (
    <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-4">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card className="detalle-card">
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
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                <InputGroup>
                  <Form.Control
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      pattern: {
                        value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                        message:
                          "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
                      },
                    })}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    <i
                      className={
                        mostrarPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </Button>
                </InputGroup>
                <Form.Text className="text-danger">
                  {errors.password?.message}
                </Form.Text>
              </Form.Group>
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between">
                <Button variant="primary" type="submit" className="flex-fill">
                  Ingresar
                </Button>
                <NavLink
                  to="/Registrarme"
                  variant="warning"
                  className="btn btn-warning flex-fill text-center"
                >
                  Registrarme
                </NavLink>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
