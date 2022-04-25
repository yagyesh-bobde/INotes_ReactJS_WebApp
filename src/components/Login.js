import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const url = 'http://localhost:5000'
    const [credentials , setCredentials] = useState({ email: '', password: '' })
    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        const response = await fetch(`${url}/api/auth/loginuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email , password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        
        // Check if success 
        if (json.success){
            // Store token
            localStorage.setItem('Item' , json.authtoken)
            // Redirect
            navigate('/')
        }else{
            alert('Wrong Crendentials')
            setCredentials({ email: '', password: '' })
        }
    }

  return (
    <div>
          <form onSubmit={handleClick}>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Login;