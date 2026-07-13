import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./BannerSlider.css";
import { Botones } from "./Botones";
export const BannerSlider = ({ }) => {
    const [actual, setActual] = useState(0);
    const banners = [
        {
            titulo: "Nuevos productos",
            texto: "Descubrí nuestra colección.",
            imagen: "/banner1.png",
            boton: true
        },
        {
            titulo: "Ofertas especiales",
            texto: "Aprovechá nuestras ofertas de toda la web.",
            imagen: "/banner2.png",
            boton: false
        },
        {
            titulo: "Personalizá tus Cookie Box",
            texto: "Elegí colores, mensajes y detalles únicos.",
            imagen: "/cookieBox.png",
            boton: false
        }
    ];
    //transicion
    const [fade, setFade] = useState(true);
    useEffect(() => {

        const intervalo = setInterval(() => {

            setFade(false);

            setTimeout(() => {

                setActual(prev =>
                    (prev + 1) % banners.length
                );

                setFade(true);

            }, 400);

        }, 4000);

        return () => clearInterval(intervalo);

    }, []);



    return (
        <>
            <section className="banner">

                <img
                    src={banners[actual].imagen}
                    alt={banners[actual].titulo}
                />

                <div className={`bannerContenido ${fade ? "fadeIn" : "fadeOut"}`}>
                    <h2>{banners[actual].titulo}</h2>
                    <p>{banners[actual].texto}</p>

                    {banners[actual].boton && (
                        <Link to="/productos">
                            <Botones
                                texto="Elegí tu box"
                                className="btnBanner"
                            />
                        </Link>
                    )}
                </div>

            </section>
        </>
    )
}