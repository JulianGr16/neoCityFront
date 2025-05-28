import { useForm } from "react-hook-form";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormText,
  FormSelect,
} from "react-bootstrap";
import { crearHabitacion } from "../../../helpers/queries.js";
import Swal from "sweetalert2";

const FormularioHabitacion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const habitacionValidada = async (habitacion) => {
    //le pedimos a la api crear una habitacion
    const respuesta = await crearHabitacion(habitacion);
    if (respuesta.status === 201) {
      Swal.fire({
        title: "Habitacion creada",
        text: `La habitacion ${habitacion.numero} fue creada correctamente!`,
        icon: "success",
      });
      reset();
    } else {
       Swal.fire({
        title: "Ocurrio un error",
        text: `La habitacion ${habitacion.numero} no pudo crearse, intente nuevamente más tarde.`,
        icon: "error",
      });
    }
  };

  return (
    <section className="container mt-3">
      <h1>Nueva Habitacion</h1>
      <hr />
      <article className="row">
        <div className="col-sm-12 col-md-12">
          <Form className="my-4" onSubmit={handleSubmit(habitacionValidada)}>
            <Form.Group className="my-3" controlId="formNumero">
              <FormLabel>Numero de Habitacion</FormLabel>
              <FormControl
                type="number"
                placeholder="ej-18"
                {...register("numero", {
                  required: "Este campo es obligatorio",
                  min: {
                    value: 10,
                    message: "el numero minimo es 10",
                  },
                  max: {
                    value: 30,
                    message: "el numero maximo es 30",
                  },
                })}
              />
              <FormText className="text-danger">
                {errors.numero?.message}
              </FormText>
            </Form.Group>
            <Form.Group controlId="formTipo">
              <FormLabel>Tipo de Habitacion*</FormLabel>
              <FormSelect
                placeholder="ej-suite premium"
                {...register("tipo", {
                  required: "Este campo es obligatorio",
                })}
              >
                <option>Seleccione una Opcion</option>
                <option>Suite Standard</option>
                <option>Suite Junior</option>
                <option>Suite Premium</option>
              </FormSelect>
              <FormText className="text-danger">
                {errors.tipo?.message}
              </FormText>
            </Form.Group>
            <Form.Group className="my-3" controlId="formCapacidad">
              <FormLabel>Capacidad de Personas*</FormLabel>
              <FormControl
                type="number"
                placeholder="ej-2"
                {...register("capacidad", {
                  required: "este campo es obligatorio",
                  min: {
                    value: 1,
                    message: "el minimo de persona es 1",
                  },
                  max: {
                    value: 4,
                    message: "el maximo de personas son 4",
                  },
                })}
              />
              <FormText className="text-danger">
                {errors.capacidad?.message}
              </FormText>
            </Form.Group>
            <Form.Group className="my-3" controlId="formPrecio">
              <FormLabel>Precio por noche*</FormLabel>
              <FormControl
                type="number"
                placeholder="ej-$14000"
                {...register("precioPorNoche", {
                  required: "Este campo es obligatorio",
                  min: {
                    value: 5000,
                    message: "el precio minimo es $5000",
                  },
                  max: {
                    value: 30000,
                    message: "el precio maximo es $30000",
                  },
                })}
              />
              <FormText className="text-danger">
                {errors.precioPorNoche?.message}
              </FormText>
            </Form.Group>
            <Form.Group className="my-3" controlId="formImg">
              <FormLabel>Imagen URL*</FormLabel>
              <FormControl
                placeholder="link de una imagen"
                {...register("imagen", {
                  required: "este campo es obligatorio",
                })}
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Crear Habitacion
            </Button>
          </Form>
        </div>
      </article>
    </section>
  );
};

export default FormularioHabitacion;
