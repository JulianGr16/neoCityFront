import { Navigate } from "react-router-dom";

const RutasUsuario = ({children}) => {
    const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;
    
    // Si no hay usuario logueado, redirigir al login
    if(!usuario){
        return <Navigate to="/login"></Navigate>
    }
    
    // Si es administrador, redirigir al panel de admin
    if(usuario.esAdmin){
        return <Navigate to="/administrador"></Navigate>
    }
    
    // Si es usuario normal, permitir acceso
    return children;
}

export default RutasUsuario;
