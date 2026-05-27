import { Link } from 'react-router-dom';
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
                    <Link to={`/Home`}><li>Home</li></Link>
                    <Link to={`/`}><li>Productos</li></Link>
                    <Link to={`/QuienesSomos`}><li>Quienes Somos</li></Link>
                </ul>
                <div className="containerCarrito">
                    <span className="-contador">{carrito.length}</span>
                    <ion-icon name="cart-outline" className="-icon"></ion-icon>
                </div>
            </nav>
        </>

    );
};