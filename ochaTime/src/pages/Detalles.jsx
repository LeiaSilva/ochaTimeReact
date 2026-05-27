import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { CardProduct } from "../components/CardProduct";
import { Botones } from "../components/Botones";
import style from "./Detalles.module.css";

export const Detalles = ({addToCarrito}) => {
    //fetch
    const { id } = useParams();
    const [productos, setProductos] =useState([])
    useEffect(() => {
        fetch('/productos.json')
            .then(res => res.json())
            .then(data => setProductos(data))
    }, [])
    const producto = productos.find(p => p.id === Number(id));
    if(!producto) return <p>Cargando...</p>   
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
    const CompraHabil = stock > 0 ? <Botones texto="Agregar al carrito" className={style.compra} onClick={()=>addToCarrito({prec , nombre})}></Botones> : null;

    return (
        <>
            <Link to={`/`}>
                <div className={style.volverInicio}>
                    <Botones texto="Volver a Shop" className={style.volverShop}></Botones>
                </div>
            </Link>
            <div className={style.detailContainer}>
                <div className={style.detailProducto}>
                    <img src={img} alt={nombre} className={style.detailImg} />
                </div>
                <div className={style.detailInfo}>
                    <h3 className={style.detailInfoNom}>{nombre}</h3>
                    <p className={style.detailDescrip} > Contiene: {descripcion}</p>
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