
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

export const RutaProtegida = ({ children }) => {
    const { usuario, cargando } = useAuth()

    if(cargando) return <p>Cargando...</p>

    if(!usuario) return <Navigate to="/login" /> 

    return children
}