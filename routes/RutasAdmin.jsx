import { Route, Routes } from "react-router-dom";
import Administrador from "../src/components/pages/Administrador";
import FormHabitacion from "../src/components/pages/habitacion/FormHabitacion";

const RutasAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<Administrador></Administrador>}></Route>
      <Route path="/crear" element={<FormHabitacion titulo={'Nueva Habitacion'} creandoHabitacion={true}></FormHabitacion>}></Route>
      <Route path="/editar/:id" element={<FormHabitacion titulo={'Editar Habitacion'} creandoHabitacion={false}></FormHabitacion>}></Route>
    </Routes>
  );
};

export default RutasAdmin;
