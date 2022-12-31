import { useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

// firebase imports
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending]= useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // Signed in 
            const user = userCredential.user;
            dispatch({ type: "LOGIN", payload: user })
        })
        .catch((err) => {
            console.log(err)
            setError(err.message)
            setIsPending(false)
        })
    }

    return { login, error, isPending }
}