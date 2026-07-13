
import './Botones.css';
export const Botones = ({texto, onClick , icono , className , type})=>{
    return(
        <>
            <button className={`${"btn"} ${className || ''}`} onClick={onClick} type={type || 'button'}  >
                {texto}
                {icono && <ion-icon name={icono} className='styleIcon'></ion-icon>}
                
                </button>
        </>
    )
} 