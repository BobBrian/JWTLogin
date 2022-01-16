import React,{Fragment, useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";

const App = () => {

  // U need to do Manual Routing at this stage to get to the components

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <h1>App Landing Page</h1>
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path="/login" render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/dashboard" />)}/>            
            <Route exact path="/register" render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/login" />)}/>
            <Route exact path="/dashboard" render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth}  /> ) : ( <Redirect to="/login" />)}/>
          </Switch>
        </div>
      </Router>
    </Fragment>
  )
}

export default App
