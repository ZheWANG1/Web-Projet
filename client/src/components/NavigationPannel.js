import React, { Component } from 'react';
import '../App.css';
import logo from './logo1.png';
import { Link } from "react-router-dom";
import axios from 'axios';
import User from './User';
import Message from './Message';
import { Route, Routes, Navigate } from 'react-router-dom';
import ResultPage from './ResultPage';

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

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//const PF = "http://localhost:4000/public/images/"

class NavigationPannel extends Component {

    constructor(props) {
        super(props);
        this.state = { researched: undefined }

        this.onSubmit = this.onSubmit.bind(this);
        this.changeConnect = this.changeConnect.bind(this);

    }

    changeConnect() {
        if (this.props.connected == "notconnected") {
            console.log("profile photo : ", `${PF}defaultAvatar.jpg`);
            return (
                <div>

                    
                    <Link to="/login">
                    <img id="profilephoto" onClick={this.props.setLogin} src={`${PF}defaultAvatar.jpg`} ></img>
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

                        <Link to="/myprofil">
                        <img id="profilephoto" onClick={() => { this.props.getUserInfo(); this.props.openProfil(""); console.log("reaction") }} src={this.props.userinfo[0] ? this.props.userinfo[0].profilePhoto : ""}></img>

                            {/* <button type="button" onClick={() => { this.props.getUserInfo(); this.props.openProfil(""); console.log("reaction") }}>Profile</button> */}
                        </Link>
                        <Link to="/Homepage">
                            <button type="button" onClick={() => { this.props.setLogout() }}>Log out</button>
                        </Link>
                    </div>
                )
            }
        }
    }
    onSubmit(event) {
        event.preventDefault();
        console.log(event.target.user.checked);
        console.log(event.target.message.checked);
        console.log("bar content", event.target.rbar.value);

        if (event.target.user.checked) {
            api.get('/findUser', {
                params: {
                    content: event.target.rbar.value
                }
            })

                //api.get(`/user/getUser/:${event.target.rbar.value}`)
                .then(res => {
                    //console.log(res.data)
                    if (res.data === []) {
                        alert("no such user check your spelling")
                    } else {
                        //console.log(res.data)
                        console.log(this.props)
                        let userList = []
                        for (var i = 0; i < res.data.length; i++) {

                            userList.push(<User userinfo = {this.props.userinfo} login={res.data[i].login} openProfil={this.props.openProfil}></User>);

                        }
                        this.props.setResearch(userList);
                        this.setState({ researched: userList });
                        if (this.props.inresult) {
                            this.props.setResults(userList);
                        }
                        console.log("researched", this.state.researched)
                    }
                })


        } else if (event.target.message.checked) {
            apimessages.get('/findmessage', {

                params: {
                    content: event.target.rbar.value
                }


            }).then(res => {
                if (res.data === []) {
                    alert("no such message")
                } else {
                    //console.log(res.data)
                    console.log(this.props)

                    let messageList = []
                    for (var i = 0; i < res.data.length; i++) {

                        messageList.push(<Message userinfo = {this.props.userinfo} message={res.data[i].message} user={res.data[i].login} date={res.data[i].date} id={res.data[i]._id} openProfil={this.props.openProfil}></Message>);

                    }
                    console.log("messageList : ", messageList)
                    this.props.setResearch(messageList);
                    this.setState({ researched: messageList });
                    if (this.props.inresult) {
                        this.props.setResults(messageList);
                    }
                    console.log("researched : ", this.state.researched)
                }

            })
        } else {
            alert("check a check box to make a research")
        }
    }
    image = () => {
        try {
            return <img src={this.props.userinfo[0] ? this.props.userinfo[0].profilePhoto : `${PF}defaultAvatar.jpg`} ></img>
        } catch (err) {
            console.log("err: ", err)
        }
    }
    render() {
        return (
            <div>

                {this.state.researched && !this.setState({ researched: undefined }) && <Navigate to="/resultpage"></Navigate>}
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
                                <label><input type="radio" id='user' name='searchtype'></input>user</label>
                                <label><input type="radio" id='message' name='searchtype'></input>message</label>
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