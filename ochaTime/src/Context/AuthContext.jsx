import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword , GoogleAuthProvider,
    signInWithPopup } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user)
            setCargando(false)
        })
        return () => unsuscribe()
    }, [])

    // login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        return signOut(auth)
    }
    //registrar
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //con google
    const loginGoogle = () => {

    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);

}

    return (
        <AuthContext.Provider value={{ usuario, login, logout, cargando , register  , loginGoogle}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
