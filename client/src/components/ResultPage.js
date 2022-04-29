import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import NavigationPannel from './NavigationPannel';

class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.researched ? this.props.researched : []
        }
        console.log("results : ", this.state.results);
        //this.props.setResearch("");
        this.setResults = this.setResults.bind(this);
    }

    setResults = (results) => {
        this.setState({ results: [] });
        this.setState({ results: results });
    }

    render() {
        
        return (
            <div>
                <NavigationPannel inresult = {true} setResults={this.setResults} setResearch = {this.props.setResearch} getUserInfo ={this.props.getUserInfo} openProfil={this.props.openProfil} setLogin={this.props.setLogin} setSignup={this.props.setSignup} setLogout={this.props.setLogout} connected={this.props.connected}></NavigationPannel>

                <div id="result">
                    {this.state.results}
                </div>
            </div>
        )
    }
}

export default ResultPage;