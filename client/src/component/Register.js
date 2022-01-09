import React, {Fragment, useState} from 'react'
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const [input, setInput] = useState({
        email:"",
        password:"",
        name:""
    })

    const {email, password , name} = input

    const onChange = e =>setInput({ ...input, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password, name };
          const response = await fetch(
            "http://localhost:5000/auth/register",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
            toast.success("Register Successfully");
          } else {
            setAuth(false);
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="mt-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input className='form-control my-3' type="email" name="email" placeholder='email'value={email}  onChange={e => onChange(e)}/>
                <input className='form-control my-3' type="password" name="password" placeholder='password' value={password}  onChange={e => onChange(e)}/>
                <input className='form-control my-3' type="text" name="name" placeholder='name' value={name}  onChange={e => onChange(e)}/>
                <button className='btn btn-success btn-block'> Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}

export default Register
