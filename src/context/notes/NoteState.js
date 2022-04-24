import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
    const notes_initial = [
        {
            "_id": "6262df01e6a4cea42f9ca727",
            "user": "6262c822dff85da3c6cfb59d",
            "title": "WINNING IS EASY",
            "description": "Because I am on the team",
            "tag": "Life",
            "timestamp": "2022-04-22T16:59:45.834Z",
            "__v": 0
        },
        {
            "_id": "626528bedefa024d27620049",
            "user": "6262c822dff85da3c6cfb59d",
            "title": "WINNING IS EASY",
            "description": "Because I am on the team",
            "tag": "Life",
            "timestamp": "2022-04-24T10:38:54.557Z",
            "__v": 0
        },
        {
            "_id": "626528bfdefa024d2762004b",
            "user": "6262c822dff85da3c6cfb59d",
            "title": "WINNING IS EASY",
            "description": "Because I am on the team",
            "tag": "Life",
            "timestamp": "2022-04-24T10:38:55.082Z",
            "__v": 0
        },
        {
            "_id": "626528bfdefa024d2762004d",
            "user": "6262c822dff85da3c6cfb59d",
            "title": "WINNING IS EASY",
            "description": "Because I am on the team",
            "tag": "Life",
            "timestamp": "2022-04-24T10:38:55.464Z",
            "__v": 0
        }
    ]

    
    const [notes , setNotes] = useState(notes_initial)

    return(
        <noteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;