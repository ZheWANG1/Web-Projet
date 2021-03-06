import React, { Component } from 'react';
import '../App.css';
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        api.post('/user/login',
            {
                login: event.target.login.value,
                password: event.target.password.value
            })
            .then(res => {
                console.log(res.data);
                this.props.setConnexionState("connected");
                this.props.getUserInfo();
                sessionStorage.setItem('userinfo', res.data.test);
            })
            .catch(err => {
                alert(err.response.data.message);
                console.log(err);
            })

    }

    render() {
        return (
            <div id="loginbox">
                <h1 id="co_title">Ouvrir une session</h1>
                <form onSubmit={this.onSubmit} method="POST">
                    <input type="text" id="login" name="login" placeholder="Login"></input>
                    <br></br>
                    <input type="password" id="password" name="password" placeholder="Password"></input>
                    <br></br>

                    <button type="submit" id="connexion">Connexion</button>

                    {this.props.connected == "connected" && <Navigate to="/"></Navigate>}
                    <Link to="/">
                        <button type="button" id="annuler" onClick={() => this.props.setHomepage()}> Annuler</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Login;