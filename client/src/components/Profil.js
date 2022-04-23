import React, { Component } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import Message from './Message';
import axios from 'axios';

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


class Profil extends Component {
    constructor(props) {
        super(props);
        this.friendList = [1, 2, 4, 5];
        this.state = {
            userinfo: props.userinfo[0] ? props.userinfo : [{ "login": "login" }],
            messages: []
        };

        api.get('/user/self').then(res => {
            //document.getElementById("userinfo").innerHTML = "Login : " + res.data[0].login;
            this.state.userinfo = res.data;
        })

        apimessages.get('/getSelfMessage').then(res => {
            let tmp = []
            for (var i = 0; i < res.data.length; i++) {
                
               tmp.push(<Message message={res.data[i].message} user={res.data[i].login} id={res.data[i]._id}></Message>);

            }
            this.setState({messages: tmp})
        });
    }

    listItems() {
        var items = [];
        for (var i = 0; i < this.friendList.length; i++) {
            items.push(<li key={i}>{this.friendList[i]}</li>);
        }
        return items;
    }

    render() {
        return (
            <div>
                <NavigationPannel openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <div id="userinfo">
                            <p> Username : {this.state.userinfo[0].login}</p>
                            <p> Firstname : {this.state.userinfo[0].firstname}</p>
                            <p> Lastname : {this.state.userinfo[0].lastname}</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, sequat eu.</p>
                        <ul>
                            {this.listItems()}
                        </ul>
                    </div>

                    <div id="zoneright">
                        <div id="zoneC">
                            <div id="zonemessage">{this.state.messages}</div>
                            <div>
                                <p>----------------------------------------------------------------</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default Profil;