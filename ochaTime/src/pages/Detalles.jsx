import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useCarrito } from "../Context/CarritoContext";
import { CardProduct } from "../components/CardProduct";
import { Botones } from "../components/Botones";
import { Cantidad } from "../components/Cantidad";
import { Advertencias } from "../components/Advertencias";
import style from "./Detalles.module.css";

export const Detalles = () => {
    const {addToCarrito} = useCarrito();
    //fetch
    const { id } = useParams();
    const [productos, setProductos] = useState([])
    useEffect(() => {
        fetch('/productos.json')
            .then(res => res.json())
            .then(data => setProductos(data))
    }, [])
    const producto = productos.find(p => p.id === Number(id));
    //carrito
    
    const [cantidad, setCantidad] = useState(0);
    const suma = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);

        }
    }
    const resta = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);

        }
    }
    //Advertencia
    const [adv, setAdv] = useState(false);
    const muestraAdv = () => {
        if (cantidad === 0) {
            setAdv(true);
            setTimeout(() => setAdv(false), 2000);
        } else {
            addToCarrito({ nombre, prec, cantidad , id });
            setAdv(false);
        }
    }
    if (!producto) return <Advertencias texto="Cargando productos.." icon="reload-outline"></Advertencias>
    //visuals

    const { nombre, prec, descripcion, stock, img, personalizable, descuento } = producto;
    const esPersonalizable = personalizable ? <Botones texto="Personalizar" className={style.perso}></Botones> : <p className={style.noEsPerso}>Este producto no es personalizable.</p>;
    const hayDesc = descuento > 0;
    const montoDesc = (prec * descuento) / 100;
    const precFinal = prec - montoDesc;
    const addBadge = hayDesc ? <span className={style.desc}>{descuento}%</span> : null;
    const tacharPrec = hayDesc ? <p className={style.precTachado}>${prec}</p> : null;
    const noHayStock = stock == 0;
    const mostrarNoStock = noHayStock ? <p className={style.noStock}> No disponible.</p> : null;
    const CompraHabil = stock > 0 ? <Botones texto="Agregar al carrito" className={style.compra} onClick={muestraAdv}></Botones> : null;

    return (
        <>
            {adv && (
                <Advertencias
                    texto="Debes seleccionar una cantidad"
                    icon="alert-circle-outline"
                />
            )}
            <Link to={`/`}>
                <div className={style.volverInicio}>
                    <Botones texto="Volver a Shop" className={style.volverShop}></Botones>
                </div>
            </Link>
            <div className={style.detailContainer}>
                <div className={style.detailProducto}>
                    <img src={img} alt={nombre} className={style.detailImg} />
                    {addBadge}
                </div>
                <div className={style.detailInfo}>
                    <h3 className={style.detailInfoNom}>{nombre}</h3>
                    <p className={style.detailDescrip} > Contiene: {descripcion}</p>
                    <div className={style.detailPrec}>
                        {tacharPrec}
                    <p>${precFinal}</p>
                    </div>
                    <Cantidad cantidad={cantidad} onSumar={suma} onRestar={resta}></Cantidad>
                    <div className={style.detailInfoBtns}>
                        {esPersonalizable}
                        {CompraHabil}
                    </div>
                    <p className={style.detailStock}>Disponible:{stock}</p>
                </div>
            </div>
        </>
    )
}