export const URLHabitaciones = import.meta.env.VITE_API_HABITACIONES;
export const URLUsuarios = import.meta.env.VITE_API_USUARIOS;
export const URLReservas = import.meta.env.VITE_API_RESERVAS;

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

export const leerHabitacion = async () => {
  try {
    const respuesta = await fetch(URLHabitaciones);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const obtenerHabitacion = async (id) => {
  try {
    const respuesta = await fetch(`${URLHabitaciones}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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

export const leerReservasUsuario = async (usuarioId) => {
  try {
    const respuesta = await fetch(`${URLReservas}?usuarioId=${usuarioId}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const leerReservas = async () => {
  try {
    const respuesta = await fetch(URLReservas);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const obtenerReserva = async (id) => {
  try {
    const respuesta = await fetch(`${URLReservas}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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

export const obtenerUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${URLUsuarios}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error en obtenerUsuario:", error);
    throw error;
  }
};

export const listarUsuarios = async () => {
  try {
    const respuesta = await fetch(URLUsuarios);
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
    return false;
  }
};

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