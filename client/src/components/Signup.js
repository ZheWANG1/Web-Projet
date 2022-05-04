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

        if(event.target.password.value == event.target.confirmpassword.value ){
            
        
            api.post('/user',
                {
                    login: event.target.login.value,
                    password: event.target.password.value,
                    lastname: event.target.nom.value,
                    firstname: event.target.prenom.value
                    // confirmpassword: event.target.confirmpassword.value
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
                            console.log(this.props.connected);
                            this.props.setConnexionState("connected");
                            this.props.getUserInfo();

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
        }else{
            alert("please enter the confirm with the same password")
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
                    <button type="submit" id="connexion" class="btn">Connexion</button>
                    {this.props.connected == "connected" && <Navigate to="/"></Navigate>}
                    <Link to="/">
                        <button type="button" onClick={() => this.props.setHomepage()} id="annuler" class="btn">Annuler</button>
                    </Link>

                </form>

            </div>
        );
    }
}

export default Signup;