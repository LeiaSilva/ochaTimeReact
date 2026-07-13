import { CardProduct } from '../components/CardProduct';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase/config';
import { collection, getDocs } from 'firebase/firestore'
import './Shop.css';
export const Shop = () => {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
    const fetchProductos = async () => {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const lista = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setProductos(lista)
    }
    fetchProductos()
}, [])
    
    return (
        <>
            <section className='tienda'>
                {
                    productos.map((producto, index) => {
                        return (
                            <CardProduct key={index} {...producto}></CardProduct>
                        )
                    })
                }
            </section>

        </>
    )

}