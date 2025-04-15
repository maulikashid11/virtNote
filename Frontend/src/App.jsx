import React, { useContext, useState } from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import 'react-toastify/dist/ReactToastify.css'
import { NoteContext } from './contexts/NoteContext'


function App() {
  const { ToastContainer, dark } = useContext(NoteContext)
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
