import "bootstrap/dist/css/bootstrap.min.css";
import Nab from "./components/common/Nab";
import Foot from "./components/common/Foot";
import Contactos from "./components/pages/Contacto";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Nab />
      <Routes>
        <Route path="/contacto" element={<Contactos />} />
      </Routes>
    </Router>
  );
}
export default App
