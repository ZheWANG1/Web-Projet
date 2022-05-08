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

class Signup extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event) {
        event.preventDefault();
        //this.props.setConnexionState("connected");
        if (event.target.password.value.length < 6) {
            alert("Veuillez entrer un mot de passe de 6 caractères minimum");
        } else {

            if (event.target.password.value == event.target.confirmpassword.value) {
                api.post('/user',
                    {
                        login: event.target.login.value,
                        password: event.target.password.value,
                        lastname: event.target.nom.value,
                        firstname: event.target.prenom.value
                    })
                    .then(res => {
                        console.log(res)
                        console.log(res.data)
                        api.post('/user/login',
                            {
                                login: event.target.login.value,
                                password: event.target.password.value
                            })
                            .then(res => {
                                console.log(res);
                                console.log(res.data);
                                this.props.setConnexionState("connected");
                                this.props.getUserInfo();
                                sessionStorage.setItem('userinfo', res.data.test);
                            })
                            .catch(err => {
                                this.props.setConnexionState("notconnected");
                                alert(err.response.data.message);
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        alert(err.response.data.message);
                    })
            } else {
                alert("Les mots de passe ne sont pas identiques");
            }
        }
    }


    render() {
        return (
            <div id="loginbox">
                <h1 id="en_title">Enregistrement</h1>
                <form onSubmit={this.onSubmit} method="POST">
                    <input type="text" id="nom" name="nom" placeholder="Nom"></input>
                    <input type="text" id="prenom" name="prenom" placeholder="Prenom"></input>
                    <input type="text" id="login" name="login" placeholder="Username"></input>
                    <input type="password" id="password" name="password" placeholder="Password"></input>
                    <input type="password" id="confirmpassword" name="confirmpassword" placeholder="Confirm password"></input>

                    <br></br>
                    <button type="submit" id="connexion">Connexion</button>
                    {this.props.connected == "connected" && <Navigate to="/"></Navigate>}
                    <Link to="/">
                        <button type="button" onClick={() => this.props.setHomepage()} id="annuler">Annuler</button>
                    </Link>

                </form>

            </div>
        );
    }
}

export default Signup;