import React,{Fragment} from 'react'


const Dashboard = ({setAuth}) => {
    
    return (
        <Fragment>
            <h1 className="mt-5">Dashboard</h1>
            <h2>Welcome </h2>
            
            <button onClick={() => setAuth(false)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard
