import { NavLink, Link } from 'react-router-dom';
import './Footer.css';
export const Footer = ()=>{
    return(
        <>
        <footer>
            <div className="footer-container">
                <div className="-section1">
                    <p>Ocha Time</p>
                </div>
                <div className="-section2">
                    <div className="nuestrasRedes">
                        <p>Contacto</p>
                        <div className="iconos">
                            <div className="insta">
                            <ion-icon name="logo-instagram"></ion-icon>
                        </div>
                        <div className="wsp">
                            <ion-icon name="logo-whatsapp"></ion-icon>
                        </div>
                        </div>
                        
                    </div>
                    <div className="linksNav">
                        <ul className="listFooter">
                    <li>
                        <NavLink to={`/`} className="link">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Shop`} className="link">Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/QuienesSomos`} className="link">Quienes Somos</NavLink>
                    </li>
                </ul>
                    </div>
                </div>
            </div>
            <hr />
            <p className='footer-derechos'>Ocha Time 2026 - Derechos Reservados</p>
        </footer>
        </>
    )
}