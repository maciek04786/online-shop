import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

// firebase imports
import { signOut } from "firebase/auth"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState()
    const [isPending, setIsPending]= useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        try {

            await signOut(auth)

            // dispatch logout action
            dispatch({ type: "LOGOUT" })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }

        catch(err) {
            if (!isCancelled) {
                console.log(err)
                setError(err.message)
                setIsPending(false)
            }
        }
        console.log(isPending)
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}