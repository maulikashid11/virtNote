import React, { useContext } from 'react'
import { NoteContext } from '../contexts/NoteContext'

const About = () => {
  const { dark } = useContext(NoteContext)

  return (
    <div className={` min-h-screen pt-10 ${dark ? 'bg-zinc-800 text-white' : ''}`}>About</div>
  )
}

export default About