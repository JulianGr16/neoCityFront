import "bootstrap/dist/css/bootstrap.min.css";
import Nab from "./components/common/Nab";
import Foot from "./components/common/Foot";
import Index from "./components/pages/Index";
import '../src/App.css';
import GaleriaDeImagenes from "./components/pages/GaleriaDeImagenes";


function App() {

  return (
    <>
    <Nab></Nab>
    <GaleriaDeImagenes></GaleriaDeImagenes>
    {/* <Index></Index> */}
    <Foot></Foot>
    </>
  )
}

export default App
