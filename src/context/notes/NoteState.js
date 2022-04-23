import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
    const a = {
        "name" : "yagyesh",
        "Age" : 18
    }
    
    // const [state , setState] = useState(a)

    return(
        <noteContext.Provider value={a}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;