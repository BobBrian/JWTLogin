import React,{Fragment, useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect ,Link} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";

const App = () => {

  // U need to do Manual Routing at this stage to get to the components

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth(){
    try {

      const response = await fetch("http://localhost:5000/jwt/verify",{
        method: "GET",
        headers: {authtoken: localStorage.token}
      })

      const parseVerify = await response.json()
      
      parseVerify === true ? setIsAuthenticated(true): setIsAuthenticated(false)

      
    } catch (err) {

      console.error(err.message)
      
    }
  }

  useEffect(() =>{
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/dashboard" />)}/>            
            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/login" />)}/>
            <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/login" />)}/>
          </Switch>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          
        </div>
      </Router>
    </Fragment>
  )
}

export default App
