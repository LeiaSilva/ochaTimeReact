import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Botones } from './Botones';
import style from './CardProduct.module.css';
export const CardProduct = ({ nombre, prec, descuento, img, stock, id, addToCarrito }) => {
    //--Sobre cards
    const hayDesc = descuento > 0;
    const montoDesc = (prec * descuento) / 100;
    const precFinal = prec - montoDesc;
    const addBadge = hayDesc ? <span className={style.desc}>{descuento}%</span> : null;
    const tacharPrec = hayDesc ? <p className={style.precTachado}>${prec}</p> : null;
    //--Sobre carrito
    const [cantidad, setCantidad] = useState(0);
    const suma = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
            console.log("SE SUMO 1 CANTIDAD")

        }
    }
    const resta = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
            console.log("SE RESTO 1 CANTIDAD");

        }
    }

    const noPuedeAgregarCarrito = cantidad == 0 ? <p className={style.adv}>Debe agregar un cantidad</p> : <Botones texto="Agregar" icono="add-outline" className={style.btnCard} onClick={() => {
        addToCarrito({ nombre, prec, cantidad })
    }}></Botones> ;
    return (
        <>

            <div className={style.cardContainer}>
                <Link to={`/producto/${id}`} className={style.cardLink}>
                    <img src={img} alt={nombre} className={style.cardImg} />
                    {addBadge}
                    <div className={style.esp}>
                        <p className={style.stock}>Disponible:{stock}</p>
                        <p className={style.prodName}>{nombre}</p>
                        <div className={style.prec}>
                            {tacharPrec}
                            <p>${precFinal}</p>
                        </div>

                    </div>
                </Link>
                <div className={style.cantidad}>
                    <button onClick={resta}>-</button>
                    <span className={style.cant}>{cantidad}</span>
                    <button onClick={suma}>+</button>
                </div>
                <div className={style.btns}>
                    {noPuedeAgregarCarrito}
                </div>
            </div>



        </>
    )
}