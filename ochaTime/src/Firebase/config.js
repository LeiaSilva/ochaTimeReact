// src/firebase/config.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBhf54andtrrSdNgZ1qaPGcLg-DndhHI7M",
    authDomain: "ocha-time.firebaseapp.com",
    projectId: "ocha-time",
    storageBucket: "ocha-time.firebasestorage.app",
    messagingSenderId: "246105310802",
    appId: "1:246105310802:web:da516d92524772f5c2818b",
    measurementId: "G-T9FXF8Q5P0"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)