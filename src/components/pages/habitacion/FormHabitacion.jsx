import { useForm } from "react-hook-form";
import { Form, Button, FormGroup } from "react-bootstrap";

const FormularioHabitacion = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const HabitacionValida = (habitacion) => {
    console.log(habitacion);
  };

  return (
    <section className="container ">
      <h1>Nueva Habitacion</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(productoValidado)}>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Numero de Habitacion*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:01-03-12"
            {...register("numero", {
              required: "El numero de habitacion es obligatorio",
              min: {
                value: 2,
                message: "Debe ingresar minimo 2 numeros",
              },
              max: {
                value: 50,
                message: "Solo existe hasta la habitacion 50",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.numero?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Tipo de habitacion*</Form.Label>
          <Form.Select
            type="text"
            {...register("tipo", {
              required: "El tipo de habitacion es un dato obligatorio",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Suite Standard">Suite Standard</option>
            <option value="Suite Junior">Suite Junior</option>
            <option value="Suite Premium">Suite Premium</option>
          </Form.Select>
          <Form.Text className="text-danger">{errors.tipo?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Capacidad de personas*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:4-2-1"
            {...register("capacidad", {
              required: "La capacidad de personas es un dato obligatorio",
              min: {
                value: 1,
                message: "el minimo es 1 persona",
              },
              max: {
                value: 4,
                message: "El maximo son 4 personas",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.numero?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Precio por noche*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej:$14000"
            {...register("precioPorNoche", {
              required: "El precio por noche es un dato obligatorio",
              min: {
                value: 5000,
                message: "El precio minimo de una habitacion es $5.000",
              },
              max: {
                value: 30000,
                message: "El precio maximo de una habitacion es $30.000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precioPorNoche?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Fecha Disponible*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej:23/06/2025"
            {...register("fecha", {
              required: "La fecha disponible es un campo obligatorio",
              pattern: {
                value: /^\d{1,2}\/\d{1,2}\/\d{4} a \d{1,2}\/\d{1,2}\/\d{4}$/,
                message:
                  "La fecha debe estar en el formato dd/mm/yyyy a dd/mm/yyyy",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.fecha?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej:https://www.pexels.com/es-es/foto/ciudad-revistas-cama-habitacion-11497968/"
            {...register("imagen", {
              required: "La imagen es un dato obligatorio",
              pattern: {
                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
                message: "el formato debe ser (JPEG|JPG|GIF|PNG",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHabitacion">
          <Form.Label>Reserva*</Form.Label>
          <Form.Control
           type={Boolean}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioHabitacion;