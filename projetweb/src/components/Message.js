import React, { Component } from 'react';
import '../App.css';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            user: "",
            date: "",
            id: ""
        }
    }

    componentDidMount() {
        this.setState({
            message: this.props.message,
            user: this.props.user,
            date: this.props.date,
            id: this.props.id
        })
    }

    render() {
        return (
            <div className="message">
                <p>{this.state.user}</p>
                <p>{this.state.message}</p>
                <p>{this.state.date}</p>
            </div>
        )
    }

}