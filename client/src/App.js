import React, { Component, createRef } from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Profil from './components/Profil';
import MyProfil from './components/MyProfil';
import NavigationPannel from './components/NavigationPannel';
import Details from './components/Details';
import Homepage from './components/Homepage';
import ResultPage from './components/ResultPage';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useParams

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
      connected: "notconnected",
      userinfo: [],
      profil: "",
      researched: [],
      details: "",

    };
    this.changeProfilePhotoRef = createRef();


    this.setlogout = this.setLogout.bind(this);
    this.changetab = this.changetab.bind(this);
    this.setlogin = this.setLogin.bind(this);
    this.openprofil = this.openProfil.bind(this);
    this.opendetails = this.openDetails.bind(this);
    this.setconnexionstate = this.setConnexionState.bind(this);
    this.getuserinfo = this.getUserInfo.bind(this);
    this.setresearch = this.setResearch.bind(this);
  }

  componentDidMount() {
    api.get('/user/self').then(res => {
      //console.log(res.data);
      if (res.data[0] != null) {
        this.setState({ connected: "connected", userinfo: res.data })
      }
    })
  }


  setResearch = async (r) => {
    this.setState({ researched: r });
  }

  getUserInfo = async () => {
    await api.get('/user/self').then(res => {
      this.setState({ connected: "connected", userinfo: res.data })
    })
    console.log(this.state.userinfo);
  }

  getState = () => {
    return this.state.user;
  }

  setLogout = () => {
    api.delete('/user/logout').then(res => {
      this.setState({ user: "homepage", connected: "notconnected", userinfo: [] })
    })
  }

  setLogin = () => {
    this.setState({ user: "login" });
  }

  openProfil = (n) => {
    this.setState({ user: "profil", profil: n });
  }

  openDetails = (n) => {
    this.setState({ user: "details", details: n });
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
      return <Login userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} setHomepage={this.setHomepage} setConnexionState={this.setConnexionState} ConnexionState={this.state.connected}> </Login>
    }
    else {
      if (this.state.user == "homepage") {
        return <Homepage openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}> </Homepage>
      }

      if (this.state.user == "signup") {
        return <Signup userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} setHomepage={this.setHomepage} setConnexionState={this.setConnexionState}></Signup>
      }

      if (this.state.user == "profil") {
        return <Profil content={this.state.profil} userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></Profil>
      }

      if (this.state.user == "details"){
        return <Details content={this.state.details} userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} setHomepage={this.setHomepage} setConnexionState={this.setConnexionState} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></Details>
      }
    }
  }

  render() {
    return (
      <div className="MainPage">
        <Routes>
          <Route className="MainPage-body" path="/*" element={<Homepage userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}>{this.changetab()}</Homepage>}>
          </Route>
          <Route path="/login" element={<Login userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} setHomepage={this.setHomepage} setConnexionState={this.setConnexionState} connected={this.state.connected} />}>
          </Route>
          <Route path="/signup" element={<Signup userinfo={this.state.userinfo} getUserInfo={this.getUserInfo} setConnexionState={this.setConnexionState} connected={this.state.connected} />}>
          </Route>
          <Route path="/homepage" element={<Homepage userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}>{this.changetab()}</Homepage>}>
          </Route>
          <Route path="/profil" element={<Profil content={this.state.profil} userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></Profil>}>
          </Route>
          <Route path="/myprofil" element={<MyProfil userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} content={this.state.profil} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></MyProfil>}>
          </Route>
          <Route path="/resultpage" element={<ResultPage userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}></ResultPage>}>
          </Route>
          <Route path="/details" element={<Details content={this.state.details} userinfo={this.state.userinfo} changeProfilePhotoRef={this.changeProfilePhotoRef} researched={this.state.researched} setResearch={this.setResearch} getUserInfo={this.getUserInfo} openProfil={this.openProfil} openDetails={this.openDetails} setLogin={this.setLogin} setSignup={this.setSignup} setLogout={this.setLogout} connected={this.state.connected}>{this.changetab()}</Details>}>
          </Route>

        </Routes>
      </div>

    );
  }
}


export default App;