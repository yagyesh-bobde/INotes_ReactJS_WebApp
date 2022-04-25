import NoteItem from "./NoteItem";
import React, { useContext,useEffect,useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from "./AddNote";

export default function Notes() {
    // Using the notes context
    const context = useContext(noteContext);
    // Destructuring the notes context
    const { notes, getData , editNote } = context;

    // A edit note
    const [note, setNote] = useState({id : '' , title: '' , description: '' , tag:''})
    
    // Load the notes on mount
    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id , note.title, note.description, note.tag)
        refClose.current.click()
    } 


    const updateNote = (Mainnote) => {
        refModal.current.click()
        setNote({id:Mainnote._id , title : Mainnote.title , description: Mainnote.description, tag: Mainnote.tag })
    }

// Refs 
    const refModal = useRef(null)
    const refClose = useRef(null)

  return (
      <>      {/* FORUM TO CREATE A NEW NOTE */}
      <AddNote/>

      {/* <!-- Button trigger modal --> */}
          <div>
              <button type="button" ref={refModal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Launch demo modal
              </button>

              {/* <!-- Modal --> */}
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                              <div className="container my-4">
                                  <form>
                                      <div className="mb-3">
                                          <label htmlFor="Title" className="form-label" >Title</label>
                                          <input type="text" className="form-control" value={note.title} id="title" name="title" onChange={onChange} />
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="Description" className="form-label">Description</label>
                                          <input type="text" className="form-control" id="description" value={note.description} onChange={onChange} name="description" />
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="Description" className="form-label">Tag</label>
                                          <input type="text" className="form-control" id="etag" value={note.tag} onChange={onChange} name="tag" />
                                      </div>
                                  </form>
                              </div>
                          </div>
                          <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
                              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      
      
      {/* NOTES */}
      <div className="row container my-4">
          <h2>Your Notes</h2>
          {notes.map((note) => {
              return <NoteItem note={note} key={note._id} updateNote={updateNote} />
          })}
      </div>
      </>
  )
}
