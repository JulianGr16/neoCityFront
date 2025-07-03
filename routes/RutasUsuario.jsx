import { Navigate } from "react-router-dom";

const RutasUsuario = ({children}) => {
    const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;
    

    if(!usuario){
        return <Navigate to="/login"></Navigate>
    }
    

    if(usuario.esAdmin){
        return <Navigate to="/administrador"></Navigate>
    }
    

    return children;
}

export default RutasUsuario;
