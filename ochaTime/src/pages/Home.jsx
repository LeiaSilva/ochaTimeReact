import { db } from '../Firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import { CardProduct } from '../components/CardProduct'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Home.css';
export const Home = () => {

    const [destacados, setDestacados] = useState([])

    useEffect(() => {
        const fetchDestacados = async () => {
            const querySnapshot = await getDocs(collection(db, 'productos'))
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            const soloDestacados = lista.filter(p => p.destacado === true)
            setDestacados(soloDestacados)
        }
        fetchDestacados()
    }, [])
    return (
        <>
            {/* SLIDER - por ahora placeholder */}
            <section className="homeBanner">
                <h1>Bienvenida a Ocha Time 🍪</h1>
                <p>Las mejores cookie boxes kawaii</p>
            </section>
            {/* VALORES */}
            <section className="homeValores">
                <h2>¿Por qué elegirnos?</h2>
                <div className="homeValoresGrid">
                    <div className="homeValorCard">
                        <ion-icon name="heart-outline" class="valorIcon"></ion-icon>
                        <h3>Hecho con Amor</h3>
                        <p>Cada cookie box es preparada con dedicación y cariño para vos</p>
                    </div>
                    <div className="homeValorCard">
                        <ion-icon name="color-palette-outline" class="valorIcon"></ion-icon>
                        <h3>Diseños Kawaii</h3>
                        <p>Creaciones únicas y adorables que no vas a encontrar en ningún otro lado</p>
                    </div>
                    <div className="homeValorCard">
                        <ion-icon name="leaf-outline" class="valorIcon"></ion-icon>
                        <h3>Galletas Artesanales</h3>
                        <p>Elaboradas con ingredientes de calidad, sin conservantes ni aditivos</p>
                    </div>
                    <div className="homeValorCard">
                        <ion-icon name="home-outline" class="valorIcon"></ion-icon>
                        <h3>100% Casero</h3>
                        <p>Comida verdaderamente casera, preparada en un ambiente familiar y con recetas propias</p>
                    </div>
                </div>
            </section>

            {/* PRODUCTOS DESTACADOS */}
            <section className="homeDestacados">
                <h2>Productos Destacados</h2>
                <div className="homeDestacadosGrid">
                    {destacados.map(producto => (
                        <CardProduct key={producto.id} {...producto} />
                    ))}
                </div>
            </section>

        </>
    )
}

