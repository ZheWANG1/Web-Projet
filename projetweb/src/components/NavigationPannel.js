import React, { Component } from 'react';
import '../App.css';
import logo from './logo512.png';
import {Link} from "react-router-dom";

class NavigationPannel extends Component {

    constructor(props) {
        super(props);

    }

    changeConnect() {
        if (this.props.connected == "notconnected") {
            return (
                <div>
                    <Link to = "/login">
                    <button type="button" onClick={this.props.setLogin}>Log in</button>
                    </Link>
                    <Link to = "/signup">
                    <button type="button" onClick={this.props.setSignup}>Enregistement</button>
                    </Link>
                </div>
            )
        } else {
            if (this.props.connected == "connected") {
                return (
                    <div>
                        <button type="button" onClick={this.props.openProfil}>Profile</button>
                        <button type="button" onClick={() => { this.props.setLogout() }}>Log out</button>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <header id="homepage-header">
                    <div id="divlogo">
                        <img src={logo} alt="logo" id="logo"></img>
                    </div>
                    <div id="search">
                        <form action="">
                            <input type="text" id="rbar"></input>
                            <button type="submit" id="rbutton">Search</button>
                            <div>
                                <label><input type="checkbox"></input>c1</label>
                                <label><input type="checkbox"></input>c2</label>
                                <label><input type="checkbox"></input>c3</label>
                                <label><input type="checkbox"></input>c4</label>
                                <label><input type="checkbox"></input>c5</label>
                            </div>
                        </form>

                    </div>

                    <div id="profile">
                        {this.changeConnect()}
                    </div>

                </header>
            </div>
        )
    }
}

export default NavigationPannel;