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
            login: ""
            
        }
    }


    componentDidMount() {
        this.setState({
            login: this.props.login
            
        })
    }

    render() {
        return (
            <div class="commentaire">
                <Link to="/profil">
                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.login) }} >{this.state.login}</h4>
                </Link>
                
            </div>
        )
    }

}

export default User;