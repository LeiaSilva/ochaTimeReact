import { db } from '../Firebase/config'
import { collection, getDocs } from 'Firebase/firestore'
import { CardProduct } from '../components/CardProduct'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { BannerSlider } from '../components/BannerSlider'
import { Advertencias } from '../components/Advertencias';
import './Home.css';
import { Botones } from '../components/Botones';
export const Home = () => {

    const [destacados, setDestacados] = useState([])
    const location = useLocation();
    const [indice, setIndice] = useState(0);
    const [mensaje, setMensaje] = useState(location.state?.mensaje || "");
    useEffect(() => {

        if (mensaje) {

            setTimeout(() => {
                setMensaje("");
            }, 3000);

        }

    }, [mensaje]);

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
    const siguienteProducto = () => {

        if (indice < destacados.length - 1) {

            setIndice(indice + 1);

        }

    };


    const anteriorProducto = () => {

        if (indice > 0) {

            setIndice(indice - 1);

        }

    };
    return (
        <>
            {/* SLIDER*/}
            <BannerSlider></BannerSlider>
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
                    <div className="btnSlidersContainer">
                        <Botones icono="chevron-back-outline" className="btnsSlide" onClick={anteriorProducto}></Botones>
                    </div>
                    <div className="homeProductosDestacados">
                        {
                            destacados
                                .slice(indice, indice + 3)
                                .map(producto => (

                                    <CardProduct
                                        key={producto.id}
                                        producto={producto}
                                    />

                                ))
                        }
                    </div>

                    <div className="btnSlidersContainer">
                        <Botones icono="chevron-forward-outline" className="btnsSlide" onClick={siguienteProducto}></Botones>
                    </div>
                </div>
                {mensaje && (
                    <Advertencias
                        icon="checkmark-circle-outline"
                        texto={mensaje}
                    />
                )}
            </section>

        </>
    )
}

