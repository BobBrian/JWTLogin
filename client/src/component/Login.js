import React,{Fragment ,useState} from 'react'
import { Link, Redirect } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const Login = ({setAuth}) => {

    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async e =>{
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/jwt/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json()

            if(parseRes.token){
                //console.log(parsRes)
                localStorage.setItem("token", parseRes.token)
                setAuth(true);
                toast.success("Login Succesfull")
            
            }else{
                setAuth(false)
                toast.error(parseRes)
            }

            
            
        } catch (err) {
            console.error(err.message)
            
        }
    }



    return (
        <Fragment>
            <h1>Login Page</h1>
            <form>
                <input type="text" name="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} className="form-control my-3"/>
                <input type="password" name="password" value={password} placeholder="password" onChange={e => setPassword(e.target.value)} className="form-control my-3"/>
                <button onClick={handleLogin} type="submit" className="btn btn-success btn-block" > Login</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
    )
}

export default Login
