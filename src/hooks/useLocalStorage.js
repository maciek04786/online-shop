import { useEffect, useState, useCallback } from 'react'

export const useLocalStorage = (key) => {
    const [data, setData] = useState([])

    const fetchData = useCallback(() => {
        const ref = JSON.parse(localStorage.getItem(key))
        if (ref !== null) {
            setData(ref)
        }
    }, [key])

    const addItem = (newItem) => {
        let newData = []
        
        if (data.length > 0) {
            newData = [ ...data, newItem ]
        } else {
            newData.push(newItem)
        }
        setData(newData)
        localStorage.setItem(key, JSON.stringify(newData))
    }

    // fetch single item
    const getItem = (id) => {
        let wantedItem
        data.forEach(item => {
            if (item.id === id) {
                wantedItem = item
            }
        })
        return wantedItem
    }

    // remove single item
    const deleteItem = (id) => {
        const newData = data.filter(item => item.id !== id)
        setData(newData)
        localStorage.setItem(key, JSON.stringify(newData))
    }

    // delete all
    const clearData = () => {
        setData([])
        localStorage.setItem(key, JSON.stringify([]))
    }

    // fetch data from local storage
    useEffect(() => {
        fetchData()
    }, [fetchData])
  
    return { data, addItem, getItem, deleteItem, clearData }
}
