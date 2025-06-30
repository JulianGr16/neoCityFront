import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children, tipoRuta = "admin"}) => {
    const usuario = JSON.parse(sessionStorage.getItem('NeoCityHotel')) || null;
    
    // Si no hay usuario logueado, redirigir al login
    if(!usuario){
        return <Navigate to="/login"></Navigate>
    }
    
    // Si es ruta de administrador
    if(tipoRuta === "admin"){
        // Solo permitir acceso si es administrador
        if(usuario.esAdmin){
            return children;
        } else {
            return <Navigate to="/"></Navigate>
        }
    }
    
    // Si es ruta de usuario
    if(tipoRuta === "usuario"){
        // Si es administrador, redirigir al panel de admin
        if(usuario.esAdmin){
            return <Navigate to="/administrador"></Navigate>
        }
        // Si es usuario normal, permitir acceso
        return children;
    }
    
    // Por defecto, permitir acceso si está logueado
    return children;
}

export default RutasProtegidas;