import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config"

// firebase imports
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case "IS_PENDING":
            return { isPending: true, document: null, success: false, error: null }
        case "ADDED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "DELETED_DOCUMENT":
            return { isPending:false, document: null, success: true, error: null }
        case "UPDATED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "ERROR":
            return { isPending: false, document: null, error: action.payload, success: false }
        default:
            return state
    }
}

export const useFirestore = (c) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (document, id) => {
        dispatch ({ type: "IS_PENDING" })

        try {
            const addedDocument = await setDoc(doc(db, c, id), document)
            dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }
    }

    // update document
    const updateDocument = async (id, updates) => {
        dispatch ({ type: "IS_PENDING" })

        try {
            const updatedDocument = await updateDoc(doc(db, c, id), updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
            return updatedDocument
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
            return null
        }
    }

    // delete document
    const deleteDocument = async (id) => {
        dispatch ({ type: "IS_PENDING" })
        const docRef = doc(db, c, id)

        try {
            await  deleteDoc(docRef)
            dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }
    }

    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, updateDocument, deleteDocument, response }
}