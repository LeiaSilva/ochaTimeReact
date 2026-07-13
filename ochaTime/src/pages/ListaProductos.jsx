import { useState, useEffect } from 'react'
import { db } from '../Firebase/config'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'Firebase/firestore'
import { Botones } from '../components/Botones';
import { Advertencias } from '../components/Advertencias';
import './ListaProductos.css';

export const ListaProductos = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    // traer productos de Firestore
    useEffect(() => {
        const fetchProductos = async () => {
            const querySnapshot = await getDocs(collection(db, 'productos'))
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProductos(lista)
            setCargando(false)
        }
        fetchProductos()
    }, [])

    // eliminar producto
    const eliminar = async (id) => {
        await deleteDoc(doc(db, 'productos', id))
        setProductos(productos.filter(p => p.id !== id))
    }
    //editar
    const [modalEditar, setModalEditar] = useState(false)
    const [productoEditando, setProductoEditando] = useState(null)
    const [errorEditar, setErrorEditar] = useState('')
    const [exitoEditar, setExitoEditar] = useState(false)
    const handleGuardar = async (e) => {
        e.preventDefault()
        try {
            await updateDoc(doc(db, 'productos', productoEditando.id), {
                nombre: productoEditando.nombre,
                prec: productoEditando.prec,
                stock: productoEditando.stock,
                descuento: productoEditando.descuento,
                destacado: productoEditando.destacado,
                img: productoEditando.img
            })

            // actualizar la lista sin recargar
            setProductos(productos.map(p =>
                p.id === productoEditando.id ? productoEditando : p
            ))

            // éxito
            setExitoEditar(true)
            setTimeout(() => {
                setExitoEditar(false)
                setModalEditar(false)
                setProductoEditando(null)
            }, 1500)

        } catch (error) {
            setErrorEditar('Error al guardar los cambios')
            setTimeout(() => setErrorEditar(''), 2000)
        }
    }

    if (cargando) return <p>Cargando productos...</p>

    return (
        <>
            <section className='misProductos'>
                <div className="misProductosListaContainer">
                    <div className="listaProductosTitulos">
                        <div className="listaProductosTitulosImg">
                            <p>Imagen</p>
                        </div>
                        <div className="listaProductosTitulosNombre">
                            <p>Nombre</p>
                        </div>
                        <div className="listaProductosTitulosPrec">
                            <p>Precio</p>
                        </div>
                        <div className="listaProductosTitulosDescuento">
                            <p>Descuento</p>
                        </div>
                        <div className="listaProductosTitulosStock">
                            <p>Stock</p>
                        </div>
                        <div className="listaProductosTitulosDestacado">
                            <p>Destacado</p>
                        </div>
                        <div className="listaProductosTitulosAccion"></div>
                    </div>
                    {productos.map(producto => (
                        <div key={producto.id} className="listaProductoItem">
                            <div className="listaImg">
                                <img src={producto.img} alt="" />
                            </div>
                            <div className="listaNombre">
                                <p>{producto.nombre}</p>
                            </div>
                            <div className="listaPrec">
                                <p>${producto.prec}</p>
                            </div>
                            <div className="listaDescuento">
                                {producto.descuento > 0
                                    ? <span className="badgeDescuento">-{producto.descuento}%</span>
                                    : <p>{producto.descuento}</p>
                                }
                            </div>
                            <div className="listaStock">
                                <p>{producto.stock}</p>
                            </div>
                            <div className="listaDestacado">
                                {producto.destacado
                                    ? <ion-icon name="star" class="destacadoSi"></ion-icon>
                                    : <ion-icon name="star-outline" class="destacadoNo"></ion-icon>
                                }
                            </div>
                            <div className="listaBtns">
                                <div className="listaBtnsEliminar">
                                    <Botones
                                        icono="trash-outline"
                                        className='eliminarLista'
                                        onClick={() => eliminar(producto.id)} />
                                </div>
                                <div className="listaBtnsEditar">
                                    <Botones icono="create-outline"
                                        className='editarLista'
                                        onClick={() => {
                                            setProductoEditando(producto)
                                            setModalEditar(true)
                                        }}></Botones>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {modalEditar && productoEditando && (
                    <div className="modalOverlay">
                        <div className="modalEditar">
                            <div className="modalEditarHeader">
                                <h3>Editar Producto</h3>
                                <ion-icon
                                    name="close-outline"
                                    class="cerrarModal"
                                    onClick={() => setModalEditar(false)}
                                />
                            </div>
                            <form className="modalEditarForm" onSubmit={handleGuardar}>
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={productoEditando.nombre}
                                    onChange={(e) => setProductoEditando({ ...productoEditando, nombre: e.target.value })}
                                />

                                <label>Precio</label>
                                <input
                                    type="number"
                                    value={productoEditando.prec}
                                    onChange={(e) => setProductoEditando({ ...productoEditando, prec: Number(e.target.value) })}
                                />

                                <label>Stock</label>
                                <input
                                    type="number"
                                    value={productoEditando.stock}
                                    onChange={(e) => setProductoEditando({ ...productoEditando, stock: Number(e.target.value) })}
                                />

                                <label>Descuento %</label>
                                <input
                                    type="number"
                                    value={productoEditando.descuento}
                                    onChange={(e) => setProductoEditando({ ...productoEditando, descuento: Number(e.target.value) })}
                                    min="0"
                                    max="100"
                                />
                                <label>Imagen</label>
                                <input
                                    type="text"
                                    value={productoEditando.img}
                                    onChange={(e) => setProductoEditando({ ...productoEditando, img: e.target.value })}
                                />

                                <label className="checkLabel">
                                    ¿Producto destacado?
                                    <input
                                        type="checkbox"
                                        checked={productoEditando.destacado}
                                        onChange={(e) => setProductoEditando({ ...productoEditando, destacado: e.target.checked })}
                                    />
                                </label>

                                <Botones texto="Guardar" icono="save-outline" className='guardarCambiosBtn' type="submit" />
                            </form>
                            {exitoEditar && <Advertencias texto="¡Producto actualizado!" icon="checkmark-circle-outline" />}
                            {errorEditar && <Advertencias texto={errorEditar} icon="alert-circle-outline" />}
                        </div>
                    </div>
                )}
            </section>
        </>

    )
}