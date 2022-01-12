import React,{Fragment, useEffect, useState} from 'react'

const Dashboard = ({setAuth}) => {
    const [name, setName] = useState("");

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/", {
                method: "POST",
                 headers: { jwt_token: localStorage.token }
            });

            const parseData = await res.json();
            setName(parseData.user_name);

            
        } catch (err) {
            console.error(err.message);
            
        }
    }

    //Logout Feature



    


    return (
        <Fragment>
            <h1 className="mt-5">Dashboard</h1>
            <h2>Welcome {name}</h2>
            <button onClick={() => setAuth(false)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard
