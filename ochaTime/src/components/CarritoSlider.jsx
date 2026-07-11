import { Botones } from './Botones';
import { CarritoItem } from './CarritoItem';
import { useCarrito } from '../Context/CarritoContext';
import './CarritoSlider.css';

export const CarritoSlider = ({open , onClose}) =>{
    const {carrito , totalPrecio, totalUnidades} = useCarrito();
    if(!open)
        return null ;

    return(
        <>
            <div className="modalSliderCarrito">
                <div className="cerrarCarritoContainer">
                    <ion-icon name="close-outline" onClick={onClose} className='cerrarCarrito'></ion-icon>
                </div>
                
                <div className="carritoTitulo">
                    <p className='carritoTituloP'>Tu carrito</p>
                    <div className="carritoCantidadTotal">
                        <p>{totalUnidades} productos</p>
                    </div>
                </div>
                <div className="carritoEnvioGratis">
                    <p>Aca va la cantidad que falta para envio gratis</p>
                </div>
                <div className="carritoProductosContainer">
                    {
                        carrito.map(producto=>{
                            return(
                                <>
                                    <CarritoItem key={producto.id} producto={producto}></CarritoItem>
                                </>
                            )
                        })
                    }
                </div>
                <div className="carritoContainerDetalleCompra">
                    <div className="carritoSubtotal">
                        <p>Subtotal</p>
                        <p>Precio</p>
                    </div>
                    <div className="carritoEnvioPrec">
                        <p>Envio</p>
                        <p>Precio</p>
                    </div>
                    <div className="carritoTotal">
                        <p>${totalPrecio}</p>
                    </div>
                    <div className="carritoBtnContainer">
                        <Botones texto='Finalizar Pedido' className='carritoBtn'></Botones>
                    </div>
                    
                </div>
            </div>
        </>
    )
}