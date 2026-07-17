import { useContext, useState, createContext } from "react";
import { buscarCupon } from "../firebase/cupones";

export const CarritoContext = createContext();
export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const [cuponAplicado, setCuponAplicado] = useState(null);
    //Agregar al carrito
    const addToCarrito = (producto) => {
        const existe = carrito.find(p => p.id === producto.id)
        if (existe) {
            setCarrito(carrito.map(p =>
                p.id === producto.id
                    ? { ...p, cantidad: p.cantidad + producto.cantidad }
                    : p
            ))
        } else {
            setCarrito([...carrito, producto])
        }
    }
    //borrar el carrito
    const delteToCarrito = (id) => {
        setCarrito(carrito.filter(p => p.id !== id))
    }
    const vaciarCarrito = () => {
        setCarrito([]);
        setCuponAplicado(null);
    }
    //sobre sumar y restar productos en carrito 
    const sumarCantidad = (id) => {
        setCarrito(carrito.map(p =>
            p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        ))
    }

    const restarCantidad = (id) => {
        setCarrito(carrito.map(p =>
            p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
        ))
    }
    const aplicarCupon = async (codigo) => {

        const cupon = await buscarCupon(codigo);

        if (!cupon) {
            return {
                ok: false,
                mensaje: "El cupón no existe."
            };
        }

        if (!cupon.activo) {
            return {
                ok: false,
                mensaje: "El cupón no está activo."
            };
        }

        setCuponAplicado(cupon);

        return {
            ok: true,
            mensaje: "Cupón aplicado correctamente."
        };
    }
    //totales: productos y precios
    const totalPrecio = carrito.reduce((acc, p) => acc + (p.prec * p.cantidad), 0);
    const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    const descuento = cuponAplicado
        ? totalPrecio * (cuponAplicado.descuento / 100)
        : 0;

    const totalFinal = totalPrecio - descuento;

    return (
        <>
            <CarritoContext.Provider value={{
                carrito, addToCarrito, delteToCarrito, sumarCantidad, restarCantidad, totalPrecio, totalUnidades, vaciarCarrito, cuponAplicado,
                aplicarCupon,
                descuento,
                totalFinal
            }}>
                {children}
            </CarritoContext.Provider>
        </>
    )
}
export const useCarrito = () => useContext(CarritoContext);