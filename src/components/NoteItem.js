import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const {note , updateNote} = props
  return (
    <div className='col-md-4'>
          <div className="card my-3">
              {/* <img src="..." className="card-img-top" alt="..."/> */}
                  <div className="card-body">
                     <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                         <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id)}}></i>
                         <i className="fa-regular fa-pen-to-square mx-3" onClick={() => {updateNote(note)}}></i>
                      </div>
                  <p className="card-text">{note.description}</p>
                  
                  </div>
          </div>
    </div>
  )
}
