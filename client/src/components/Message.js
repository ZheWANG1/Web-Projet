import React, { Component } from 'react';
import '../App.css';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            user: "",
            //date: "",
            id: ""
        }
    }

    componentDidMount() {
        this.setState({
            message: this.props.message,
            user: this.props.user,
            //date: this.props.date,
            id: this.props.id
        })
    }

    render() {
        return (
            <div class="commentaire">
                <h4>{this.state.user}</h4>
                <date>02/02/2022</date>
                <p>{this.state.message}</p>
            </div>
        )
    }

}

export default Message;