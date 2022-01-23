import React,{Fragment, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'


const Dashboard = ({setAuth}) => {

    // If the JWT dosent Work Switch to the regular Method for Getting these Name

    const {id} = useParams()

    const [name, setName] = useState("");


    const getProfile = async () => {
        try {
          const res = await fetch(`http://localhost:5000/JWT/Dash/Name/${id}`);
    
          const parseData = await res.json();
          console.log(parseData)
          setName(parseData)
          
        } catch (err) {
          console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
      }, []);
    
    return (
        <Fragment>
            <div>
                <h1 className="mt-5">Dashboard</h1>
                <h2>Welcome {name}</h2>
                <button className="btn btn-primary">
                    Logout
                </button>
            </div>
        </Fragment>
    )
}

export default Dashboard
