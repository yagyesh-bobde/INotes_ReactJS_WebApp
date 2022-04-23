import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
    const a = useContext(noteContext)

    return (
    <div>
      This is the about page
      <p>My name is {a.name} </p>
    </div>
  )
}

export default About
