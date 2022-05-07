import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import comment from './comment.png';
import Details from './Details';

import { Link } from 'react-router-dom';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
})

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
            id: "",
            ProfilePhoto: "",
            photo: [],
            nbcomments: 0,
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

        api.get('/user/getUser', {
            params: {
                login: this.props.user
            }
        }).then(res => {
            this.setState({ ProfilePhoto: res.data[0].profilePhoto })
        })

        apimessages.get('/message/' + this.props.id).then(res => {
            this.setState({ photo: res.data[0].images, nbcomments : res.data[0].comments.length })
        })
    }

    deleteMessage() {
        apimessages.delete(`/${this.state.id}`).then(res => {
            console.log("delete message : ", res.data);
        })
    }


    render() {
        return (
            <div id="commentaire">
                {!sessionStorage.getItem('userinfo')  ? <Link to="/login">
                    <img id="commentaire_profilphoto" alt="profil" onClick={() => { this.props.openProfil(this.state.user) }} src={this.state.ProfilePhoto} ></img>
                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.user) }} >{this.state.user}</h4>
                </Link> :
                <Link to="/profil">
                    <img id="commentaire_profilphoto" alt="profil" onClick={() => { this.props.openProfil(this.state.user) }} src={this.state.ProfilePhoto} ></img>
                    <h4 id="username" onClick={() => { this.props.openProfil(this.state.user) }} >{this.state.user}</h4>
                </Link>}
                {this.props.delete === 1 ?
                    <div id="deletebutton" onClick={() => { this.deleteMessage(); window.location.reload() }}>
                        <h4 id="delete">X</h4>
                    </div> : <p></p>}

                <p id="date">{this.state.date}</p>
                <p>{this.state.message}</p>
                <div id="commentaire_images">
                    {this.state.photo.map((photo, index) => {
                        return (
                            <img src={photo} alt="message" key={index}></img>
                        )
                    })}
                </div>
                {this.props.comment === 1 ? <p></p> :
                    <div id="commentaire_comment">
                        <Link to="/details">
                            <img id="commentaire_comment_img" src={comment} alt="comment" onClick={() => { this.props.openDetails(this.state.id) }}></img>
                            {this.state.nbcomments}
                        </Link>
                    </div>}
            </div>
        )
    }
}

export default Message;