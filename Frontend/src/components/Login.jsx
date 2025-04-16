import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteContext } from '../contexts/NoteContext'

const Login = () => {

  const [details, setDetails] = useState({
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
    const { email, password } = details
    try {
      fetch('https://virt-note-server.vercel.app/user/login', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
      }).then((res) => res.json())
        .then((data) => {
          const { success, message, token } = data
          if (success === true) {
            if (token) {
              setAuthToken(token)
              localStorage.setItem('authToken', JSON.stringify(token))
              toast.success(message)
              navigate('/profile')
            }
          } else {
            setDetails({
              email: '',
              password: '',
            })
            toast.error(message)
          }
        })
    } catch (err) {

    }

  }
  return (
    <div className={` min-h-screen pt-10 ${dark ? 'bg-zinc-800 text-white' : ''}`}>
      <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md `}>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <label className='block text-lg mt-5' htmlFor="email">Email:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.email} name='email' minLength={6} className='border w-full mt-1  rounded-md p-2' type="email" id='email' />
        <label className='block text-lg mt-5' htmlFor="password">Password:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.password} name='password' minLength={5} className='border w-full mt-1  rounded-md p-2' type="password" id='password' />
        <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Login</button>
        <p className='mt-3'>Don't Have Account ? <Link className='text-blue-500 ' to="/signup">Create Account</Link></p>
      </form>
    </div>
  )
}

export default Login