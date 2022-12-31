import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import { auth } from '../firebase/config'
import { useFirestore } from './useFirestore'

// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const { addDocument } = useFirestore("users")

  const signup = async (email, password) => {
    setError(null)
    setIsPending(true)

    const displayName = email.split("@")[0]

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {

        // Signed in
        updateProfile(userCredentials.user, { displayName })

        addDocument({
        displayName,
        notifications: []
      }, userCredentials.user.uid)

      dispatch({ type: "LOGIN", payload: userCredentials.user })
      })
      .catch((error) => {
        setError(error.message)
        console.log(error)
      })

      if (!isCancelled) {
          setIsPending(false)
          setError(null)
      }
  }

  useEffect(() => {
      return () => setIsCancelled(true)
  }, [])

  return { error, isPending, signup }
}
