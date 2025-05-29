import "bootstrap/dist/css/bootstrap.min.css";
import Nab from "./components/common/Nab";
import Foot from "./components/common/Foot";
import QuienesSomos from "./components/pages/QuienesSomos"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./components/pages/Index";
import '../src/App.css';
import GaleriaDeImagenes from "./components/pages/GaleriaDeImagenes";
import Contacto from "./components/pages/Contacto";
import Error from "./components/pages/Error";
import CatalogoHabitaciones from "./components/pages/CatalogoHabitaciones"
import Administrador from "./components/pages/Administrador";
import FormHabitacion from "./components/pages/habitacion/FormHabitacion"



function App() {
  return (
    <BrowserRouter>
    <Nab></Nab>
    <Routes>
      <Route path="/" element={<Index></Index>}></Route>
      <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
      <Route path="/contacto" element={<Contacto></Contacto>}></Route>
      <Route path="/galeriaDeImagenes" element={<GaleriaDeImagenes></GaleriaDeImagenes>}></Route>
      <Route path="*" element={<Error></Error>}></Route>
      <Route path="/CatalogoHabitaciones" element={<CatalogoHabitaciones></CatalogoHabitaciones>}></Route>
      <Route path="/administrador" element={<Administrador></Administrador>}></Route>
      <Route path="/administrador/crear" element={<FormHabitacion></FormHabitacion>}></Route>
      <Route path="/administrador/editar" element={<FormHabitacion titulo={'Editar Habitacion'} reservandoHabitacion={flase}></FormHabitacion>}></Route>
    </Routes>
    <Foot></Foot>
    </BrowserRouter>
  );
}
export default App
