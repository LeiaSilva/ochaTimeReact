import { useContext, useState, createContext } from "react";

export const CarritoContext = createContext();
export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);
    const addToCarrito = (producto) => {
        setCarrito([...carrito, producto])
    }
    const delteToCarrito = (id)=>{
        setCarrito(carrito.filter(p=> p.id !==id))
    }
    
    return(
        <>
            <CarritoContext.Provider value={{carrito , addToCarrito , delteToCarrito}}>
                {children}
            </CarritoContext.Provider>
        </>
    )
} 
export const useCarrito = () => useContext(CarritoContext);