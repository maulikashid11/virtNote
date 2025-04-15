import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteContext } from '../contexts/NoteContext'

const Navbar = () => {
  const { authToken, setAuthToken, dark, setDark } = useContext(NoteContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (authToken) {
      navigate('/profile')
    }
  }, [])
  const toggleTheme = () => {
    if (dark === true) {
      setDark(false)
      localStorage.setItem('theme', JSON.stringify(false))
    } else {
      setDark(true)
      localStorage.setItem('theme', JSON.stringify(true))
    }
  }
  return (
    <nav className={`p-5 flex items-center justify-between ${dark ? 'bg-zinc-800 text-white' : ''}`}>
      <h1 className={`${dark ? 'text-white' : 'text-gray-800'} text-xl`}>virtNote</h1>
      {
        !authToken ? (
          <ul className='flex gap-10'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        ) : ''
      }
      <ul className='flex gap-5'>
        <button onClick={(e) => { toggleTheme() }} className='font-bold cursor-pointer'>Dark</button>
        {
          !authToken ?
            <li><Link className='bg-blue-500 rounded-md text-white p-2 cursor-pointer' to="/login">Sign In</Link></li>
            :
            <li><button onClick={(e) => { setAuthToken(''); localStorage.setItem('authToken', JSON.stringify('')) }} className='bg-blue-500 rounded-md text-white p-2 cursor-pointer'>Logout</button></li>
        }
      </ul>
    </nav>
  )
}

export default Navbar