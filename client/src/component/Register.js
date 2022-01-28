import React,{Fragment, useState} from 'react'
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Register = ({setAuth}) => {

  const [name, setName] = useState("")
  const [email, setEmail] =useState("")
  const [password, setPassword] = useState("")

  //This Works as Intended in the Video.
  const handleSubmit = async e =>{
    e.preventDefault();
    try {

      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/jwt/register",{
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(body)
      });

      const parseData = await response.json()
      if(parseData.token){
        
        localStorage.setItem("token", parseData.token)
        setAuth(true)
        toast.success("Login Succesfull")
    
      }else{
        setAuth(false)
        toast.error(parseData)
      }
      
    } catch (err) {

      console.error(err.message)
      
    }
  }


  return (
    <Fragment>
       <h1>Register Page</h1>
       <form>
           <input type="text" name="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} className="form-control my-3"/>
           <input type="password" name="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} className="form-control my-3"/>
           <input type="text" name="name" value={name} placeholder="name" onChange={e => setName(e.target.value)} className="form-control my-3"/>
           <button onClick={handleSubmit} type="submit" className="btn btn-success btn-block" > Register </button>
       </form>
       <Link to="/login">Login</Link>
    </Fragment>
  )
}

export default Register
