import React, { Component } from 'react';
import '../App.css';

import {Link , Navigate} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.loginname = null;
        this.password = null
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
                <h1 id="co_title">Ouvrir une session</h1>
                <form onSubmit= {this.onSubmit} method="POST">
                    <input type="text" id="login" name="login" placeholder="Login"></input>
                    <br></br>
                    <input type="password" id="password" name="password" placeholder="Password"></input>
                    <br></br>
                    
                    
                    

                    <button type="submit" id="connexion" class="btn">Connexion</button>
                    
                    {this.props.connected == "connected" && <Navigate to ="/"></Navigate>  }
                    <Link to ="/">
                    <button type="button" id="annuler" class="btn" onClick={() => this.props.setHomepage()}> Annuler</button>
                    </Link>
            </form>
            </div>
        );
    }
}

export default Login;