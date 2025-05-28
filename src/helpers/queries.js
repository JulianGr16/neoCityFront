export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;

//solicitud POST a la api
export const crearHabitacion = async (habitacionNueva) => {
  try {
    const respuesta = await fetch(URLHabitaciones, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitacionNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};
