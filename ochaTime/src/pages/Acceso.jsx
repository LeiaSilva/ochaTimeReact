import { Link } from "react-router-dom";
import './Acceso.css';

export const Acceso = () => {
  return (
    <div className="accesoLogin">

      <h2>Bienvenido 🍪</h2>
      <p>¿Cómo queres ingresar?</p>

      <Link to="/LoginUser">
        🛒 Soy cliente
      </Link>

      <Link to="/login">
        🔐 Soy administrador
      </Link>

    </div>
  );
};
