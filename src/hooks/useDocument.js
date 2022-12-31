import { useEffect, useState } from "react"
import { db } from "../firebase/config"

// firebase imports
import { doc, onSnapshot  } from "firebase/firestore"

export const useDocument = (c, id) => {
    const [document, setDocument] = useState(null)
    const [docError, setDocError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const unsub = onSnapshot(doc(db, c, id), (doc) => {
            if (doc.data()) {
                setDocument(doc.data())
            setDocError(null)
            } else {
                setDocError("This document doesn't exist")
            }
        }, (err) => {
            console.log(err)
            setDocError("Failed to fetch the document")
        })

        return () => unsub()

    }, [c, id])

    return { document, docError }
}