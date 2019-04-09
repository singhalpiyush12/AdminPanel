import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import NavBarTop from "./components/NavBarTop";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Devices from "./components/Devices";
import About from "./components/About";
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import { Provider } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}
class App extends Component {
  render() {
      return (
        <Provider store = { store }>
        <Router>
            <NavBarTop />
            <div className="App">
              <Route path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/about" component={About} />
              <Route exact path="/devices" component={Devices} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
        </Router>
        </Provider>
      );
    }
}

export default App;
