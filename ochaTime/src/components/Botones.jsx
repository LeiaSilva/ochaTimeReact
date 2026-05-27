
import './Botones.css';
export const Botones = ({texto, onClick , icono , className})=>{
    return(
        <>
            <button className={`${"btn"} ${className || ''}`} onClick={onClick}>
                {texto}
                {icono && <ion-icon name={icono} className='styleIcon'></ion-icon>}
                
                </button>
        </>
    )
} 