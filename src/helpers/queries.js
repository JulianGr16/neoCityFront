export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;
export const URLUsuarios = import.meta.env.VITE_API_USUARIOS


//crearUsuario
export const crearUsuario = async (usuarios) =>{
  try {
    const respuesta = await fetch(URLUsuarios,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarios),
    });
    return respuesta;
  } catch (error) {
    console.log(error)
    return{ok: false};
  }
}



//POST
export const crearHabitacion = async (habitacionNueva) => {
  console.log(URLUsuarios)
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
export const leerHabitacion = async () => {
  try {
    const respuesta = await fetch(URLHabitaciones);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//GET que trae una habitacion especifica
export const obtenerHabitacion = async (id) => {
  try {
    const respuesta = await fetch(URLHabitaciones + "/" + id);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//PUT

export const editarHabitacion = async (habitacionEditada, id) => {
  try {
    const respuesta = await fetch(URLHabitaciones + "/" + id, {
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
    const respuesta = await fetch(URLHabitaciones + "/" + id, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const userAdmin = {
  email: "admin12@gmail.com",
  password: "Admin1234",
};

export const login = (usuario) => {
  if (
    usuario.email === userAdmin.email.trim() &&
    usuario.password === userAdmin.password.trim()
  ) {
    sessionStorage.setItem("NeoCityHotel", JSON.stringify(usuario.email));
    return true;
  } else {
    return false;
  }
};


