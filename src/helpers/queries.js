export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;
export const URLUsuarios = import.meta.env.VITE_API_USUARIOS;

//loginUsuario
const adminEmails = [
  "admin12@gmail.com",
  "admin@neocity.com",
  "admin20@neocity.com",
];

export const loginUsuario = async ({ email, password }) => {
  try {
    const respuesta = await fetch(
      `${URLUsuarios}?email=${email}&password=${password}`
    );
    const datos = await respuesta.json();

    if (datos.length > 0) {
      const usuario = datos[0];
      const esAdmin = adminEmails.includes(usuario.email);

      return {
        ok: true,
        usuario: { ...usuario, esAdmin },
      };
    } else {
      return {
        ok: false,
        mensaje: "Email o contraseña incorrectos",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      mensaje: "Error al conectar con el servidor",
    };
  }
};

//crearUsuario
export const crearUsuario = async (usuarios) => {
  try {
    const respuesta = await fetch(URLUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarios),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

//POST
export const crearHabitacion = async (habitacionNueva) => {
  console.log(URLUsuarios);
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
