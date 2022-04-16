import React, { Component } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }


})


class Profil extends Component {
    constructor(props) {
        super(props);
        this.friendList = [1, 2, 4, 5];
        api.get('/user/self').then(res => {
            document.getElementById("un").innerHTML = "Login : " + res.data[0].login;
            //this.info = res.data;
        })
    }

    listItems() {
        var items = [];
        for (var i = 0; i < this.friendList.length; i++) {
            items.push(<li key={i}>{this.friendList[i]}</li>);
        }
        return items;
    }

    render() {
        return (
            <div>
                <NavigationPannel openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <p id="un"></p>
                        <p>Lorem ipsum dolor sit amet, sequat eu.</p>
                        <ul>
                            {this.listItems()}
                        </ul>
                    </div>

                    <div id="zoneright">
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

                            <div>
                                <p>---------</p>

                                <p>---------</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profil;