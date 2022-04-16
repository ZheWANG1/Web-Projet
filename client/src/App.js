import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Profil from './components/Profil';
import NavigationPannel from './components/NavigationPannel';
import Homepage from './components/Homepage';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink

} from "react-router-dom";

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/api',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }

})

function random(n) {
  let res = Math.random() * n;
  return Math.floor(res)

}

class App extends Component {

  constructor(props) {
    super(props);
    this.pagecourant = props.connexion;
    this.state = {
      user: "homepage",
      connected: "notconnected"
    };

    


    this.setlogout = this.setLogout.bind(this);
    this.changetab = this.changetab.bind(this);
    this.setlogin = this.setLogin.bind(this);
    this.openprofil = this.openProfil.bind(this);
    this.setconnexionstate = this.setConnexionState.bind(this);
  }

  getState = () => {
    return this.state.user;
  }

  setLogout = () => {
    this.setState({ user: "homepage", connected: "notconnected" })
  }

  setLogin = () => {
    this.setState({ user: "login" });
  }

  openProfil = () => {
    this.setState({ user: "profil" });
  }

  setConnexionState = (v) => {
    this.setState({ connected: v });
  }

  setHomepage = () => {
    this.setState({ user: "homepage" });
  }

  setSignup = () => {
    this.setState({ user: "signup" })
  }

  changetab() {
    if (this.state.user == "login") {
      return <Login setHomepage={this.setHomepage} setConnexionState={this.setConnexionState} ConnexionState={this.state.connected}> </Login>

    }
    else {
      if (this.state.user == "homepage") {
        return <Homepage openProfil={this.openProfil} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}> </Homepage>
      }

      if (this.state.user == "signup") {
        return <Signup setHomepage={this.setHomepage} setConnexionState={this.setConnexionState}></Signup>
      }

      if (this.state.user == "profil") {
        return <Profil openProfil={this.openProfil} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></Profil>
      }
    }
  }

  render() {

    return (
      <div className="MainPage">
        <Routes>
          <Route className="MainPage-body" path="/*" element={<Homepage openProfil={this.openProfil} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}>{this.changetab()}</Homepage>}>
          </Route>
          <Route path="/login" element={<Login setHomepage={this.setHomepage} setConnexionState={this.setConnexionState} connected={this.state.connected} />}>
          </Route>
          <Route path="/signup" element={<Signup setConnexionState={this.setConnexionState} connected={this.state.connected} />}>
          </Route>
          <Route path="/homepage" element={<Homepage openProfil={this.openProfil} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}>{this.changetab()}</Homepage>}>
          </Route>
          <Route path="/profil" element={<Profil openProfil={this.openProfil} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></Profil>}></Route>

        </Routes>
      </div>

    );
  }
}


export default App;