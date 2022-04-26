import React, { Component } from 'react';
import '../App.css';
import logo from './logo512.png';
import { Link } from "react-router-dom";
import axios from 'axios';
//import api from '../../../server/src/api';
const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const apimessages = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/apimessages',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

class NavigationPannel extends Component {

    constructor(props) {
        super(props);

    }

    changeConnect() {
        if (this.props.connected == "notconnected") {
            return (
                <div>
                    <Link to="/login">
                        <button type="button" onClick={this.props.setLogin}>Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button type="button" onClick={this.props.setSignup}>Enregistement</button>
                    </Link>
                </div>
            )
        } else {
            if (this.props.connected == "connected") {
                return (
                    <div>
                        <Link to="/profil">
                            <button type="button" onClick={() => { this.props.openProfil() }}>Profile</button>
                        </Link>
                        <Link to="/Homepage">
                            <button type="button" onClick={() => { this.props.setLogout() }}>Log out</button>
                        </Link>
                    </div>
                )
            }
        }
    }
    onSubmit(event){
        event.preventDefault();
        console.log(event.target.user.checked);
        console.log(event.target.message.checked);
        console.log("bar content" ,event.target.rbar.value)
        if(event.target.user.checked){
            api.get('/findUser' , {
                params : {
                    content : event.target.rbar.value
                }
                
                
            })

            //api.get(`/user/getUser/:${event.target.rbar.value}`)
            .then(res=>{
                //console.log(res.data)
                if(res.data ===[]){
                    alert("no such user check your spelling")
                }else{
                    console.log(res.data)
                }
                
            })
            

        }else if(event.target.message.checked){
            apimessages.get('/findmessage' , {
                
                    params :{
                        content : event.target.rbar.value
                    }
                
                
            }).then(res=>{
                console.log(res.data)
            })
        }else{
            alert("check a check box to make a research")
        }
    }

    render() {
        return (
            <div>
                <header id="homepage-header">
                    <div id="divlogo">
                        <Link to="/Homepage">
                            <img src={logo} alt="logo" id="logo"></img>
                        </Link>
                    </div>
                    <div id="search">
                        <form onSubmit={this.onSubmit} method='POST'>
                            <input type="text" id="rbar"></input>
                            <button type="submit" id="rbutton">Search</button>
                            <div>
                                <label><input type="checkbox" id='user' name='user'></input>user</label>
                                <label><input type="checkbox" id='message' name='message'></input>message</label>
                                <label><input type="checkbox"></input>c3</label>
                                <label><input type="checkbox"></input>c4</label>
                                <label><input type="checkbox"></input>c5</label>
                            </div>
                        </form>

                    </div>

                    <div id="profile">
                        {this.changeConnect()}
                    </div>

                </header>
            </div>
        )
    }
}

export default NavigationPannel;