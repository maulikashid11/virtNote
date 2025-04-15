import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteContext } from '../contexts/NoteContext'

const Signup = () => {

  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { authToken, setAuthToken, toast, dark } = useContext(NoteContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('authToken'))) {
      navigate('/profile')
    }
  }, [])
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password } = details
    fetch('https://virtnote.onrender.com/user/signup', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    }).then((res) => res.json())
      .then((data) => {
        const { success, message, token } = data
        setAuthToken(token)
        localStorage.setItem('authToken', JSON.stringify(token))
        if (success === true) {
          toast.success(message)
        }
        navigate('/profile')
      })
  }

  return (
    <div className={` min-h-screen pt-10 ${dark ? 'bg-zinc-800 text-white' : ''}`}>
      <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md`}>
        <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
        <label className='block text-lg mt-5' htmlFor="name">Name:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.name} name='name' minLength={5} className='border w-full mt-1 rounded-md p-2' type="text" id='name' />
        <label className='block text-lg mt-5' htmlFor="email">Email:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.email} name='email' minLength={5} className='border w-full mt-1 rounded-md p-2' type="email" id='email' />
        <label className='block text-lg mt-5' htmlFor="password">Password:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.password} name='password' minLength={5} className='border w-full mt-1 rounded-md p-2' type="password" id='password' />
        <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Create Account</button>
        <p className='mt-3'>Already have account ? <Link className='text-blue-500 ' to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup