import React,{Fragment , useState , useEffect} from 'react'
import { toast} from 'react-toastify';
import TableDetails from './TableDetails';

const Dashboard = ({setAuth}) => {

    // The JWT Token Generation Works Now I have to Make Sure that the Actuall Code Now Works 
    const [name, setName] = useState("")

    const  getName = async () =>{
        try {
            const response = await fetch("http://localhost:5000/jwt/dashboard",{
                method: "GET",
                headers: {token: localStorage.token}
            })
            // basically the header goes like this  - the header name is first then then name the JWT token
            // is written as.
            const parseRes = await response.json()
           // console.log(parseRes)
            setName(parseRes.name)
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    useEffect(() =>{
        getName()
    },[])

    const logout = (e) =>{
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("You Logged Out Succesfully")
    }

    return (
        <Fragment>
            <div>
                <h1 className="mt-5">Dashboard Introduction</h1>
                <h2>Welcome {name} </h2>
                <button className="btn btn-primary" onClick={e => logout(e)} >
                    Logout
                </button>
            </div>

            <div>
                <h1>Table Information goes Here </h1>
                <TableDetails/>
            </div>
        
        </Fragment>
    )
}

export default Dashboard
