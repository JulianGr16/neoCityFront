export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;

//POST
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

//GET
export const leerHabitacion = async()=>{
  try {
    const respuesta = await fetch(URLHabitaciones);
    return respuesta;
  } catch (error) {
     console.error(error);
    return false;
  }
}


//GET que trae una habitacion especifica
export const obtenerHabitacion = async(id)=>{
  try {
    const respuesta = await fetch(URLHabitaciones + '/' + id);
    return respuesta;
  } catch (error) {
     console.error(error);
    return false;
  }
}


//PUT

export const editarHabitacion = async (habitacionEditada, id) => {
  try {
    const respuesta = await fetch(URLHabitaciones + '/' + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitacionEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// DELETE

export const eliminarHabitacion = async (id) => {
  try {
    const respuesta = await fetch(URLHabitaciones + '/' + id, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};



const userAdim = {
  email: "admin@12.com",
  password: "1234"
}

  export const login = (usuario) => {
    if(
      usuario.user === userAdim.email &&
      usuario.password === userAdim.password  
    ){
      sessionStorage.setItem('NeoCityHotel', JSON.stringify(usuario.email));
    }
  }