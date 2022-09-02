import { googleAuthProvider, auth }  from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return signInWithPopup(auth, googleAuthProvider)
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        signOut(auth)
    }
}