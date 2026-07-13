import { Botones } from "../components/Botones";
import { useState } from "react";
import { Advertencias } from "../components/Advertencias";
import { db } from "../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import './Admin.css';
export const Admin = ({ }) => {
    //sobre descuento 
    const [tieneDescuento, setTieneDescuento] = useState(false);
    const [descuento, setDescuento] = useState(0);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        prec: "",
        stock: "",
        img: "",
        destacado: false,
        descuento: tieneDescuento ? descuento : 0,
        personalizable: false
    });
    //lectura de inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setNuevoProducto({
            ...nuevoProducto,
            [name]: type === "checkbox" ? checked : value
        });
    };
    //errores
    const [errores, setErrores] = useState({})

    const validar = () => {
        let nuevosErrores = {}

        if (!nuevoProducto.nombre) nuevosErrores.nombre = true
        if (!nuevoProducto.prec) nuevosErrores.prec = true
        if (!nuevoProducto.stock) nuevosErrores.stock = true
        if (!nuevoProducto.descripcion) nuevosErrores.descripcion = true

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0;
    }
    //evento submit
    const [mostrarAdv, setMostrarAdv] = useState(false);
    const [exito, setExito] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validar()) {
            setMostrarAdv(true)
            setTimeout(() => setMostrarAdv(false), 2000)
            return
        } try {
            await addDoc(collection(db, 'productos'), {
                ...nuevoProducto,
                prec: Number(nuevoProducto.prec),
                stock: Number(nuevoProducto.stock),
                descuento: tieneDescuento ? descuento : 0
            })

            // limpiar el form después de agregar
            setNuevoProducto({
                nombre: "",
                descripcion: "",
                prec: "",
                stock: "",
                img: "",
                destacado: false,
                descuento: 0,
                personalizable: false
            })
            setTieneDescuento(false)
            setDescuento(0)

            // mostrar éxito
            setExito(true)
            setTimeout(() => setExito(false), 2000)

        } catch (error) {
            console.error('Error:', error)
        }
    }


    return (
        <>
            {mostrarAdv && <Advertencias texto="Complete todos los campos!" icon="alert-circle-outline" />}
            {exito && <Advertencias texto="¡Producto agregado correctamente!" icon="checkmark-circle-outline" />}
            <section className="agregarProductos">
                <div className="addProductosContainer">
                    <div className="iconoProductosContainer">
                        <ion-icon name="cube-outline" className='iconoProductos'></ion-icon>
                    </div>
                    <form action="" onSubmit={handleSubmit} className="addProductosForm">
                        <div className="addProductosFormName">
                            <div className="addProductosNameLabel">
                                <label htmlFor="">Nombre del producto:</label>
                            </div>
                            <div className="addProductosNameInput">
                                <input type="text"
                                    name="nombre"
                                    value={nuevoProducto.nombre}
                                    onChange={handleChange}
                                    className={errores.nombre ? 'inputError' : ''} />
                            </div>
                        </div>
                        <div className="addPorductosFormPrec">
                            <div className="addProductosPrecLabel">
                                <label htmlFor="">Precio: </label>
                            </div>
                            <div className="addProductosPrecInput">
                                <input type="text"
                                    name="prec"
                                    inputMode="decimal"
                                    value={nuevoProducto.prec}
                                    onChange={handleChange}
                                    className={errores.nombre ? 'inputError' : ''} />
                            </div>
                        </div>
                        <div className="addProductosFormDesc">
                            <div className="addProductosDescLabel">
                                <label htmlFor="">Descripcion: </label>
                            </div>
                            <div className="addProductosDescInput">
                                <textarea type="text"
                                    name="descripcion"
                                    value={nuevoProducto.descripcion}
                                    onChange={handleChange}
                                    className={errores.nombre ? 'inputError' : ''}
                                ></textarea>
                            </div>
                        </div>
                        <div className="addProductosFormCheck">
                            <div className="addProductosFormStock">
                                <div className="addProductosStockLabel">
                                    <label htmlFor="" className="stockLabel">Stock: </label>
                                </div>
                                <div className="addProductosStockInput">
                                    <input type="text"
                                        name="stock"
                                        inputMode="numeric"
                                        value={nuevoProducto.stock}
                                        onChange={handleChange}
                                        className={errores.nombre ? 'inputError' : ''} />
                                </div>
                            </div>
                            <div className="addProductosFormPerso">
                                <div className="addProductosPersoLabel">
                                    <label htmlFor="">¿Es personalizable? </label>
                                </div>
                                <div className="addProductosPersoInput">
                                    <input type="checkbox"
                                        name="personalizable"
                                        checked={nuevoProducto.personalizable}
                                        onChange={handleChange}
                                        className={errores.nombre ? 'inputError' : ''} />
                                </div>
                            </div>
                            <div className="addProductosFormDescuento">
                                <div className="addProductosDescuentoLabel">
                                    <label htmlFor="">Descuento:</label>
                                </div>
                                <div className="addProductosDescuentoInput">
                                    <input type="checkbox"
                                        checked={tieneDescuento}
                                        className={errores.nombre ? 'inputError' : ''}
                                        onChange={(e) => {
                                            setTieneDescuento(e.target.checked);

                                            if (!e.target.checked) {
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="addProductosFormDestacado">
                                <div className="addProductosDestacadoLabel">
                                    <label htmlFor="">¿Producto destacado?</label>
                                </div>
                                <div className="addProductosDestacadoInput">
                                    <input type="checkbox"
                                        name="destacado"
                                        checked={nuevoProducto.destacado}
                                        onChange={handleChange}
                                        className={errores.nombre ? 'inputError' : ''} />
                                </div>
                            </div>
                        </div>
                        {
                            tieneDescuento && (
                                <div>
                                    <label>Porcentaje de descuento</label>
                                    <input
                                        type="number"
                                        value={descuento}
                                        onChange={(e) => setDescuento(Number(e.target.value))}
                                        min="0"
                                        max="100"
                                        placeholder="Ej: 15"
                                    />
                                </div>
                            )
                        }
                        <div className="addProductosFormImg">
                            <div className="addProductosImgLabel">
                                <label htmlFor="">Imagen:</label>
                            </div>
                            <div className="addProductosImgInput">
                                <input type="text" name="img" className={errores.nombre ? 'inputError' : ''} />
                            </div>
                        </div>
                        <div className="addProductosFormBtn">
                            <Botones icono="add-outline" texto="Agregar Producto" className="btnAddProducto" type='submit'></Botones>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}