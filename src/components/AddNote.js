import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const {addNote} = context

    const [note, setNote] = useState({title: "" , description: "" , tag: "Personal"})

    const onChange = (e) => {
      setNote({...note , [e.target.name] : e.target.value})
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title , note.description , note.tag)
    }

  return (
      <div className="container my-4">
          <h2>Add a note:</h2>
          <form>
              <div className="mb-3">
                  <label htmlFor="Title" className="form-label" >Title</label>
                  <input type="text" className="form-control" id="Title" name="title" onChange={onChange}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="Description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" onChange={onChange} name="description"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="Description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" onChange={onChange} name="tag"/>
              </div>
              <button disabled={note.title.length <5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
      </div>
  )
}

export default AddNote
