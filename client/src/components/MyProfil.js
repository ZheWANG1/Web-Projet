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

class MyProfil extends Component {
    constructor(props) {
        super(props);

        //console.log(this.props.openProfil);

        this.friendList = [1, 2, 4, 5];
        this.state = {
            userinfo: props.userinfo[0] ? props.userinfo : [{ "login": "login" }],
            messages: [],
            content: props.content ? props.content : "",
            profil: [{ "login": "login" }]
        };


        api.get('/user/self').then(res => {
            this.state.userinfo = res.data;
        })

        console.log("content : ", this.state.content)
        api.get('/user/getUser', {

            params: {

                login: this.state.content
            }
        }).then(res => {
            console.log("content : ", this.state.content)
            this.state.profil = res.data

            if (this.state.content === "" || this.state.profil === [] || this.state.profil[0].login === this.state.userinfo[0].login) {
                console.log("on est sur notre profil")
                this.state.profil = this.state.userinfo
                console.log("profil : ", this.state.profil)
                console.log("self : ", this.state.userinfo)
            }

        })


        apimessages.get('/getSelfMessage').then(res => {
            let tmp = []
            for (var i = 0; i < res.data.length; i++) {

                tmp.push(<Message delete={1} message={res.data[i].message} user={res.data[i].login} date={res.data[i].date} id={res.data[i]._id} openProfil={this.props.openProfil}></Message>);

            }
            this.setState({ messages: tmp })
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
                <NavigationPannel getUserInfo={this.props.getUserInfo} openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <div id="userinfo">
                            <p> Username : {this.state.profil[0].login}</p>
                            <p> Firstname : {this.state.profil[0].firstname}</p>
                            <p> Lastname : {this.state.profil[0].lastname}</p>

                        </div>
                        <p>following {this.state.userinfo[0].following.length}</p>
                        <p>followers {this.state.userinfo[0].followers.length}</p>
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
export default MyProfil;