import './SobreNosotros.css'
import { Botones } from '../components/Botones';
import { Link } from 'react-router-dom';
export const SobreNosotros = () => {

    return (
        <>
            <section className="sobreNosotros">

                <div className="sobreNosotrosImg">
                    <img src="/niña-ochaTime.png" alt="Cookie Box" />
                </div>

                <div className="sobreNosotrosInfo">

                    <h2>Sobre Ocha Time</h2>

                    <p>
                        En Ocha Time creemos que los pequeños detalles hacen grandes
                        momentos. Creamos Cookie Boxes artesanales pensadas para regalar,
                        compartir o simplemente disfrutar con una buena taza de té o café.
                    </p>

                    <p>
                        Cada box está preparada con ingredientes de calidad, mucho cariño
                        y la posibilidad de personalizarla para hacer cada regalo único y
                        especial.
                    </p>
                        <Link to={`/Shop`} className='linkBtnSobreNosotros'>
                            <Botones
                                texto="Ver Tienda"
                                className="btnSobreNosotros"
                            />
                        </Link>




                </div>

            </section>
        </>
    )
}