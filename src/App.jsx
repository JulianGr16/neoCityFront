import "bootstrap/dist/css/bootstrap.min.css";
import Nab from "./components/common/Nab";
import Foot from "./components/common/Foot";
import Contactos from "./components/pages/Contacto";
import QuienesSomos from "./components/pages/QuienesSomos"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/pages/Index";
import '../src/App.css';
import GaleriaDeImagenes from "./components/pages/GaleriaDeImagenes";


function App() {
  return (
    <Router>
      <Nab />
      <Routes>
        <Route path="/contacto" element={<Contactos />} />
        <Route path="/QuienesSomos" element={<QuienesSomos/>} />
      </Routes>
    </Router>
   <>
    <Nab></Nab>
    <GaleriaDeImagenes></GaleriaDeImagenes>
    {/* <Index></Index> */}
    <Foot></Foot>
    </>
  );
}
export default App
