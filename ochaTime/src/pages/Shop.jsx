import { CardProduct } from '../components/CardProduct';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Shop.css';
export const Shop = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('/productos.json')
            .then(res => res.json())
            .then(data => setProductos(data))
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