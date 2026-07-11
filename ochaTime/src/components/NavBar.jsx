import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCarrito } from '../Context/CarritoContext';
import {CarritoSlider} from './CarritoSlider';
import './NavBar.css';

export const NavBar = () => {
    const {carrito , totalUnidades} = useCarrito();
    const [animar, setAnimar] = useState(false);
    const [openCarrito , setOpenCarrito] = useState(false);
    useEffect(() => {
        if (totalUnidades > 0) {
            setAnimar(true);
            setTimeout(() => {
                setAnimar(false);
            }, 800);
        } ;
    }, [carrito]);

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
                <div className={`containerCarrito ${animar ? 'bounce' : ''}`}>
                    <span className="-contador">{totalUnidades}</span>
                    <ion-icon name="cart-outline" className="-icon" onClick={() => setOpenCarrito(true)}></ion-icon>
                </div>
                <CarritoSlider open={openCarrito} onClose={() => setOpenCarrito(false)}></CarritoSlider>
            </nav>
        </>

    );
};