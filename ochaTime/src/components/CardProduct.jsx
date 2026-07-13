import { useState } from 'react';
import { useCarrito } from '../Context/CarritoContext';
import { Link } from 'react-router-dom';
import { Botones } from './Botones';
import { Cantidad } from './Cantidad';
import { Advertencias } from './Advertencias';
import style from './CardProduct.module.css';
export const CardProduct = ({ producto }) => {
    const { addToCarrito } = useCarrito();
    const {nombre, prec, descuento, img, stock, id} = producto
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
    //Advertencia
    const [adv, setAdv] = useState(false);
    const muestraAdv = () => {
        if (cantidad === 0) {
            setAdv(true);
            setTimeout(() => setAdv(false), 2000);
        } else {
            addToCarrito({ id, nombre, prec, cantidad, img });
            setAdv(false);
        }
    }

    const PuedeAgregarCarrito = stock > 0 ? <Botones texto="Agregar" icono="add-outline" className={style.btnCard} onClick={muestraAdv}></Botones> : null;
    return (
        <>
            {
                adv && <Advertencias texto="Seleccione una cantidad" icon="alert-circle-outline"></Advertencias>
            }

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
                <Cantidad cantidad={cantidad} onSumar={suma} onRestar={resta}></Cantidad>
                <div className={style.btns}>
                    {PuedeAgregarCarrito}
                </div>
            </div>



        </>
    )
}