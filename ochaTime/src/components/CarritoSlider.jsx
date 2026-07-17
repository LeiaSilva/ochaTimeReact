import { Botones } from './Botones';
import { CarritoItem } from './CarritoItem';
import { useCarrito } from '../Context/CarritoContext';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CarritoSlider.css';

export const CarritoSlider = ({ open, onClose }) => {

    const {
        carrito,
        totalPrecio,
        totalUnidades,
        vaciarCarrito,

        aplicarCupon,
        cuponAplicado,
        descuento,
        totalFinal

    } = useCarrito();

    const [mostrar, setMostrar] = useState(open);

    const navigate = useNavigate();

    const [cerrando, setCerrando] = useState(false);
    const [codigoCupon, setCodigoCupon] = useState("");
    const [mensajeCupon, setMensajeCupon] = useState("");
    const [errorCupon, setErrorCupon] = useState(false);

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
    const handleAplicarCupon = async () => {

        const respuesta = await aplicarCupon(codigoCupon);

        setMensajeCupon(respuesta.mensaje);
        setErrorCupon(!respuesta.ok);

    }

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
                    <div className="carritoCuponContainer">

                        <input
                            type="text"
                            placeholder="Código de descuento"
                            value={codigoCupon}
                            onChange={(e) => setCodigoCupon(e.target.value)}
                        />

                        <Botones
                            texto="Aplicar"
                            className="btnCupon"
                            onClick={handleAplicarCupon}
                        />

                    </div>

                    {
                        mensajeCupon &&

                        <p className={errorCupon ? "mensajeErrorCupon" : "mensajeExitoCupon"}>

                            {mensajeCupon}

                        </p>

                    }

                    <div className="carritoSubtotal">
                        <p>Subtotal</p>
                        <p>{totalPrecio}</p>
                    </div>
                    {
                        cuponAplicado && (

                            <div className="carritoDescuento">

                                <p>
                                    Descuento ({cuponAplicado.codigo})
                                </p>

                                <p>
                                    -${descuento.toFixed(2)}
                                </p>

                            </div>
                        )
                    }

                    <div className="carritoTotal">
                        <p>${totalFinal}</p>
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