import { Advertencias } from "../components/Advertencias";
import { Botones } from "../components/Botones";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { useEffect , useState} from "react";
import { db } from "../firebase/config";
import './GestionCupones.css';

export const GestionCupones = ({ }) => {

    const [cupones, setCupones] = useState([])
    const [cargando, setCargando] = useState(true)

    // traer cupones de Firestore
    useEffect(() => {
        const fetchCupones = async () => {
            const querySnapshot = await getDocs(collection(db, 'cupones'))
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setCupones(lista)
            setCargando(false)
        }
        fetchCupones()
    }, [])

    // eliminar cupón
    const eliminar = async (id) => {
        await deleteDoc(doc(db, 'cupones', id))
        setCupones(cupones.filter(p => p.id !== id))
    }

    // modal editar/agregar
    const [modalEditar, setModalEditar] = useState(false)
    const [cuponEditando, setCuponEditando] = useState(null)
    const [modoModal, setModoModal] = useState("editar")

    const [errorEditar, setErrorEditar] = useState('')
    const [exitoEditar, setExitoEditar] = useState(false)

    const handleGuardar = async (e) => {

        e.preventDefault()

        try {

            if (modoModal === "editar") {

                await updateDoc(doc(db, 'cupones', cuponEditando.id), {
                    codigo: cuponEditando.codigo,
                    descuento: cuponEditando.descuento,
                    activo: cuponEditando.activo
                })

                setCupones(cupones.map(p =>
                    p.id === cuponEditando.id ? cuponEditando : p
                ))

            } else {

                const docRef = await addDoc(collection(db, 'cupones'), {
                    codigo: cuponEditando.codigo,
                    descuento: cuponEditando.descuento,
                    activo: cuponEditando.activo
                })

                setCupones([
                    ...cupones,
                    {
                        id: docRef.id,
                        ...cuponEditando
                    }
                ])

            }

            setExitoEditar(true)

            setTimeout(() => {

                setExitoEditar(false)
                setModalEditar(false)
                setCuponEditando(null)

            }, 1500)

        } catch (error) {

            setErrorEditar('Error al guardar los cambios')

            setTimeout(() => setErrorEditar(''), 2000)

        }
    }

    if (cargando) return <p>Cargando cupones...</p>

    return (
        <>
            <section className='misProductos'>

                <div className="misCuponesAdd">

                    <Botones
                        icono="add-outline"
                        texto="Agregar cupon"
                        className='agregarCupon'
                        onClick={() => {

                            setModoModal("agregar")

                            setCuponEditando({
                                codigo: "",
                                descuento: 0,
                                activo: true
                            })

                            setModalEditar(true)

                        }}
                    ></Botones>

                </div>

                <div className="misProductosListaContainer">

                    <div className="listaProductosTitulos">

                        <div className="listaProductosTitulosImg">
                            <p>Código</p>
                        </div>

                        <div className="listaProductosTitulosNombre">
                            <p>Descuento</p>
                        </div>

                        <div className="listaProductosTitulosPrec">
                            <p>Activo</p>
                        </div>

                    </div>

                    {cupones.map(cupon => (

                        <div key={cupon.id} className="listaProductoItem">

                            <div className="listaNombre">
                                <p>{cupon.codigo}</p>
                            </div>

                            <div className="listaPrec">
                                <p>{cupon.descuento}%</p>
                            </div>

                            <div className="listaDestacado">

                                {cupon.activo
                                    ? <ion-icon name="checkmark-outline" class="activoSi"></ion-icon>
                                    : <ion-icon name="close-outline" class="activoNo"></ion-icon>
                                }

                            </div>

                            <div className="listaBtns">

                                <div className="listaBtnsEliminar">

                                    <Botones
                                        icono="trash-outline"
                                        className='eliminarLista'
                                        onClick={() => eliminar(cupon.id)}
                                    />

                                </div>

                                <div className="listaBtnsEditar">

                                    <Botones
                                        icono="create-outline"
                                        className='editarLista'
                                        onClick={() => {

                                            setModoModal("editar")
                                            setCuponEditando(cupon)
                                            setModalEditar(true)

                                        }}
                                    ></Botones>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {modalEditar && cuponEditando && (

                    <div className="modalOverlay">

                        <div className="modalEditar">

                            <div className="modalEditarHeader">

                                <h3>
                                    {modoModal === "editar"
                                        ? "Editar cupón"
                                        : "Agregar cupón"}
                                </h3>

                                <ion-icon
                                    name="close-outline"
                                    class="cerrarModal"
                                    onClick={() => setModalEditar(false)}
                                />

                            </div>

                            <form className="modalEditarForm" onSubmit={handleGuardar}>

                                <label>Codigo</label>

                                <input
                                    type="text"
                                    value={cuponEditando.codigo}
                                    onChange={(e) => setCuponEditando({
                                        ...cuponEditando,
                                        codigo: e.target.value
                                    })}
                                />

                                <label>Descuento</label>

                                <input
                                    type="number"
                                    value={cuponEditando.descuento}
                                    onChange={(e) => setCuponEditando({
                                        ...cuponEditando,
                                        descuento: Number(e.target.value)
                                    })}
                                />

                                <label className="checkLabel">
                                    ¿Cupon activo?

                                    <input
                                        type="checkbox"
                                        checked={cuponEditando.activo}
                                        onChange={(e) => setCuponEditando({
                                            ...cuponEditando,
                                            activo: e.target.checked
                                        })}
                                    />

                                </label>

                                <Botones
                                    texto={
                                        modoModal === "editar"
                                            ? "Guardar cambios"
                                            : "Agregar cupón"
                                    }
                                    icono={
                                        modoModal === "editar"
                                            ? "save-outline"
                                            : "add-outline"
                                    }
                                    className='guardarCambiosBtn'
                                    type="submit"
                                />

                            </form>

                            {exitoEditar && (
                                <Advertencias
                                    texto={
                                        modoModal === "editar"
                                            ? "¡Cupon actualizado!"
                                            : "¡Cupon agregado!"
                                    }
                                    icon="checkmark-circle-outline"
                                />
                            )}

                            {errorEditar && (
                                <Advertencias
                                    texto={errorEditar}
                                    icon="alert-circle-outline"
                                />
                            )}

                        </div>

                    </div>

                )}

            </section>
        </>
    )
}