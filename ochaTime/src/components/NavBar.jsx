
import './NavBar.css';

export const NavBar = ({ carrito }) => {
    return (
        <>
            <nav className="nav">
                <ion-icon name="home-outline" className="homeResponsive"></ion-icon>
                <div className="-logo">
                    <p>OCHA TIME</p>
                </div>
                <ul className="-list">
                    <li>Home</li>
                    <li>Productos</li>
                    <li>Quienes Somos</li>
                </ul>
                <div className="containerCarrito">
                    <span className="-contador">{carrito.length}</span>
                    <ion-icon name="cart-outline" className="-icon"></ion-icon>
                </div>
            </nav>
        </>

    );
};