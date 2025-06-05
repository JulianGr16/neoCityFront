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
import { crearHabitacion, editarHabitacion, leerHabitacion, obtenerHabitacion } from "../../../helpers/queries.js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const FormularioHabitacion = ({titulo, creandoHabitacion}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const {id} = useParams()

  const navegar = useNavigate()

  useEffect(() =>{
    //si estoy editando la habitacion
    if(!creandoHabitacion){
      cargarHabitacionForm()
    }
  },[])

  const cargarHabitacionForm = async () => {
    const respuesta = await obtenerHabitacion(id)
    if(respuesta.status === 200){
      const datosHabitacion = await respuesta.json()
      setValue('numero', datosHabitacion.numero);
      setValue('tipo', datosHabitacion.tipo);
      setValue('capacidad', datosHabitacion.capacidad);
      setValue('precioPorNoche', datosHabitacion.precioPorNoche);
      setValue('fecha', datosHabitacion.fecha);
      setValue('imagen', datosHabitacion.imagen);
    }
  }
  const habitacionValidada = async (habitacion) => {
    if(creandoHabitacion){
      //le pedimos a la api crear una habitacion
      const respuesta = await crearHabitacion(habitacion);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Habitacion creada",
          text: `La habitacion fue creada correctamente!`,
          icon: "success",
        });
        navegar('/administrador')
        reset();
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `La habitacion no pudo crearse, intente nuevamente más tarde.`,
          icon: "error",
        });
      }
    }else{
      //solicitar a la api editar la habitacion
      const respuesta = await editarHabitacion(habitacion, id)
      if(respuesta.status === 200){
        Swal.fire({
          title: "Habitacion editada",
          text: `La habitacion ${id} fue editada correctamente!`,
          icon: "success",
        });
        navegar('/administrador')
      }else{
        Swal.fire({
          title: "Ocurrio un error",
          text: `La habitacion ${id} no pudo ser editada, intente nuevamente más tarde.`,
          icon: "error",
        });
      }
    }
  };

  return (
    <section className="container mt-3">
      <h1>{titulo}</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(habitacionValidada)}>
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
            {errors.capacidad?.message}
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
            type="date"
            placeholder="Ej:23/06/2025"
            {...register("fecha", {
              required: "La fecha disponible es un campo obligatorio",
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
                message: "el formato debe ser (JPEG|JPG|GIF|PNG)",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioHabitacion;
