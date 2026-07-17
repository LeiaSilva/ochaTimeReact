import { db } from "./config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";

const cuponesRef = collection(db, "cupones");

export const getCupones = () => getDocs(cuponesRef);

export const addCupon = (nuevoCupon) =>
    addDoc(cuponesRef, nuevoCupon);

export const updateCupon = (id, datos) =>
    updateDoc(doc(db, "cupones", id), datos);

export const deleteCupon = (id) =>
    deleteDoc(doc(db, "cupones", id));
export const buscarCupon = async (codigo) => {

    const querySnapshot = await getDocs(cuponesRef);

    const cupon = querySnapshot.docs.find(doc =>
        doc.data().codigo.trim().toLowerCase() === codigo.trim().toLowerCase()
    );

    if (!cupon) {
        return null;
    }

    return {
        id: cupon.id,
        ...cupon.data()
    };

}