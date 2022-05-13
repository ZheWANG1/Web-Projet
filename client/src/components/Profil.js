import React, { Component } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import Message from './Message';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import User from './User';

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
            messages: [],
            content: props.content ? props.content : "",
            profil: [{ "login": "login", "following": [], "followers": [] }],
            researched: undefined,
            nbFollowing: 0,
            nbFollowers: 0,
            hasFollowing: false,
        };


        
    }

    componentDidMount() {
        let content = this.props.content&&this.props.content!="" ? this.props.content : sessionStorage.getItem('profil');
        this.setState({ content: content })

        api.get('/user/self').then(res => {
            this.setState({ userinfo: res.data })
        })

        api.get('/user/getUser', {

            params: {

                login: content
            }
        }).then(res => {
            console.log("content ", content);
            this.state.profil = res.data


            if (this.state.content === "" || this.state.profil === [] || this.state.profil[0].login === this.state.userinfo[0].login) {
                
                this.setState({profil : this.state.userinfo})
            }
            //console.log("profil : ", this.state.profil);
            this.setState({ nbFollowing: res.data[0].following.length })
            this.setState({ nbFollowers: res.data[0].followers.length })
            this.setState({ hasFollowing: res.data[0].followers.includes(this.state.userinfo[0].login) })
            apimessages.get(`${this.state.profil[0].login}/getUserMessage`).then(res => {
                let tmp = []
                for (var i = 0; i < res.data.length; i++) {

                    tmp.push(<Message key={res.data[i]._id} profilePhoto={this.state.profil[0].profilePhoto} message={res.data[i].message} user={res.data[i].login} date={res.data[i].date} id={res.data[i]._id} openProfil={this.props.openProfil} openDetails={this.props.openDetails}></Message>);

                }
                this.setState({ messages: tmp })
            })
        })
        if (this.props.content) {
            sessionStorage.setItem('profil', this.props.content);
        }
    }


    toFollowingResult = () => {
        let userList = []
        console.log("following : ", this.state.profil[0].following);
        for (var i = 0; i < this.state.profil[0].following.length; i++) {
            userList.push(<User userinfo = {this.state.profil} login={this.state.profil[0].following[i]} openProfil={this.props.openProfil}></User>);
        }
        this.props.setResearch(userList);
        this.setState({ researched: true })
    }


    toFollowerResult = () => {
        let userList = []
        for (var i = 0; i < this.state.profil[0].followers.length; i++) {
            userList.push(<User userinfo = {this.state.profil} login={this.state.profil[0].followers[i]} openProfil={this.props.openProfil}></User>);
        }
        this.props.setResearch(userList);
        this.setState({ researched: true })
    }


    follow = () => {
        api.post('/user/self/follow', {
            Flogin: this.state.profil[0].login
        }).then(res => {
            console.log("follow : ", res.data);
            this.setState({ nbFollowers: this.state.nbFollowers + 1, hasFollowing: true })
        });
    }


    unfollow = () => {
        api.post('/user/self/unfollow', {
            Flogin: this.state.profil[0].login
        }).then(res => {
            console.log("unfollow : ", res.data);
            this.setState({ nbFollowers: this.state.nbFollowers - 1, hasFollowing: false })
        });
    }

    render() {
        return (
            <div>
                < NavigationPannel userinfo={this.props.userinfo} setResearch={this.props.setResearch} getUserInfo={this.props.getUserInfo} openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected} ></NavigationPannel >
                <div>
                    <div id="zoneleft">
                        <div id="userinfo">
                            <div id="profil_profilephoto">
                                <img src={this.state.profil[0].profilePhoto} ></img>
                            </div>
                            <div id="userinfo_nom">
                                <h3 id="nom"> {this.state.profil[0].firstname + " " + this.state.profil[0].lastname}</h3>
                                {this.state.profil[0].login == this.state.userinfo[0].login ? <p></p> :
                                    (this.state.hasFollowing ?
                                        <div type="button" onClick={() => { this.unfollow() }}>
                                            <p>Unfollow</p>
                                        </div> :
                                        <div onClick={() => { this.follow() }}>
                                            <p>Follow</p>
                                        </div>)}
                            </div>

                            <p> Username : {this.state.profil[0].login}</p>

                        </div>
                        {this.state.researched && !this.setState({ researched: undefined }) && <Navigate to="/resultpage"></Navigate>}
                        <div id="follow">
                            <div onClick={() => { this.toFollowingResult(); }} id="following">
                                <h3>{this.state.profil[0].following ? this.state.nbFollowing : "0"}</h3>
                                <h4>following </h4>
                            </div>
                            <div onClick={() => { this.toFollowerResult(); }} id="follower">
                                <h3>{this.state.profil[0].followers ? this.state.nbFollowers : "0"}</h3>
                                <h4>followers </h4>
                            </div>
                        </div>


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
            </div >
        );

    }
}
export default Profil;