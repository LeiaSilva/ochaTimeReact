import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css';

export const NavBarAdmin = () => {
        const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className="nav">
                <ion-icon
                    name={menuOpen ? "close-outline" : "home-outline"}
                    className="homeResponsive"
                    onClick={() => setMenuOpen(!menuOpen)}
                ></ion-icon>
                <div className="-logo">
                    <Link to={`/`}><p>Ocha Time</p></Link>
                </div>
                <ul className={`-list ${menuOpen ? "menuOpen" : ""}`}>
                    <li>
                        <NavLink to={`/ListaProductos`} className={({ isActive }) => isActive ? 'activo' : ''}>Mis Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Admin`} className={({ isActive }) => isActive ? 'activo' : ''}>Agregar Productos</NavLink>
                    </li>
                     <li>
                        <NavLink to={`/GestionCupones`} className={({ isActive }) => isActive ? 'activo' : ''}>Cupones</NavLink>
                    </li>
                </ul>
            </nav>
        </>

    );
};