import React, { Component } from 'react';
import '../App.css';
import { Link, Navigate } from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.setConnexionState("connected");
        //this.props.setHomepage();
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