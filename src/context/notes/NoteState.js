import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
    const notes_initial = []
    const url = "http://localhost:5000"
    
    const [notes , setNotes] = useState(notes_initial)


    // GET THE DATA
    const getData = async (id, title, description, tag) => {
        // API CALL 
        const response = await fetch(`${url}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MmM4MjJkZmY4NWRhM2M2Y2ZiNTlkIn0sImlhdCI6MTY1MDY0MDk3N30.P5GgnxwP13JIrI1Bb6ufUyJw9cgRbvwxJaic1kEruPo'
            },
        });
        const json = await response.json();
        setNotes(json)
    }
  
    
// Add note
    const addNote = async (title , description , tag) => {
        // API CALL
        const response = await fetch(`${url}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MmM4MjJkZmY4NWRhM2M2Y2ZiNTlkIn0sImlhdCI6MTY1MDY0MDk3N30.P5GgnxwP13JIrI1Bb6ufUyJw9cgRbvwxJaic1kEruPo'
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        const note = {
            title : title ,
            description: description,
            tag: tag
        }
        console.log(json)

        setNotes(notes.concat(note))
    }

// Delete Note Function
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MmM4MjJkZmY4NWRhM2M2Y2ZiNTlkIn0sImlhdCI6MTY1MDY0MDk3N30.P5GgnxwP13JIrI1Bb6ufUyJw9cgRbvwxJaic1kEruPo'
            },
        });
        console.log(response.json())
        // Logic
        const newNotes = notes.filter((note) => {return note._id !== id })
        setNotes(newNotes)
    }   
// Edit note Function
    const editNote = async (id , title , description , tag) => {
        // API CALL 
        const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MmM4MjJkZmY4NWRhM2M2Y2ZiNTlkIn0sImlhdCI6MTY1MDY0MDk3N30.P5GgnxwP13JIrI1Bb6ufUyJw9cgRbvwxJaic1kEruPo'
            },
            body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
        });
        const json= await response.json()
        
        // Login
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id){
                element.title = title 
                element.description = description
                element.tag = tag
            }
         
}};
 

    return(
        <noteContext.Provider value={{ notes, getData ,addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;