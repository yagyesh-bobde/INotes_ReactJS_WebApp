import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const url = 'http://localhost:5000'
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({name: '' , email: '' , password: '' , cpassword:''})

  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  
  
  
  const handleClick = async (e) => {
    e.preventDefault()
    if (credentials.password !== credentials.cpassword) {
      return alert("Confirm Password and Password must be same")
    }
    const response = await fetch(`${url}/api/auth/createuser`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:credentials.name , email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
    });
    const json = await response.json()
    // Check if success 
    if (json.success) {
      // Store token
      localStorage.setItem('Item', json.authtoken)
      // Redirect
      navigate('/')
    
    } else {
      alert('Sign Up with correct credentials')
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"  required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChange} id="cpassword" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign me up</button>
      </form>
    </div>
  )
}

export default Signup
