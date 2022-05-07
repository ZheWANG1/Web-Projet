import React, { Component, createRef } from 'react';
import '../App.css';
import NavigationPannel from './NavigationPannel';
import Message from './Message';
import axios from 'axios';
import photo from './photo.png';
import zoneleft from './zoneleft.png';

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
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
        this.state = {
            messages: [],
            submitImages: [],
            nbImages: 0,
        }

        this.changeMessageImageRef = createRef();
    }

    onSubmit(event) {
        if(sessionStorage.getItem('userinfo') === null) {
            window.location.href = '/login'
        }
        let filenames = [];
        try {
            let uploadSuccess = undefined;
            console.log("image sousmettre : ", this.state.submitImages[0].get('name'))
            for (var i = 0; i < this.state.submitImages.length; i++) {
                uploadSuccess = api.post('/upload', this.state.submitImages[i], {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(res => {
                    if (res.status != 200) {
                        console.log("upload fail")
                    }
                })
            }
        } catch (error) {
            console.log("error: " + error)
            console.log(error);
        }

        for (var i = 0; i < this.state.submitImages.length; i++) {
            filenames.push(PF + this.state.submitImages[i].get('name'));
        }

        apimessages.post('/message', {
            message: document.getElementsByName('newtext')[0].value,
            images: filenames
        }).then(res => {
            this.setState({ submitImages: [] })
            window.location.reload();
        }).catch(err => {
            console.log(filenames)
            console.log(err);
        })

    }

    componentDidMount() {
        apimessages.get('/allmessage').then(res => {
            let tmp = []
            for (var i = 0; i < res.data.allmess.length; i++) {
                tmp.push(<Message key={res.data.allmess[i]._id} userinfo={this.props.userinfo} connected={this.props.connected} message={res.data.allmess[i].message} user={res.data.allmess[i].login} date={res.data.allmess[i].date} id={res.data.allmess[i]._id} openProfil={this.props.openProfil} openDetails={this.props.openDetails} ></Message>);
            }
            this.setState({ messages: tmp })
        })
    }

    handleChangeMessageImage = async (event) => {
        console.log("change profile photo");
        event.preventDefault();
        if (this.changeMessageImageRef.current.files[0] === undefined || this.changeMessageImageRef.current.files[0] === null) {
            return;
        }
        const file = this.changeMessageImageRef.current.files[0];
        const formData = new FormData();
        const filename = parseInt(Date.now() / 10000000) + '-' + file.name;
        formData.append('file', file);
        formData.append('name', filename);
        this.state.submitImages.push(formData);
        this.setState({ nbImages: this.state.nbImages + 1 })
    }


    render() {
        return (
            <div>
                <NavigationPannel userinfo={this.props.userinfo} researched={this.props.researched} setResearch={this.props.setResearch} getUserInfo={this.props.getUserInfo} openProfil={this.props.openProfil} openDetails={this.props.openDetails} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>
                <div>
                    <div id="zoneleft">
                        <img src={zoneleft} alt="zoneleft" id="zoneleft_img" />
                    </div>
                    <div id="zoneright">
                        <div id="zoneNewC" >
                            <div>
                                <textarea rows="5" cols="80" type="text" name='newtext'></textarea>
                            </div>
                            <div id="newC">
                                <label id="newCimage">
                                    <input type="file" id="newCimage" name="newCimage" onChange={this.handleChangeMessageImage}
                                        accept="image/jpg,image/jpeg,image/png" style={{ display: "none" }} ref={this.changeMessageImageRef}></input>
                                    <img src={photo} alt="photo"></img>
                                    {this.state.nbImages}
                                </label>


                                <button type="button" onClick={this.onSubmit}>Envoyer</button>
                            </div>
                        </div>
                        <div id="zoneC">
                            <div id="zonemessage">{this.state.messages}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;