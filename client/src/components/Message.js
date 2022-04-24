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

    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
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

    

    render() {
        return (
            <div class="commentaire">
                <h4>{this.state.user}</h4>
                <date>{this.state.date}</date>
                <p>{this.state.message}</p>
            </div>
        )
    }

}

export default Message;