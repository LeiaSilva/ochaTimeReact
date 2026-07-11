import { useCarrito } from '../Context/CarritoContext';
import { Cantidad } from './Cantidad';
import './CarritoItem.css';

export const CarritoItem = ({producto})=>{
    const {delteToCarrito , sumarCantidad , restarCantidad } = useCarrito();
    const { nombre, img, prec, cantidad , size , id } = producto;
    return(
        <>
            <div className="cardCarritoContainer">
                <div className="cardCarritoImg">
                    <img src={img} alt="cookieBoxFoto" />
                </div>
                <div className="cardCarritoDetalle">
                    <div className="cardCarritoDetalleTitulo">
                        <p>{nombre}</p>
                    </div>
                    <div className="cardCarritoSize">
                        <p>{size}</p>
                    </div>
                    <div className="cardCarritoPrec">
                        <p>{prec}</p>
                    </div>
                    <div className="cardCarritoCantidad">
                        <Cantidad cantidad={cantidad} onSumar={() => sumarCantidad(producto.id)} onRestar={() => restarCantidad(producto.id)}></Cantidad>
                    </div>
                </div>
                <div className="cardCarritoEliminar">
                    <ion-icon name="trash-outline" className="eliminarCarrito" onClick={() => delteToCarrito(producto.id)}></ion-icon>
                </div>
            </div>
        </>
    )
}