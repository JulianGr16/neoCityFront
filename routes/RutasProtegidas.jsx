import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children, tipoRuta = "admin"}) => {
    const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;
    
    if(!usuario){
        return <Navigate to="/login"></Navigate>
    }
    
    if(tipoRuta === "admin"){
        if(usuario.esAdmin){
            return children;
        } else {
            return <Navigate to="/"></Navigate>
        }
    }
    
    if(tipoRuta === "usuario"){
        if(usuario.esAdmin){
            return <Navigate to="/administrador"></Navigate>
        }
        return children;
    }
    
    return children;
}

export default RutasProtegidas;