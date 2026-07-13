import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css';

export const NavBarAdmin = () => {

    return (
        <>
            <nav className="nav">
                <ion-icon name="home-outline" className="homeResponsive"></ion-icon>
                <div className="-logo">
                    <Link to={`/`}><p>Ocha Time</p></Link>
                </div>
                <ul className="-list">
                    <li>
                        <NavLink to={`/ListaProductos`} className={({ isActive }) => isActive ? 'activo' : ''}>Mis Productos</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/Admin`} className={({ isActive }) => isActive ? 'activo' : ''}>Agregar Productos</NavLink>
                    </li>
                </ul>
            </nav>
        </>

    );
};