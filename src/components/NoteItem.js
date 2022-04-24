import React from 'react'

export default function NoteItem(props) {
    const note = props.note
  return (
    <div className='col-md-4'>
          <div className="card my-3">
              <img src="..." className="card-img-top" alt="..."/>
                  <div className="card-body">
                      <h5 className="card-title" key={note.id}>{note.title}</h5>
                  <p className="card-text" key={note.id}>{note.description}</p>

                  </div>
          </div>
    </div>
  )
}
