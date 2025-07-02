import { Route, Routes } from "react-router-dom";
import Administrador from "../src/components/pages/Administrador";
import FormHabitacion from "../src/components/pages/habitacion/FormHabitacion";
import GestionReservas from "../src/components/pages/GestionReservas";
import GestionUsuarios from "../src/components/pages/GestionUsuarios";

const RutasAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Administrador></Administrador>}></Route>
      <Route path="/crear" element={<FormHabitacion titulo={'Nueva Habitacion'} creandoHabitacion={true}></FormHabitacion>}></Route>
      <Route path="/editar/:id" element={<FormHabitacion titulo={'Editar Habitacion'} creandoHabitacion={false}></FormHabitacion>}></Route>
      <Route path="/reservas" element={<GestionReservas></GestionReservas>}></Route>
      <Route path="/usuarios" element={<GestionUsuarios></GestionUsuarios>}></Route>
    </Routes>
  );
};

export default RutasAdmin;
