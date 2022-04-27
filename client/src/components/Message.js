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

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            user: "",
            date: "",
            id: ""
        }

        this.deleteMessage = this.deleteMessage.bind(this);
    }


    componentDidMount() {
        var timestamp = new Date(this.props.date);
        this.setState({
            message: this.props.message,
            user: this.props.user,
            date: timestamp.toLocaleString(),
            id: this.props.id
        })
    }

    deleteMessage() {
        apimessages.delete(`/${this.state.id}`).then(res => {
            console.log("delete message : ", res.data);
        })
    }


    render() {
        return (
            <div class="commentaire">
                <Link to="/profil">
                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.user) }} >{this.state.user}</h4>
                </Link>
                {this.props.delete == 1 ?
                    <div id="deletebutton" onClick={() => { this.deleteMessage(); window.location.reload() }}>
                        <h4>X</h4>
                    </div> : <p></p>}

                <date>{this.state.date}</date>
                <p>{this.state.message}</p>
            </div>
        )
    }

}

export default Message;