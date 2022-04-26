import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
    const notes_initial = []
    const url = "http://localhost:5000"
    
    const [notes , setNotes] = useState(notes_initial)


    // GET THE DATA
    const getData = async () => {
        // API CALL 
        const token = localStorage.getItem('token')
        const response = await fetch(`${url}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'auth-token': token
            }
        });
        const json = await response.json();
        if (json){
            setNotes(json)
        }
        else{
            setNotes([])
        }
    }
  
    
// Add note
    const addNote = async (title , description , tag) => {
        // API CALL
        const response = await fetch(`${url}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        setNotes(notes.concat(json))
    }

// Delete Note Function
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')            },
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
                'auth-token': localStorage.getItem('token')            },
            body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
        });
        // eslint-disable-next-line
        const json= await response.json()
        
        // New notes 
        const newNotes = notes // JSON.parse(JSON.stringify(notes))
        // Login
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id){
                newNotes[index].title = title 
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
         setNotes(newNotes)
}};
 

    return(
        <noteContext.Provider value={{ notes, getData ,addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;