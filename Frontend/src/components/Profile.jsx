import React, { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../contexts/NoteContext'
import { Dialog } from '@headlessui/react'
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [details, setDetails] = useState({
    title: '',
    description: '',
  })
  const [isOpen, setIsOpen] = useState(false)

  const [userNotes, setUserNotes] = useState([])
  const [profileUser, setProfileUser] = useState({})
  const [editNoteDetails, setEditNoteDetails] = useState({ title: '', description: '', editNoteId: '' })
  const { authToken, setAuthToken, ToastContainer, toast, dark, } = useContext(NoteContext)
  const navigate = useNavigate()

  if (!authToken) {
    navigate('/login')
  }
  useEffect(() => {
    fetchAllNotes()
  }, [])

  function fetchAllNotes() {
    fetch('http://localhost:3000/note/fetchallnotes', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "token": authToken
      },
    }).then(res => res.json())
      .then((data) => {
        setUserNotes(data.notes)
        setProfileUser(data.user)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, description } = details
    fetch('http://localhost:3000/note/addnote', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "token": authToken
      },
      body: JSON.stringify({ title, description })
    }).then((res) => res.json())
      .then((data) => {
        const { success, message, newNote } = data
        fetchAllNotes()
        if (success === true) {
          toast.success(message)
        }
        setDetails({
          title: '',
          description: '',
        })
      })
  }
  const deleteNote = (id) => {
    fetch('http://localhost:3000/note/deletenote', {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "token": authToken
      },
      body: JSON.stringify({ deleteNoteId: id })
    }).then((res) => res.json())
      .then((data) => {
        const { success, message } = data
        fetchAllNotes()
        if (success === true) {
          toast.success(message)
        }
      })
  }
  const editNote = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/note/editnote', {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "token": authToken
      },
      body: JSON.stringify(editNoteDetails)
    }).then((res) => res.json())
      .then((data) => {
        const { success, message } = data
        setEditNoteDetails({ title: '', description: '', editNoteId: '' })
        setIsOpen(false)
        fetchAllNotes()
        if (success === true) {
          toast.success(message)
        }
      })
  }
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  return (
    <main className={`p-5 min-h-screen ${dark ? 'bg-zinc-800 text-white' : ''}`}>
      <h1 className='text-3xl'>Hello, <span className='font-bold'>{profileUser ? profileUser.name : ''}</span></h1>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-sm w-full">
            <form onSubmit={(e) => editNote(e)} className='p-5 px-10 border mt-5 rounded-md'>
              <h1 className='text-center text-3xl font-bold'>Update Note</h1>
              <label className='block text-lg mt-2' htmlFor="title">Title:</label>
              <input onChange={(e) => { setEditNoteDetails({ ...editNoteDetails, title: e.target.value }) }} value={editNoteDetails.title} name='title' minLength={5} className='border w-full mt-1 bg-gray-100 rounded-md p-1' type="text" id='title' />
              <label className='block text-lg mt-2' htmlFor="description">Description:</label>
              <input onChange={(e) => { setEditNoteDetails({ ...editNoteDetails, description: e.target.value }) }} value={editNoteDetails.description} name='description' minLength={5} className='border w-full mt-1 bg-gray-100 rounded-md p-1' type="description" id='description' />
              <button className='bg-blue-500 text-white font-bold block cursor-pointer p-2 rounded-md mt-5 '>Update note</button>
            </form>
            <button onClick={() => { setIsOpen(false); setEditNoteDetails({ title: '', description: '', editNoteId: '' }) }} className="mt-4 text-blue-500">Close</button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <form onSubmit={(e) => handleSubmit(e)} className='p-5 px-10 border md:w-[40%] mt-5 rounded-md'>
        <h1 className='text-center text-3xl font-bold'>Add Note</h1>
        <label className='block text-lg mt-2' htmlFor="title">Title:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.title} name='title' minLength={5} className='border w-full mt-1  rounded-md p-1' type="text" id='title' />
        <label className='block text-lg mt-2' htmlFor="description">Description:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.description} name='description' minLength={5} className='border w-full mt-1 rounded-md p-1' type="description" id='description' />
        <button className='bg-blue-500 text-white font-bold block p-2 cursor-pointer rounded-md mt-5 '>Add note</button>
      </form>
      <div>
        <h1 className='text-2xl mt-4 '>Your Notes</h1>
        <div className='flex flex-wrap mt-4 gap-3'>
          {
            userNotes.length > 0 ?
              userNotes.map((note) =>
                <div key={note._id} className="note border rounded border-gray-500 p-2 w-[200px] h-[200px]">
                  <h1 className="title">{note.title}</h1>
                  <p className="description">{note.description}</p>
                  <button onClick={() => { setIsOpen(true); setEditNoteDetails({ editNoteId: note._id, title: note.title, description: note.description }) }} className='text-2xl cursor-pointer m-2'><FaEdit /></button>
                  <button onClick={(e) => deleteNote(note._id)} className='text-2xl cursor-pointer m-2'><MdDelete /></button>
                </div>) : <h1>No notes</h1>
          }
        </div>
      </div>
    </main>
  )
}

export default Profile