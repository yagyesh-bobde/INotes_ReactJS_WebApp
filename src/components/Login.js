import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
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
            localStorage.setItem('token' , json.authToken)
            // Redirect
            props.showAlert("Login Successful" , 'success')
            navigate('/')
        }else{
            setCredentials({ email: '', password: '' })
            props.showAlert("Login Failed", 'danger')
        }
    }

  return (
    <div>
        <div className="container text-center">
            <h2>LogIn To Continue to iNotebook</h2>
        </div>
          <form onSubmit={handleClick}>
              <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
              </div>
              <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
              </div>
              <button type="submit" className="btn btn-primary">Log In</button>
          </form>
    </div>
  )
}

export default Login;
