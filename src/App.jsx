import "bootstrap/dist/css/bootstrap.min.css";
import Nab from "./components/common/Nab";
import Foot from "./components/common/Foot";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./components/pages/Index";
import '../src/App.css';
import Error from "./components/pages/Error";
import Login from "./components/pages/Login"
import { useState } from "react";
import RutasProtegidas from "../routes/RutasProtegidas";
import RutasAdmin from "../routes/RutasAdmin";
import CatalogoHabitaciones from "./components/pages/CatalogoHabitaciones";
import QuienesSomos from "./components/pages/QuienesSomos";
import Contacto from "./components/pages/Contacto";
import GaleriaDeImagenes from "./components/pages/GaleriaDeImagenes";
import Registro from "./components/pages/Registro";
import Bienvenidos from "./components/pages/Bienvenidos";
import MisReservas from "./components/pages/MisReservas";

function App() {

  const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario)

  return (
    <BrowserRouter>
    <Nab usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado}></Nab>
    <Routes>
      <Route path="/" element={<Index></Index>}></Route>
      <Route path="/quienesSomos" element={<QuienesSomos></QuienesSomos>}></Route>
      <Route path="/contacto" element={<Contacto></Contacto>}></Route>
      <Route path="/galeriaDeImagenes" element={<GaleriaDeImagenes></GaleriaDeImagenes>}></Route>
      <Route path="/CatalogoHabitaciones" element={<CatalogoHabitaciones></CatalogoHabitaciones>}></Route>
      <Route path="/login" element={<Login setUsuarioLogueado={setUsuarioLogueado}></Login>}></Route>
      <Route path="/administrador/*" element={<RutasProtegidas tipoRuta="admin"><RutasAdmin></RutasAdmin></RutasProtegidas>}></Route>
      <Route path="/Registrarme" element={<Registro></Registro>}></Route>
      <Route path="/bienvenidos" element={<Bienvenidos></Bienvenidos>}></Route>
      <Route path="/mis-reservas" element={<RutasProtegidas tipoRuta="usuario"><MisReservas></MisReservas></RutasProtegidas>}></Route>
      <Route path="*" element={<Error></Error>}></Route>
    </Routes>
    <Foot></Foot>
    </BrowserRouter>
  );
}
export default App
