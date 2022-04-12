import React, { Component } from 'react';
import '../App.css';

class Logout extends Component {
    constructor(logout) {
        this.logout = logout;
    }

    render() {
        return (<button onClick={this.logout()}>Deconnexion</button>);
    }
}

export default Logout;