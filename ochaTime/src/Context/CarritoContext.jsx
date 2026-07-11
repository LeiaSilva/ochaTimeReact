import { useContext, useState, createContext } from "react";

export const CarritoContext = createContext();
export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
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
    const vaciarCarrito = () => setCarrito([])
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
    //totales: productos y precios
    const totalPrecio = carrito.reduce((acc, p) => acc + (p.prec*p.cantidad) , 0);
    const totalUnidades = carrito.reduce((acc, p) => acc + p.cantidad, 0);

    return (
        <>
            <CarritoContext.Provider value={{ carrito, addToCarrito, delteToCarrito , sumarCantidad , restarCantidad , totalPrecio , totalUnidades , vaciarCarrito }}>
                {children}
            </CarritoContext.Provider>
        </>
    )
}
export const useCarrito = () => useContext(CarritoContext);