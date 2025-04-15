import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NoteContext } from '../contexts/NoteContext'

const Home = () => {
  const { dark } = useContext(NoteContext)

  return (
    <div className={` min-h-screen pt-10 ${dark ? 'bg-zinc-800 text-white' : ''}`}>

      <div className={`p-3 w-[70%]`}>
        <h1 className='text-4xl mt-5'>Your virtual notes on the cloud.</h1>
        <p className='text-lg mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum vero assumenda numquam rem quae laborum esse optio minima similique asperiores ipsa, architecto eaque? Sint, ipsa. Blanditiis dolorum, autem et voluptate, quas ullam error facilis quo veritatis suscipit atque laudantium?</p>
        <p className='text-lg mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum vero assumenda numquam rem quae laborum esse optio minima similique asperiores ipsa, architecto eaque? Sint, ipsa. Blanditiis dolorum, autem et voluptate, quas ullam error facilis quo veritatis suscipit atque laudantium?</p>
        <p className='text-lg mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum vero assumenda numquam rem quae laborum esse optio minima similique asperiores ipsa, architecto eaque? Sint, ipsa. Blanditiis dolorum, autem et voluptate, quas ullam error facilis quo veritatis suscipit atque laudantium?</p>
        <Link className='inline-block mt-3 w-20 text-center bg-blue-500 rounded-md text-white p-2' to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Home