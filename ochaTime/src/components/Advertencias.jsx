
import style from './Advertencias.module.css';

export const Advertencias = ({icon  , texto}) =>{

    return(
        <>
            <div className={style.advertencia}>
                <div className={style.containerIcon}>
                    {icon && <ion-icon name={icon} className={style.styleIcon}></ion-icon>}
                </div>
                <div className={style.containerTexto}>
                    <p className={style.advNom}>{texto}</p>
                </div>
            </div>
        </>
    )
}