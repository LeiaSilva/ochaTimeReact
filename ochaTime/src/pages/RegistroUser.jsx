
import { useState } from "react";
import { auth } from "../Firebase/config";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { Botones } from "../components/Botones";
import { Advertencias } from "../components/Advertencias";
import { useNavigate } from "react-router-dom";

import './RegistroUser.css'
export const RegistroUser = ({ }) => {
    const navigate = useNavigate();
    const { register, loginGoogle } = useAuth();
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const handleRegister = async (e) => {

        e.preventDefault();

        if (!nombre || !email || !password || !confirmPassword) {

            setError("Completá todos los campos.");

            setTimeout(() => setError(""), 2500);

            return;

        }

        if (password !== confirmPassword) {

            setError("Las contraseñas no coinciden.");

            setTimeout(() => setError(""), 2500);

            return;

        }

        try {

            await register(email, password);

            navigate("/", {
                state: {
                    mensaje: "🌸 ¡Cuenta creada correctamente!"
                }
            });

        } catch (error) {

            setError("Ese correo ya está registrado.");

            setTimeout(() => setError(""), 2500);

        }

    };

    return (
        <>
            <div className="authContainer">

                <div className="authCard">

                    <h2>Crear cuenta 🍪</h2>

                    <p>
                        Registrate para comenzar tu pedido
                    </p>

                    <form onSubmit={handleRegister}>

                        <input
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => setNombre(e.target.value)}
                        />


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


                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />


                        <Botones texto='Registrarse' type='submit' className="btnIniciaSesion"></Botones>

                    </form>
                    <div className="separador">
                        <span>o</span>
                    </div>


                    <Botones className='googleBtn' icono="logo-google" texto='Registrarse con Google' onClick={loginGoogle}>

                    </Botones>



                    <p className="cambiarAuth">

                        ¿Ya tenés cuenta?

                        <Link to="/LoginUser">
                            Iniciar sesión
                        </Link>

                    </p>


                </div>
                {error && (
                    <Advertencias
                        icon="alert-circle-outline"
                        texto={error}
                    />
                )}

            </div>
        </>
    )
}