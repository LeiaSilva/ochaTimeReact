import { Link } from "react-router-dom";
import "./LoginUser.css";
import { Botones } from "../components/Botones";
import { Advertencias } from "../components/Advertencias";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, loginGoogle } = useAuth();

    const navigate = useNavigate();
    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError("Completá todos los campos.");
            setTimeout(() => setError(""), 2500);
            return;
        }

        try {

            await login(email, password);

            navigate("/", {
                state: {
                    mensaje: "🍪 ¡Bienvenido nuevamente!"
                }
            });

        } catch {

            setError("Email o contraseña incorrectos.");
            setTimeout(() => setError(""), 2500);

        }

    };

    return (
        <div className="authContainer">

            <div className="authCard">

                <h2>Bienvenido de nuevo 🍪</h2>

                <p>
                    Iniciá sesión para continuar con tu pedido
                </p>


                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <input
                        type="password"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <Botones texto='Iniciar Sesion' className='btnIniciaSesion' type='submit'></Botones>

                </form>


                <div className="separador">
                    <span>o</span>
                </div>


                <Botones className="googleBtn" texto='Continuar con Google' icono="logo-google" onClick={loginGoogle} ></Botones>


                <p className="cambiarAuth">

                    ¿Todavía no tenés cuenta? 🌸

                    <Link to="/RegistroUser">
                        Registrate
                    </Link>

                </p>


            </div>
            {error && (
                <Advertencias
                    icon="alert-circle-outline"
                    texto={error}
                />)}

        </div>

    )
}