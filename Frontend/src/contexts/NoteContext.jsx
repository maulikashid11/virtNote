import { useState } from "react";
import { createContext } from "react";
import { ToastContainer, toast } from 'react-toastify'

export const NoteContext = createContext()

export function NoteProvider({ children }) {
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem('authToken')) || '')
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('theme')) || false)
    return (
        <NoteContext.Provider value={{ authToken, setAuthToken, ToastContainer, toast ,dark,setDark}}>
            {
                children
            }
        </NoteContext.Provider>
    )
}