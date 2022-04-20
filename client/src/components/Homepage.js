import React, { Component } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import logo from './logo512.png';
import axios from 'axios';

const containerCSS = {

    width: "60px",
    height: "60px",

    backgroundColor: "#0d6efd",
    color: "#FFF",
    borderRadius: "50px",
    textAlign: "center",
    boxShadow: "2px,2px, 3px, #000",
};

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

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(event) {
        apimessages.post('/message', {
            message: document.getElementsByName('newtext')[0].value
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <NavigationPannel openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet mattis neque, vitae porta ligula semper ac. Suspendisse potenti. In vitae congue felis, venenatis eleifend ipsum. Nam at sapien sed quam semper tempor a et orci. In ullamcorper,
                            enim ac bibendum venenatis, massa diam aliquam eros, vitae gravida odio odio sit amet mi. Maecenas enim sapien, dictum rutrum sem eget, iaculis iaculis elit. Nam mi sem, convallis at dictum in, auctor mollis quam. In sodales sapien ut
                            eros congue vehicula. In elementum, purus ut dapibus venenatis, tellus ante vestibulum nulla, quis cursus urna nisi non ligula. In porttitor sed mauris et feugiat. Maecenas non aliquet arcu, non congue ante. Quisque pellentesque faucibus
                            enim, id luctus lectus consequat eu.</p>
                    </div>
                    <div id="zoneright">
                        <div id="zoneNewC" >
                            <div>
                                <textarea rows="5" cols="80" type="text" name='newtext'></textarea>
                            </div>

                            <div id="newC">
                                <button type="button" class="btn" onClick={this.onSubmit}>Envoyer</button>
                            </div>
                        </div>
                        <div id="zoneC">
                            <div class="commentaire">
                                <img src="profil.jpeg" alt=""></img>
                                <h4> Promethee Spathis</h4>
                                <date>02/02/2022</date>
                                <p>macron is totally stupid</p>
                            </div>

                            <div class="commentaire">
                                <img src="default.png" alt=""></img>
                                <h4> Jean Noel Vittaut</h4>
                                <date>02/02/2022</date>
                                <p>hell yeah , how a man that stupid could be elected as the president of our land, that brainless noob did all useless thing possible in the world, his policies are only done by mouse nothing real was done , all that bastard want is
                                    money he doesn't care how the pandemic is going and how his people are diying</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;