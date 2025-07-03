import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Alert, Modal, Form } from "react-bootstrap";
import { listarUsuarios, editarUsuario, cambiarEstadoCuentaUsuario, eliminarUsuario } from "../../helpers/queries";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../App.css";

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const navegacion = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const respuesta = await listarUsuarios();
      if (respuesta.status === 200) {
        const usuariosData = await respuesta.json();
        setUsuarios(usuariosData);
      } else {
        throw new Error("Error al cargar usuarios");
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

  const formatearFecha = (fecha) => {
    if (!fecha) return "No disponible";
    try {
      return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  const obtenerBadgeEstado = (usuario) => {
    if (usuario.esAdmin) {
      return <Badge bg="primary">Administrador</Badge>;
    }
    if (usuario.cuentaSuspendida) {
      return <Badge bg="danger">Suspendido</Badge>;
    }
    return <Badge bg="success">Activo</Badge>;
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setValue("nombreUsuario", usuario.nombreUsuario);
    setValue("email", usuario.email);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setUsuarioEditando(null);
    reset();
  };

  const onSubmitEditar = async (data) => {
    try {
      const respuesta = await editarUsuario(data, usuarioEditando.id);
      
      if (respuesta.status === 200) {
        Swal.fire({
          title: "¡Usuario editado!",
          text: "La información del usuario ha sido actualizada.",
          icon: "success",
        });
        cerrarModalEditar();
        cargarUsuarios();
      } else {
        throw new Error("Error al editar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo editar el usuario.",
        icon: "error",
      });
    }
  };

  const cambiarEstadoCuenta = (usuario) => {
    const accion = usuario.cuentaSuspendida ? "activar" : "suspender";
    const nuevoEstado = !usuario.cuentaSuspendida;

    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas ${accion} la cuenta de ${usuario.nombreUsuario}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: nuevoEstado ? "#d33" : "#28a745",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await cambiarEstadoCuentaUsuario(usuario.id, nuevoEstado);
          
          if (respuesta.status === 200) {
            Swal.fire({
              title: "¡Estado cambiado!",
              text: `La cuenta ha sido ${nuevoEstado ? 'suspendida' : 'activada'}.`,
              icon: "success",
            });
            cargarUsuarios();
          } else {
            throw new Error("Error al cambiar estado");
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo cambiar el estado de la cuenta.",
            icon: "error",
          });
        }
      }
    });
  };

  const eliminarUsuarioConfirmar = (usuario) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas eliminar permanentemente a ${usuario.nombreUsuario}? Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await eliminarUsuario(usuario.id);
          
          if (respuesta.status === 200) {
            Swal.fire({
              title: "¡Usuario eliminado!",
              text: "El usuario ha sido eliminado permanentemente.",
              icon: "success",
            });
            cargarUsuarios();
          } else {
            throw new Error("Error al eliminar usuario");
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
    <>
      <Container className="mainAdmin py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-center flex-grow-1 mb-0">
            <i className="bi bi-people me-2"></i>
            Gestión de Usuarios
          </h1>
          <Button 
            variant="secondary"
            onClick={() => navegacion("/administrador")}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Volver al Admin
          </Button>
        </div>
        
        {usuarios.length === 0 ? (
          <Alert variant="info" className="text-center">
            <Alert.Heading>No hay usuarios registrados</Alert.Heading>
            <p>No se han encontrado usuarios en el sistema.</p>
          </Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr className="text-center">
                  <th>#</th>
                  <th>Nombre de Usuario</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Fecha de Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={usuario.id || index} className="text-center align-middle">
                    <td><strong>{index + 1}</strong></td>
                    <td>
                      <strong>{usuario.nombreUsuario || 'Sin nombre'}</strong>
                      {usuario.esAdmin && (
                        <>
                          <br />
                          <small className="text-primary">
                            <i className="bi bi-shield-check me-1"></i>
                            Administrador
                          </small>
                        </>
                      )}
                    </td>
                    <td>{usuario.email || 'Sin email'}</td>
                    <td>{obtenerBadgeEstado(usuario)}</td>
                    <td>
                      <small className="text-muted">
                        {formatearFecha(usuario.fechaRegistro)}
                      </small>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => abrirModalEditar(usuario)}
                          title="Editar usuario"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        
                        {!usuario.esAdmin && (
                          <>
                            <Button
                              variant={usuario.cuentaSuspendida ? "outline-success" : "outline-warning"}
                              size="sm"
                              onClick={() => cambiarEstadoCuenta(usuario)}
                              title={usuario.cuentaSuspendida ? "Activar cuenta" : "Suspender cuenta"}
                            >
                              <i className={`bi ${usuario.cuentaSuspendida ? "bi-check-circle" : "bi-pause-circle"}`}></i>
                            </Button>
                            
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => eliminarUsuarioConfirmar(usuario)}
                              title="Eliminar usuario"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <div className="mt-4 p-3 bg-light rounded">
              <div className="row text-center">
                <div className="col-md-3">
                  <h5 className="text-primary">{usuarios.length}</h5>
                  <small className="text-muted">Total de Usuarios</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-success">
                    {usuarios.filter(u => !u.esAdmin && !u.cuentaSuspendida).length}
                  </h5>
                  <small className="text-muted">Usuarios Activos</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-warning">
                    {usuarios.filter(u => u.cuentaSuspendida).length}
                  </h5>
                  <small className="text-muted">Usuarios Suspendidos</small>
                </div>
                <div className="col-md-3">
                  <h5 className="text-info">
                    {usuarios.filter(u => u.esAdmin).length}
                  </h5>
                  <small className="text-muted">Administradores</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Modal para editar usuario */}
      <Modal show={mostrarModalEditar} onHide={cerrarModalEditar} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Editar Usuario
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {usuarioEditando && (
            <Form onSubmit={handleSubmit(onSubmitEditar)}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Usuario *</Form.Label>
                <Form.Control
                  type="text"
                  {...register("nombreUsuario", {
                    required: "El nombre de usuario es obligatorio",
                    minLength: {
                      value: 4,
                      message: "Mínimo 4 caracteres"
                    },
                    maxLength: {
                      value: 16,
                      message: "Máximo 16 caracteres"
                    }
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.nombreUsuario?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Ingrese un email válido"
                    }
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={cerrarModalEditar}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  <i className="bi bi-check-circle me-1"></i>
                  Guardar Cambios
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GestionUsuarios;
