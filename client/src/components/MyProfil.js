import React, { Component, createRef } from 'react';
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

class MyProfil extends Component {
    constructor(props) {
        super(props);

        //console.log(this.props.openProfil);

        this.friendList = [1, 2, 4, 5];
        this.state = {
            userinfo: props.userinfo[0] ? props.userinfo : [{ "login": "login" }],
            messages: [],
            content: props.content ? props.content : "",
            profil: [{ "login": "login" }],
            researched: undefined
        };

        this.changeProfilePhotoRef = createRef();


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

                tmp.push(<Message profilePhoto={this.state.userinfo[0].profilePhoto} delete={1} message={res.data[i].message} user={res.data[i].login} date={res.data[i].date} id={res.data[i]._id} openProfil={this.props.openProfil}></Message>);

            }
            this.setState({ messages: tmp })
        });
    }


    toFollowingResult = () => {
        let userList = []
        console.log("following : ", this.state.userinfo[0].following);
        for (var i = 0; i < this.state.userinfo[0].following.length; i++) {
            userList.push(<User login={this.state.userinfo[0].following[i]} openProfil={this.props.openProfil}></User>);
        }
        this.props.setResearch(userList);
        this.setState({ researched: true })
    }


    toFollowerResult = () => {
        let userList = []
        for (var i = 0; i < this.state.userinfo[0].followers.length; i++) {
            userList.push(<User login={this.state.userinfo[0].followers[i]} openProfil={this.props.openProfil}></User>);
        }
        this.props.setResearch(userList);
        this.setState({ researched: true })
    }

    handleChangeProfilePhoto = async (event) => {
        console.log("change profile photo");
        event.preventDefault();
        // check if update the profile photo
        if (this.changeProfilePhotoRef.current.files[0] === undefined || this.changeProfilePhotoRef.current.files[0] === null) {
            return;
        }
        // prepare the new profile photo
        const file = this.changeProfilePhotoRef.current.files[0];
        const formData = new FormData();
        const filename = parseInt(Date.now() / 10000000) + '-' + file.name;
        formData.append('file', file);
        formData.append('name', filename);
        try {
            // send the new profile photo to the server

            const uploadSuccess = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.state.userinfo[0].token}`
                }
            });
            // if upload success, update the profile photo
            if (uploadSuccess.status === 200) {

                // update the user profile photo
                const res = await api.post("/user/self/updateProfileImage", {
                    filename: filename
                });
                // if update success, update the current profile photo
                if (res.status === 200) {
                    // update the profile photo

                    this.userinfo[0].profilePhoto = filename;
                    this.dispatch(
                        {
                            type: "ChangeProfilePhoto",
                            payload: filename
                        }
                    )

                }
            } else {
                console.log('upload failed');

            }
        } catch (error) {
            console.log(error.response.data);
            console.log(error);
        }

    }


    render() {
        return (
            <div>
                <NavigationPannel userinfo={this.props.userinfo} researched={this.props.researched} setResearch={this.props.setResearch} getUserInfo={this.props.getUserInfo} openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <div id="userinfo">

                            <label>
                                <input id="changeProfilePhoto" type="file" name="file" accept="image/jpg,image/jpeg,image/png"
                                    onChange={this.handleChangeProfilePhoto}
                                    style={{ display: "none" }}
                                    ref={this.changeProfilePhotoRef}
                                ></input>
                                <div id="profil_profilephoto">
                                    <img src={this.state.profil[0].profilePhoto} ></img>
                                </div>
                            </label>

                            <h3 id="nom"> {"Hello " + this.state.profil[0].firstname + " " + this.state.profil[0].lastname + " !"}</h3>
                            <p> Username : {this.state.profil[0].login}</p>
                        </div>
                        {this.state.researched && !this.setState({ researched: undefined }) && <Navigate to="/resultpage"></Navigate>}
                        <div id="follow">
                            <div onClick={() => { this.toFollowingResult(); }} id="following">
                                <h3>{this.state.userinfo[0].following ? this.state.userinfo[0].following.length : "0"}</h3>
                                <h4>following </h4>
                            </div>
                            <div onClick={() => { this.toFollowerResult(); }} id="follower">
                                <h3>{this.state.userinfo[0].followers ? this.state.userinfo[0].followers.length : "0"}</h3>
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
            </div>
        );

    }
}
export default MyProfil;