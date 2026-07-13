import { Botones } from './Botones';
import { CarritoItem } from './CarritoItem';
import { useCarrito } from '../Context/CarritoContext';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CarritoSlider.css';

export const CarritoSlider = ({ open, onClose }) => {

    const { carrito, totalPrecio, totalUnidades , vaciarCarrito } = useCarrito();

    const [mostrar, setMostrar] = useState(open);

    const navigate = useNavigate();

    const [cerrando, setCerrando] = useState(false);

    useEffect(() => {

        if (open) {

            setMostrar(true);

            setCerrando(false);

        }

    }, [open]);

    const cerrarSlider = () => {

        setCerrando(true);

        setTimeout(() => {

            setMostrar(false);

            onClose();

        }, 350);

    };

    if (!mostrar) return null;

    return (
        <>

            <div
                className={`overlayCarrito ${cerrando ? "overlayOut" : ""}`}
                onClick={cerrarSlider}
            ></div>

            <div className={`modalSliderCarrito ${cerrando ? "slideOut" : ""}`}>

                <div className="cerrarCarritoContainer">
                    <Botones icono="trash-bin-outline" className='vaciar' onClick={vaciarCarrito}></Botones>
                    <ion-icon
                        name="close-outline"
                        onClick={cerrarSlider}
                        className='cerrarCarrito'
                    ></ion-icon>
                </div>

                <div className="carritoTitulo">
                    <p className='carritoTituloP'>Tu carrito</p>

                    <div className="carritoCantidadTotal">
                        <p>{totalUnidades} productos</p>
                    </div>

                </div>


                <div className="carritoProductosContainer">

                    {
                        carrito.length === 0 ? (

                            <div className="carritoVacio">

                                <ion-icon
                                    name="cart-outline"
                                    className="carritoVacioIcon"
                                ></ion-icon>

                                <p className="carritoVacioTitulo">
                                    Tu carrito está vacío
                                </p>

                                <p className="carritoVacioTexto">
                                    Agregá tus Cookie Boxes favoritas para comenzar tu pedido.
                                </p>

                            </div>

                        ) : (

                            carrito.map(producto => (
                                <CarritoItem
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))

                        )
                    }

                </div>

                <div className="carritoContainerDetalleCompra">

                    <div className="carritoSubtotal">
                        <p>Subtotal</p>
                        <p>{totalPrecio}</p>
                    </div>

                    <div className="carritoTotal">
                        <p>${totalPrecio}</p>
                    </div>

                    <div className="carritoBtnContainer">
                        <Botones
                            texto="Finalizar Pedido"
                            className="carritoBtn"
                            onClick={() => {
                                cerrarSlider();
                                setTimeout(() => {
                                    navigate("/Acceso");
                                }, 350);
                            }}
                        ></Botones>
                    </div>

                </div>

            </div>

        </>
    );

}