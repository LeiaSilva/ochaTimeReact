import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useCarrito } from "../Context/CarritoContext";
import { Botones } from "../components/Botones";
import { Cantidad } from "../components/Cantidad";
import { Advertencias } from "../components/Advertencias";
import { db } from '../Firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import style from "./Detalles.module.css";

export const Detalles = () => {
    const { addToCarrito } = useCarrito();
    const { id } = useParams();
    const [producto, setProducto] = useState(null)  // ← null, no array

    useEffect(() => {
        const fetchProducto = async () => {
            const docRef = doc(db, 'productos', id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() })
            }
        }
        fetchProducto()  // ← nombre correcto
    }, [id])

    const [cantidad, setCantidad] = useState(0);
    const suma = () => { if (cantidad < stock) setCantidad(cantidad + 1) }
    const resta = () => { if (cantidad > 0) setCantidad(cantidad - 1) }

    const [adv, setAdv] = useState(false);
    const muestraAdv = () => {
        if (cantidad === 0) {
            setAdv(true);
            setTimeout(() => setAdv(false), 2000);
        } else {
            addToCarrito({ nombre, prec, cantidad, id, img });
            setAdv(false);
        }
    }

    if (!producto) return <Advertencias texto="Cargando productos.." icon="reload-outline" />

    const { nombre, prec, descripcion, stock, img, personalizable, descuento } = producto;
    const esPersonalizable = personalizable ? <Botones texto="Personalizar" className={style.perso} /> : <p className={style.noEsPerso}>Este producto no es personalizable.</p>;
    const hayDesc = descuento > 0;
    const montoDesc = (prec * descuento) / 100;
    const precFinal = prec - montoDesc;
    const addBadge = hayDesc ? <span className={style.desc}>{descuento}%</span> : null;
    const tacharPrec = hayDesc ? <p className={style.precTachado}>${prec}</p> : null;
    const CompraHabil = stock > 0 ? <Botones texto="Agregar al carrito" className={style.compra} onClick={muestraAdv} /> : null;

    return (
        <>
            {adv && <Advertencias texto="Debes seleccionar una cantidad" icon="alert-circle-outline" />}
            <Link to="/Shop">
                <div className={style.volverInicio}>
                    <Botones texto="Volver a Shop" className={style.volverShop} />
                </div>
            </Link>
            <div className={style.detailContainer}>
                <div className={style.detailProducto}>
                    <img src={img} alt={nombre} className={style.detailImg} />
                    {addBadge}
                </div>
                <div className={style.detailInfo}>
                    <h3 className={style.detailInfoNom}>{nombre}</h3>
                    <p className={style.detailDescrip}>Contiene: {descripcion}</p>
                    <div className={style.detailPrec}>
                        {tacharPrec}
                        <p>${precFinal}</p>
                    </div>
                    <Cantidad cantidad={cantidad} onSumar={suma} onRestar={resta} />
                    <div className={style.detailInfoBtns}>
                        {esPersonalizable}
                        {CompraHabil}
                    </div>
                    <p className={style.detailStock}>Disponible: {stock}</p>
                </div>
            </div>
        </>
    )
}