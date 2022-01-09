import React,{Fragment, useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

//components
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Register from './component/Register';

const App = () => {
  
  const[IsAuth, setIsAuth] = useState(false)
  // Keep in Mind this is a Method for Using Routes as Well

  const setAuth = boolean =>{
    setIsAuth(boolean);
  }

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Switch>
           <Route exact path="/login" render={ props => !IsAuth ? (<Login {...props} setAuth={setAuth}/>): (<Redirect to="/dashboard"/>)}/>
           <Route exact path="/register" render={ props => IsAuth ? (<Register {...props} setAuth={setAuth}/>): (<Redirect to="/dashboard"/>)}/>
           <Route exact path="/dashboard" render={ props => IsAuth ?( <Dashboard {...props} setAuth={setAuth}/>) : (<Redirect to="/login"/>)}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  )
}

export default App

