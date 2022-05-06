import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

import { Link } from 'react-router-dom';

const apimessages = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/apimessages',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            ProfilePhoto: ""
        }
    }

    componentDidMount() {
        this.setState({
            login: this.props.login

        })

        api.get('/user/getUser', {
            params: {
                login: this.props.login
            }
        }).then(res => {
            this.setState({ ProfilePhoto: res.data[0].profilePhoto })
        })
    }

    render() {
        console.log("--------------------------" ,this.props.userinfo)
        return (
            <div id="commentaire">
                
                {this.props.userinfo.length === 0 ? <Link to="/login">
                    <img id="commentaire_profilphoto" alt="profil" onClick={() => { this.props.openProfil(this.state.login) }} src={this.state.ProfilePhoto} ></img>
                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.login) }} >{this.state.login}</h4>
                </Link> :

                <Link to="/profil">
                    <img id="commentaire_profilphoto" onClick={() => { this.props.openProfil(this.state.login) }} src={this.state.ProfilePhoto} ></img>

                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.login) }} >{this.state.login}</h4>
                </Link>}

            </div>
        )
    }

}

export default User;