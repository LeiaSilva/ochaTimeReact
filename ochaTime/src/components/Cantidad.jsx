
import style from './Cantidad.module.css';
export const Cantidad = ({ cantidad, onRestar, onSumar }) => {

    return (
        <>
            <div className={style.cantidad}>
                <button onClick={onRestar}>-</button>
                <span className={style.cant}>{cantidad}</span>
                <button onClick={onSumar}>+</button>
            </div>
        </>
    )
}