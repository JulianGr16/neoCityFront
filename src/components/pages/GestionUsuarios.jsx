import { useEffect, useState } from "react";
import { Container, Table, Badge, Alert, Button } from "react-bootstrap";
import { listarUsuarios, cambiarEstadoCuentaUsuario, eliminarUsuario } from "../../helpers/queries";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../App.css";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const navegacion = useNavigate();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const respuesta = await listarUsuarios();
      if (respuesta.status === 200) {
        const usuariosData = await respuesta.json();
        setUsuarios(usuariosData);
      }
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los usuarios.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstadoUsuario = async (id, suspender) => {
    try {
      const respuesta = await cambiarEstadoCuentaUsuario(id, suspender);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Estado actualizado",
          text: `Usuario ${suspender ? 'suspendido' : 'activado'} correctamente`,
          icon: "success",
        });
        cargarUsuarios();
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cambiar el estado del usuario.",
        icon: "error",
      });
    }
  };

  const eliminarUsuarioPorId = async (id, nombreUsuario) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar al usuario "${nombreUsuario}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await eliminarUsuario(id);
          if (respuesta.status === 200) {
            Swal.fire({
              title: "Usuario eliminado",
              text: "El usuario ha sido eliminado correctamente.",
              icon: "success",
            });
            cargarUsuarios();
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el usuario.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando usuarios...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="mainAdmin py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <h1 className="text-center mb-0">
              <i className="bi bi-people me-2"></i>
              Gestión de Usuarios
            </h1>
            <Button 
              variant="secondary"
              onClick={() => navegacion("/administrador")}
              className="w-auto"
            >
              <i className="bi bi-arrow-left me-1"></i>
              Volver al Admin
            </Button>
          </div>
        </div>
      </div>

      {usuarios.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No hay usuarios registrados</Alert.Heading>
          <p>Aún no se han registrado usuarios en el sistema.</p>
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr className="text-center">
                <th>#</th>
                <th>Nombre Usuario</th>
                <th className="d-none d-md-table-cell">Email</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario.id} className="text-center align-middle">
                  <td><strong>{index + 1}</strong></td>
                  <td className="text-start">
                    <div className="fw-bold">{usuario.nombreUsuario}</div>
                    <small className="text-muted d-md-none">{usuario.email}</small>
                  </td>
                  <td className="d-none d-md-table-cell text-start">
                    <small>{usuario.email}</small>
                  </td>
                  <td>
                    <Badge bg={usuario.esAdmin ? "warning" : "primary"}>
                      {usuario.esAdmin ? "Admin" : "Usuario"}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={usuario.cuentaSuspendida ? "danger" : "success"}>
                      {usuario.cuentaSuspendida ? "Suspendido" : "Activo"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-1 justify-content-center">
                      {!usuario.esAdmin && (
                        <Button
                          variant={usuario.cuentaSuspendida ? "success" : "warning"}
                          size="sm"
                          onClick={() => cambiarEstadoUsuario(usuario.id, !usuario.cuentaSuspendida)}
                        >
                          <i className={`bi ${usuario.cuentaSuspendida ? 'bi-check-circle' : 'bi-pause-circle'}`}></i>
                          <span className="d-none d-lg-inline ms-1">
                            {usuario.cuentaSuspendida ? "Activar" : "Suspender"}
                          </span>
                        </Button>
                      )}
                      {!usuario.esAdmin && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => eliminarUsuarioPorId(usuario.id, usuario.nombreUsuario)}
                        >
                          <i className="bi bi-trash"></i>
                          <span className="d-none d-lg-inline ms-1">Eliminar</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default GestionUsuarios;
