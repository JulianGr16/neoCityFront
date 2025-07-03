export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;
export const URLUsuarios = import.meta.env.VITE_API_USUARIOS;
export const URLReservas = import.meta.env.VITE_API_RESERVAS;

// LOGIN - Para backend MongoDB
export const loginUsuario = async ({ email, password }) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const datos = await respuesta.json();

    if (respuesta.status === 200) {
      return {
        ok: true,
        usuario: datos.usuario,
      };
    } else {
      return {
        ok: false,
        mensaje: datos.mensaje || "Error al iniciar sesión",
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

// CREAR USUARIO - Para backend MongoDB
export const crearUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(URLUsuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const datos = await respuesta.json();

    if (respuesta.status === 201) {
      return {
        ok: true,
        mensaje: datos.mensaje,
      };
    } else {
      return {
        ok: false,
        mensaje: datos.mensaje || "Error al crear usuario",
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

// CREAR HABITACION
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

// LEER HABITACIONES
export const leerHabitacion = async () => {
  try {
    const respuesta = await fetch(URLHabitaciones);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// OBTENER UNA HABITACION ESPECÍFICA
export const obtenerHabitacion = async (id) => {
  try {
    const respuesta = await fetch(`${URLHabitaciones}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// EDITAR HABITACION
export const editarHabitacion = async (habitacionEditada, id) => {
  try {
    const respuesta = await fetch(`${URLHabitaciones}/${id}`, {
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

// ELIMINAR HABITACION
export const eliminarHabitacion = async (id) => {
  try {
    const respuesta = await fetch(`${URLHabitaciones}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// CREAR RESERVA
export const crearReserva = async (reservaNueva) => {
  try {
    const respuesta = await fetch(URLReservas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaNueva),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// LEER RESERVAS DE UN USUARIO
export const leerReservasUsuario = async (usuarioId) => {
  try {
    const respuesta = await fetch(`${URLReservas}?usuarioId=${usuarioId}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// LEER TODAS LAS RESERVAS
export const leerReservas = async () => {
  try {
    const respuesta = await fetch(URLReservas);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// OBTENER UNA RESERVA ESPECÍFICA
export const obtenerReserva = async (id) => {
  try {
    const respuesta = await fetch(`${URLReservas}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// EDITAR RESERVA
export const editarReserva = async (reservaEditada, id) => {
  try {
    const respuesta = await fetch(`${URLReservas}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaEditada),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ELIMINAR RESERVA
export const eliminarReserva = async (id) => {
  try {
    const respuesta = await fetch(`${URLReservas}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// OBTENER UN USUARIO ESPECÍFICO
export const obtenerUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// LISTAR TODOS LOS USUARIOS
export const listarUsuarios = async () => {
  try {
    const respuesta = await fetch(URLUsuarios);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// EDITAR USUARIO
export const editarUsuario = async (usuarioEditado, id) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      json: () => Promise.resolve({ mensaje: "Error de conexión con el servidor" })
    };
  }
};

// SUSPENDER/ACTIVAR CUENTA DE USUARIO
export const cambiarEstadoCuentaUsuario = async (id, cuentaSuspendida) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/${id}/estado`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuentaSuspendida }),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ELIMINAR USUARIO
export const eliminarUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};