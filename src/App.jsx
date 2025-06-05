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
import Login from "./components/pages/Login"
import { useState } from "react";
import RutasProtegidas from "../routes/RutasProtegidas";
import RutasAdmin from "../routes/RutasAdmin";


function App() {

  const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario)

  return (
    <BrowserRouter>
    <Nab usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Nab>
    <Routes>
      <Route path="/" element={<Index></Index>}></Route>
      <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}></Route>
      <Route path="/administrador/*" element={<RutasProtegidas><RutasAdmin></RutasAdmin></RutasProtegidas>}></Route>
      <Route path="*" element={<Error></Error>}></Route>
    </Routes>
    <Foot></Foot>
    </BrowserRouter>
  );
}
export default App
