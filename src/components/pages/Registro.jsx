import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import "../../App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { crearUsuario } from "../../helpers/queries.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [FormData, SetFormData] = useState({
    nombreUsuario: "",
    email: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    SetFormData({ ...FormData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const onSubmit = async (data) => {
    try {
      const respuesta = await crearUsuario(data);

      if (respuesta.ok) {
        Swal.fire({
          title: "Usuario creado",
          text: "Has sido registrado correctamente. Ahora puedes iniciar sesión.",
          icon: "success",
        });
        navegacion("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: respuesta.mensaje || "No se pudo crear el usuario",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear el usuario",
        icon: "error",
      });
    }
  };

  return (
    <Container className="flex-grow-1 align-content-center w-25">
      <Card className="my-5 detalle-card">
        <Card.Header as="h5" className="text-center fw-bold">
          Registrarme
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="ejemplo123@gmail.com"
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                name="nombreUsuario"
                onChange={handleChange}
                placeholder="Julio2025"
                {...register("nombreUsuario", {
                  required: "El nombre de usuario es un dato obligatorio",
                  minLength: {
                    value: 4,
                    message: "el minimo son 4 caracter",
                  },
                  maxLength: {
                    value: 16,
                    message: "el maximo son 16 caracter",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreUsuario?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={mostrarPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Luxo123"
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
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Registrarme
              </Button>
              <Button
                variant="secondary"
                onClick={() => navegacion("/login")}
              >
                Volver al Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registro;
