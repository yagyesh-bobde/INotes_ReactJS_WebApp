import NoteItem from "./NoteItem";
import React, { useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

export default function Notes() {
    // Using the notes context
    const context = useContext(noteContext);
    // Destructuring the notes context
    const { notes, getData } = context;
    
    // Load the notes on mount
    useEffect(() => {
        getData()
    }, [])

  return (
      <div className="row container my-4">
          <h2>Your Notes</h2>
          {notes.map((note) => {
              return <NoteItem note={note} key={note._id}/>
          })}
      </div>
  )
}
