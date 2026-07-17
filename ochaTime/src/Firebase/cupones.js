import { db } from "./config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

const cuponesRef = collection(db, "cupones");

export const getCupones = () => getDocs(cuponesRef);

export const addCupon = (nuevoCupon) =>
    addDoc(cuponesRef, nuevoCupon);

export const updateCupon = (id, datos) =>
    updateDoc(doc(db, "cupones", id), datos);

export const deleteCupon = (id) =>
    deleteDoc(doc(db, "cupones", id));