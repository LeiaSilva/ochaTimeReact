import { Botones } from "../components/Botones";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Advertencias } from "../components/Advertencias";
import './Login.css';
export const Login = ({ }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(email, password)
            navigate('/Admin')
        } catch (error) {
            setError('Email o contraseña incorrectos')
            setTimeout(() => setError(''), 2000)
        }
    }
    return (
        <>
            <div className="login">
                <div className="loginContariner">
                    <div className="loginInfoContainer">
                        <div className="loginFormOchatime">
                            <p>Ocha Time</p>
                        </div>
                        <div className="loginFormTitulo">
                            <p>Panel Administrador</p>
                            <ion-icon name="shield-checkmark-outline" className='adminIcon'></ion-icon>
                        </div>
                    </div>
                    <form action="" className="loginForm" onSubmit={handleLogin}>
                        <div className="loginFormCorreo">
                            <label htmlFor="" className="labelEmail">Correo Electronico</label>
                            <div className="loginFormCorreoInputContainer">
                                <div className="loginFormCorreoInput">
                                    <div className="emailIconContainer">
                                        <ion-icon name="mail-outline" className='emailIcon'></ion-icon>
                                    </div>
                                    <div className="emailInputContainer">
                                        <input type="email"
                                            placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loginFormPassword">
                            <label htmlFor="" className="labelPassword">Contraseña</label>
                            <div className="loginFormPasswordInputContainer">
                                <div className="loginFormPasswordInput">
                                    <div className="passwordIconContainer">
                                        <ion-icon name="lock-closed-outline" className='passwordIcon'></ion-icon>
                                    </div>
                                    <div className="passwordInputContainer">
                                        <input type="password"
                                            placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="loginFormBtn">
                            <Botones texto='Ingresar al panel' className='btnIngresar' type='submit'></Botones>
                        </div>
                        {error && <Advertencias icon="alert-circle-outline" texto={error} />}
                    </form>
                    <div className="loginVolver">
                        <Link to="/" className="inicio">
                            <ion-icon name="return-down-back-outline"></ion-icon>
                            Volver a Inicio
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}