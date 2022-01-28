import React, {useEffect, Fragment, useContext}from 'react'
import { UserContext } from '../context/UserContext';

const TableDetails = () => {

  const {rest, setRest} = useContext(UserContext)

  useEffect(() =>{
    fetchData();
  },[]);

  const fetchData = async () =>{
        try {
          const response = await  fetch("http://localhost:5000/jwt/tableA") 
          const jsonData = await response.json()
          console.log(jsonData);
          setRest(jsonData);
      } catch (err) 
      {
          console.error(err.message)
      }
    
  };

  return (
    <Fragment>
      <table className='table table-hover table-dark'>
                <thead>
                    <tr className="bg-primary">
                        <th>Name</th>
                        <th>Location</th>
                    </tr>  
                </thead>
                <tbody>
                    {rest.map(restX =>(
                        <tr key={restX.id}>
                            <td>{restX.name}</td>
                            <td>{restX.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </Fragment>
  )
};

export default TableDetails;
