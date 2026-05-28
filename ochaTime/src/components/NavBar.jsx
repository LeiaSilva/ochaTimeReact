import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = ({ carrito }) => {
    return (
        <>
            <nav className="nav">
                <ion-icon name="home-outline" className="homeResponsive"></ion-icon>
                <div className="-logo">
                    <Link to={`/`}><p>Ocha Time</p></Link>
                </div>
                <ul className="-list">
                    <li>
                        <NavLink to={`/Home`} className={({ isActive }) => isActive ? 'activo' : ''}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/`} className={({ isActive }) => isActive ? 'activo' : ''}>Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/QuienesSomos`} className={({ isActive }) => isActive ? 'activo' : ''}>Quienes Somos</NavLink>
                    </li>
                </ul>
                <div className="containerCarrito">
                    <span className="-contador">{carrito.length}</span>
                    <ion-icon name="cart-outline" className="-icon"></ion-icon>
                </div>
            </nav>
        </>

    );
};